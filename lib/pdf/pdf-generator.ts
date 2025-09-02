import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { buildQrPayload } from "@/lib/tickets/qr";

// converts dataURL "data:image/png;base64,..." to Buffer
function dataUrlToBuffer(dataUrl: string) {
  const base64 = dataUrl.split(",")[1];
  return Buffer.from(base64, "base64");
}

type TicketContext = {
  bookingReference: string;
  event: {
    id: string;
    title: string;
    date: string; // formatted "DD MMM YYYY"
    time: string; // "HH:mm"
    venueName: string;
    address?: string;
  };
  brand?: { primary?: string; accent?: string };
};

type SeatInfo = {
  seatId: string;
  row: string | number;
  number: string | number;
  attendeeName: string;
};

export async function generateTicketPdfBuffer(ctx: TicketContext, seat: SeatInfo) {
  const doc = new PDFDocument({ size: "A4", margin: 48, font: 'Helvetica' });
  const chunks: Buffer[] = [];
  doc.on("data", (d) => chunks.push(d));
  const primary = process.env.TICKET_BRAND_PRIMARY || "#021a4a";
  const accent = process.env.TICKET_BRAND_ACCENT || "#ffcc00";

  // Header
  doc.font('Helvetica-Bold').fillColor(primary).fontSize(22).text("Acting Europe — Theatre Without Borders");
  doc.moveDown(0.25);
  doc.font('Helvetica-Bold').fillColor("black").fontSize(16).text(ctx.event.title);
  doc.moveDown(0.25);
  doc.font('Helvetica').text(`${ctx.event.date} at ${ctx.event.time}`);
  doc.text(`${ctx.event.venueName}${ctx.event.address ? ", " + ctx.event.address : ""}`);
  doc.moveDown(0.75);

  // Divider
  doc.moveTo(48, doc.y).lineTo(547, doc.y).strokeColor(accent).lineWidth(2).stroke();
  doc.moveDown(0.75);

  // Attendee and seat
  doc.font('Helvetica-Bold').fontSize(14).fillColor(primary).text("Ticket");
  doc.font('Helvetica').fillColor("black").moveDown(0.25);
  doc.text(`Attendee: ${seat.attendeeName}`);
  doc.text(`Seat: Row ${seat.row}, Seat ${seat.number}`);
  doc.text(`Booking Ref: ${ctx.bookingReference}`);

  // QR code at right
  const payload = buildQrPayload(ctx.bookingReference, seat.seatId, ctx.event.id);
  const qrDataUrl = await QRCode.toDataURL(payload, {
    width: 150,
    margin: 2,
    color: { dark: "#021a4a" }
  });
  const qrBuf = dataUrlToBuffer(qrDataUrl);
  const startY = doc.y;
  doc.image(qrBuf, 350, startY - 10, { width: 150, height: 150 });

  // Footer note
  doc.moveDown(10);
  doc.font('Helvetica').fontSize(10).fillColor("#444").text(
    "Please bring this ticket to the venue. QR code is required for entry. " +
      "If you have multiple tickets, each attendee should present their own PDF."
  );

  doc.end();
  await new Promise((res) => doc.on("end", res));
  return { buffer: Buffer.concat(chunks), qrPayload: payload };
}