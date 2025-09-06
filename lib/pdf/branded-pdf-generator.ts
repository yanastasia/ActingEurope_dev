import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { generateQRPayload } from '../qr-utils';

export interface TicketContext {
  bookingReference: string;
  event: {
    title: string;
    date: string;
    time: string;
    venueName: string;
    venueAddress?: string;
  };
}

export interface SeatInfo {
  id: string;
  row: number;
  number: string;
  price: number;
  category: string;
  attendeeName: string;
}

export async function generateBrandedTicketPdf(
  ctx: TicketContext,
  seat: SeatInfo
): Promise<{ buffer: Buffer; qrPayload: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Acting Europe branding colors - Blue and Yellow branding
  const primaryColor = '#021a4a'; // Deep blue
  const accentColor = '#ffcc00'; // Bright yellow
  const textColor = '#021a4a';
  const lightGray = '#f5f5f5';

  // Generate QR code data
  const qrPayload = generateQRPayload({
    bookingReference: ctx.bookingReference,
    seatId: seat.id,
    attendeeName: seat.attendeeName,
    eventTitle: ctx.event.title,
    eventDate: ctx.event.date,
    eventTime: ctx.event.time
  });

  // Generate QR code as data URL
  const qrCodeDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 200,
    margin: 2,
    color: {
      dark: primaryColor,
      light: '#FFFFFF'
    }
  });

  // Header with branding
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Acting Europe logo/title
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ACTING EUROPE', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Theatre Ticket', 105, 30, { align: 'center' });

  // Ticket content area
  doc.setFillColor(lightGray);
  doc.rect(10, 50, 190, 180, 'F');
  
  // Event information
  doc.setTextColor(textColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('EVENT DETAILS', 20, 70);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Title: ${ctx.event.title}`, 20, 85);
  doc.text(`Date: ${ctx.event.date}`, 20, 95);
  doc.text(`Time: ${ctx.event.time}`, 20, 105);
  doc.text(`Venue: ${ctx.event.venueName}`, 20, 115);
  
  if (ctx.event.venueAddress) {
    doc.text(`Address: ${ctx.event.venueAddress}`, 20, 125);
  }

  // Seat information
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SEAT DETAILS', 20, 145);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Row: ${seat.row}`, 20, 160);
  doc.text(`Seat: ${seat.number}`, 20, 170);
  doc.text(`Category: ${seat.category}`, 20, 180);
  doc.text(`Price: €${seat.price.toFixed(2)}`, 20, 190);
  
  // Attendee information
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ATTENDEE', 20, 210);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${seat.attendeeName}`, 20, 225);

  // QR Code
  doc.addImage(qrCodeDataUrl, 'PNG', 140, 140, 50, 50);
  doc.setFontSize(10);
  doc.text('Scan for verification', 165, 200, { align: 'center' });

  // Booking reference
  doc.setFillColor(accentColor);
  doc.rect(10, 250, 190, 20, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Booking Reference: ${ctx.bookingReference}`, 105, 262, { align: 'center' });

  // Footer
  doc.setTextColor(textColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Please present this ticket at the venue entrance', 105, 280, { align: 'center' });
  doc.text('For support, contact: info@actingeurope.com', 105, 287, { align: 'center' });

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  
  return {
    buffer: pdfBuffer,
    qrPayload
  };
}