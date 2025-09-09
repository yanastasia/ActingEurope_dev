import PDFDocument from 'pdfkit';
import { buildQrPayload } from './qr-utils';
import QRCode from 'qrcode';

interface TicketContext {
  event: {
    id: string;
    title: string;
    date: Date | string;
    time: string;
    venue: string;
    venueName?: string;
    address?: string;
  };
  bookingReference: string;
}

interface SeatInfo {
  id: string;
  row: string;
  number: string;
  price: number;
  category: string;
  attendeeEmail: string;
}

export async function generateSimpleTicketPdf(ctx: TicketContext, seat: SeatInfo): Promise<{ buffer: Buffer; qrPayload: string }> {
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];
  
  doc.on('data', chunk => chunks.push(chunk));
  
  // Build QR payload
  const payload = buildQrPayload({
    eventId: ctx.event.id,
    seatId: seat.id,
    attendeeEmail: seat.attendeeEmail,
    bookingId: ctx.bookingReference
  });
  
  // Generate QR code
  const qrCodeDataUrl = await QRCode.toDataURL(payload);
  
  // Header
  doc.fontSize(20).text('Acting Europe — Theatre Without Borders', { align: 'center' });
  doc.moveDown();
  
  // Event info
  doc.fontSize(16).text(ctx.event.title || 'Event', { align: 'center' });
  doc.moveDown();
  
  const eventDate = ctx.event.date instanceof Date ? 
    ctx.event.date.toLocaleDateString() : 
    (typeof ctx.event.date === 'string' ? new Date(ctx.event.date).toLocaleDateString() : 'TBD');
  
  doc.fontSize(12)
    .text(`Date: ${eventDate}`)
    .text(`Time: ${ctx.event.time || 'TBD'}`)
    .text(`Venue: ${ctx.event.venueName || ctx.event.venue || 'TBD'}`);
  
  if (ctx.event.address) {
    doc.text(`Address: ${ctx.event.address}`);
  }
  
  doc.moveDown();
  
  // Ticket info
  doc.fontSize(14).text('Ticket Information:', { underline: true });
  doc.fontSize(12)
    .text(`Seat: Row ${seat.row || 'N/A'}, Number ${seat.number || 'N/A'}`)
    .text(`Category: ${seat.category || 'Standard'}`)
    .text(`Booking Reference: ${ctx.bookingReference}`);
  
  doc.moveDown();
  
  // QR Code placeholder (simplified)
  doc.fontSize(10).text('QR Code for verification:', { align: 'center' });
  doc.text('[QR Code would be here]', { align: 'center' });
  
  doc.end();
  
  return new Promise((resolve) => {
    doc.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve({ buffer, qrPayload: payload });
    });
  });
}