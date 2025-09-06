import PDFDocument from "pdfkit"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"
import { translations } from './translations'

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
      // Create a document
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
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

      // Helper function to get display text for bilingual content
      const getDisplayText = (text: string, language: string): string => {
        if (!text) return '';
        
        // Check if it's a bilingual format (e.g., "English / Bulgarian")
        if (text.includes(' / ')) {
          const parts = text.split(' / ');
          if (parts.length === 2) {
            return language === 'en' ? parts[0] : parts[1];
          }
        }
        
        // Check if it's a translation key
        const translationObj = translations as Record<string, Record<string, string>>;
        const translated = translationObj[text]?.[language];
        if (translated) {
          return translated;
        }
        
        // Return original text
        return text;
      };

      // Helper function to create a ticket page with branding
      const createTicketPage = async (ticket: TicketInfo, language: 'en' | 'bg') => {
        // Acting Europe branding colors - Blue and Yellow
        const primaryColor = '#021a4a'; // Deep blue
        const accentColor = '#ffcc00'; // Bright yellow
        
        // Add branded header with background
        doc.rect(0, 0, 595, 80).fillColor(primaryColor).fill();
        doc.fontSize(28).fillColor('#ffffff').text("ACTING EUROPE", 50, 25, { align: "center", width: 495 })
        doc.fontSize(16).fillColor(accentColor).text("Theatre Without Borders", 50, 55, { align: "center", width: 495 })
        doc.moveDown(2)

        // Add ticket information with branded styling
        const eTicketText = language === 'en' ? 'E-TICKET' : 'Е-БИЛЕТ';
        doc.rect(50, doc.y, 495, 40).fillColor(accentColor).fill();
        doc.fontSize(22).fillColor(primaryColor).text(eTicketText, 50, doc.y + 10, { align: "center", width: 495 })
        doc.moveDown(2)

        // Add a border around the ticket details with branded colors
        const startY = doc.y
        doc.rect(50, startY, 495, 320).strokeColor(primaryColor).lineWidth(2).stroke()

        // Labels in the selected language
        const labels = {
          event: language === 'en' ? 'Event:' : 'Събитие:',
          date: language === 'en' ? 'Date:' : 'Дата:',
          time: language === 'en' ? 'Time:' : 'Час:',
          venue: language === 'en' ? 'Venue:' : 'Място:',
          seat: language === 'en' ? 'Seat:' : 'Място:',
          attendee: language === 'en' ? 'Attendee:' : 'Посетител:',
          booking: language === 'en' ? 'Booking Reference:' : 'Номер на резервация:',
          ticketId: language === 'en' ? 'Ticket ID:' : 'ID на билет:'
        };

        // Add ticket details with branded colors
        doc.fontSize(12).fillColor(primaryColor)
        doc.text(`${labels.event}`, 70, startY + 20, { continued: true })
        doc.fillColor('#333').text(` ${getDisplayText(ticket.title, language)}`)

        doc.fillColor(primaryColor).text(`${labels.date}`, 70, startY + 50, { continued: true })
        doc.fillColor('#333').text(` ${ticket.date}`)

        doc.fillColor(primaryColor).text(`${labels.time}`, 70, startY + 80, { continued: true })
        doc.fillColor('#333').text(` ${ticket.time}`)

        doc.fillColor(primaryColor).text(`${labels.venue}`, 70, startY + 110, { continued: true })
        doc.fillColor('#333').text(` ${getDisplayText(ticket.venue, language)}`)

        doc.fillColor(primaryColor).text(`${labels.seat}`, 70, startY + 140, { continued: true })
        doc.fillColor('#333').text(` ${ticket.seat}`)

        doc.fillColor(primaryColor).text(`${labels.attendee}`, 70, startY + 170, { continued: true })
        doc.fillColor('#333').text(` ${ticket.attendeeName}`)

        doc.fillColor(primaryColor).text(`${labels.booking}`, 70, startY + 200, { continued: true })
        doc.fillColor('#333').text(` ${ticket.bookingReference}`)

        doc.fillColor(primaryColor).text(`${labels.ticketId}`, 70, startY + 230, { continued: true })
        doc.fillColor('#333').text(` ${ticket.qrData}`)

        // Generate and add QR code with branded border
        try {
          const qrCodeDataURL = await QRCode.toDataURL(ticket.qrData, {
            width: 150,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
          
          // Add QR code background with branding
          doc.rect(340, startY + 10, 170, 170).fillColor('#f8f9fa').fill()
          doc.rect(340, startY + 10, 170, 170).strokeColor(primaryColor).lineWidth(2).stroke()
          
          // Convert data URL to buffer
          const qrBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')
          doc.image(qrBuffer, 350, startY + 20, { width: 150, height: 150 })
        } catch (qrError) {
          console.error('QR Code generation failed:', qrError)
          // Fallback to placeholder with branding
          doc.rect(340, startY + 10, 170, 170).fillColor('#f8f9fa').fill()
          doc.rect(340, startY + 10, 170, 170).strokeColor(primaryColor).lineWidth(2).stroke()
          doc.rect(350, startY + 20, 150, 150).stroke()
          const qrText = language === 'en' ? 'QR Code' : 'QR Код';
          doc.fontSize(10).text(qrText, 350, startY + 180, { width: 150, align: "center" })
        }

        // Add instructions
        const footerText1 = language === 'en' 
          ? "Please present this ticket (printed or on your mobile device) at the venue entrance."
          : "Моля, представете този билет (отпечатан или на мобилното си устройство) на входа на залата.";
        const footerText2 = language === 'en'
          ? "For assistance, contact: tickets@actingeurope.com"
          : "За помощ се свържете с: tickets@actingeurope.com";
        
        doc
          .fontSize(10)
          .fillColor(primaryColor)
          .text(footerText1, 50, startY + 270, { width: 400 })
          .text(footerText2, 50, startY + 290, { width: 400 })
        
        // Add branded footer
        doc.rect(0, 750, 595, 50).fillColor(primaryColor).fill()
        doc.fontSize(10).fillColor('#ffffff')
        doc.text('© Acting Europe - Theatre Without Borders', 50, 765, { align: 'center', width: 495 })
        doc.fillColor(accentColor).text('www.actingeurope.com', 50, 780, { align: 'center', width: 495 })
      };

      // Generate individual tickets (2 pages each - English and Bulgarian)
      for (let i = 0; i < ticketData.tickets.length; i++) {
        const ticket = ticketData.tickets[i]
        
        if (i > 0) {
          doc.addPage()
        }

        // Create English page
        await createTicketPage(ticket, 'en')
        
        // Add new page for Bulgarian version
        doc.addPage()
        
        // Create Bulgarian page
        await createTicketPage(ticket, 'bg')
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
