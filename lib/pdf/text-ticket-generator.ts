import { buildQrPayload } from './qr-utils';

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
  attendeeName: string;
  attendeeEmail: string;
}

export async function generateTextTicket(ctx: TicketContext, seat: SeatInfo): Promise<{ content: string; qrPayload: string }> {
  // Build QR payload
  const payload = buildQrPayload({
    eventId: ctx.event.id,
    seatId: seat.id,
    attendeeEmail: seat.attendeeEmail,
    bookingId: ctx.bookingReference
  });
  
  const eventDate = ctx.event.date instanceof Date ? 
    ctx.event.date.toLocaleDateString() : 
    (typeof ctx.event.date === 'string' ? new Date(ctx.event.date).toLocaleDateString() : 'TBD');
  
  const ticketContent = `
═══════════════════════════════════════════════════════════════
                    ACTING EUROPE
              Theatre Without Borders
═══════════════════════════════════════════════════════════════

EVENT: ${ctx.event.title || 'Event'}
DATE: ${eventDate}
TIME: ${ctx.event.time || 'TBD'}
VENUE: ${ctx.event.venueName || ctx.event.venue || 'TBD'}
${ctx.event.address ? `ADDRESS: ${ctx.event.address}` : ''}

───────────────────────────────────────────────────────────────
                    TICKET INFORMATION
───────────────────────────────────────────────────────────────

ATTENDEE: ${seat.attendeeName}
SEAT: Row ${seat.row || 'N/A'}, Number ${seat.number || 'N/A'}
CATEGORY: ${seat.category || 'Standard'}
BOOKING REF: ${ctx.bookingReference}

───────────────────────────────────────────────────────────────
                    VERIFICATION
───────────────────────────────────────────────────────────────

QR CODE DATA: ${payload}

Please present this ticket at the venue entrance.
For support, contact: actingeurope@gmail.com

═══════════════════════════════════════════════════════════════
`;
  
  return { content: ticketContent, qrPayload: payload };
}