import PDFDocument from "pdfkit"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

interface TicketInfo {
  title: string
  date: string
  time: string
  venue: string
  seat: string
  attendeeName: string
  bookingReference: string
  qrData: string
}

interface TicketData {
  title: string
  date: string
  time: string
  venue: string
  bookingReference: string
  tickets: TicketInfo[]
}

export async function generatePDF(ticketData: TicketData): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a document with explicit font settings to avoid font loading issues
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        font: 'Helvetica', // Use built-in font
        info: {
          Title: `Tickets - ${ticketData.title}`,
          Author: "Acting Europe Festival",
        },
      })

      // Collect the PDF data chunks
      const chunks: Buffer[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Generate individual tickets
      for (let i = 0; i < ticketData.tickets.length; i++) {
        const ticket = ticketData.tickets[i]
        
        if (i > 0) {
          doc.addPage()
        }

        // Add festival logo
        // doc.image('public/logo.png', 50, 45, { width: 150 })

        // Add header
        doc.font('Helvetica-Bold').fontSize(25).fillColor("#021a4a").text("ACTING EUROPE", { align: "center" })
        doc.font('Helvetica').fontSize(16).fillColor("#021a4a").text("Theatre Without Borders", { align: "center" })
        doc.moveDown()

        // Add ticket information
        doc.font('Helvetica-Bold').fontSize(20).fillColor("#000000").text("E-TICKET", { align: "center" })
        doc.moveDown()

        // Add a border around the ticket details
        const startY = doc.y
        doc.rect(50, startY, 495, 320).stroke()

        // Add ticket details
        doc
          .font('Helvetica')
          .fontSize(12)
          .fillColor("#000000")
          .text(`Event: ${ticket.title}`, 70, startY + 20)
          .text(`Date: ${ticket.date}`, 70, startY + 50)
          .text(`Time: ${ticket.time}`, 70, startY + 80)
          .text(`Venue: ${ticket.venue}`, 70, startY + 110)
          .text(`Seat: ${ticket.seat}`, 70, startY + 140)
          .text(`Attendee: ${ticket.attendeeName}`, 70, startY + 170)
          .text(`Booking Reference: ${ticket.bookingReference}`, 70, startY + 200)
          .text(`Ticket ID: ${ticket.qrData}`, 70, startY + 230)

        // Generate and add QR code
        try {
          const qrCodeDataURL = await QRCode.toDataURL(ticket.qrData, {
            width: 150,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
          
          // Convert data URL to buffer
          const qrBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')
          doc.image(qrBuffer, 350, startY + 20, { width: 150, height: 150 })
        } catch (qrError) {
          console.error('QR Code generation failed:', qrError)
          // Fallback to placeholder
          doc.rect(350, startY + 20, 150, 150).stroke()
          doc.font('Helvetica').fontSize(10).text("QR Code", 350, startY + 180, { width: 150, align: "center" })
        }

        // Add footer
        doc
          .font('Helvetica')
          .fontSize(10)
          .text("Please present this ticket (printed or on your mobile device) at the venue entrance.", 50, startY + 340)
          .text("For assistance, contact: tickets@actingeurope.com", 50, startY + 360)
      }

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// Generate individual ticket PDF for a single ticket
export async function generateSingleTicketPDF(ticketInfo: TicketInfo): Promise<Buffer> {
  const ticketData: TicketData = {
    title: ticketInfo.title,
    date: ticketInfo.date,
    time: ticketInfo.time,
    venue: ticketInfo.venue,
    bookingReference: ticketInfo.bookingReference,
    tickets: [ticketInfo]
  }
  
  return generatePDF(ticketData)
}

// Generate unique QR code data for a ticket
export function generateQRData(data: {
  bookingReference: string;
  seat: string;
  attendee: string;
  eventId: string | number;
}): string {
  const ticketId = uuidv4()
  return JSON.stringify({
    ticketId,
    bookingReference: data.bookingReference,
    seat: data.seat,
    attendee: data.attendee,
    eventId: data.eventId,
    timestamp: new Date().toISOString()    
  })
}
