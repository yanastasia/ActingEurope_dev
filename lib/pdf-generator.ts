"use server"

import PDFDocument from "pdfkit"

export async function generatePDF(ticketData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `Ticket - ${ticketData.title}`,
          Author: "Acting Europe Festival",
        },
      })

      // Collect the PDF data chunks
      const chunks: Buffer[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Add festival logo
      // doc.image('public/logo.png', 50, 45, { width: 150 })

      // Add header
      doc.fontSize(25).fillColor("#021a4a").text("ACTING EUROPE", { align: "center" })

      doc.fontSize(16).fillColor("#021a4a").text("Theatre Without Borders", { align: "center" })

      doc.moveDown()

      // Add ticket information
      doc.fontSize(20).fillColor("#000000").text("E-TICKET", { align: "center" })

      doc.moveDown()

      // Add a border around the ticket details
      const startY = doc.y
      doc.rect(50, startY, 495, 300).stroke()

      // Add ticket details
      doc
        .fontSize(12)
        .fillColor("#000000")
        .text(`Event: ${ticketData.title}`, 70, startY + 20)
        .text(`Date: ${ticketData.date}`, 70, startY + 50)
        .text(`Time: ${ticketData.time}`, 70, startY + 80)
        .text(`Venue: ${ticketData.venue}`, 70, startY + 110)
        .text(`Seat(s): ${ticketData.seats.join(", ")}`, 70, startY + 140)
        .text(`Booking Reference: ${ticketData.bookingReference}`, 70, startY + 170)
        .text(`Customer: ${ticketData.customerName}`, 70, startY + 200)

      // Add QR code placeholder (in a real app, you'd generate an actual QR code)
      doc.rect(350, startY + 20, 150, 150).stroke()
      doc.fontSize(10).text("QR Code", 350, startY + 180, { width: 150, align: "center" })

      // Add footer
      doc
        .fontSize(10)
        .text("Please present this ticket (printed or on your mobile device) at the venue entrance.", 50, startY + 320)
        .text("For assistance, contact: tickets@actingeurope.com", 50, startY + 340)

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}
