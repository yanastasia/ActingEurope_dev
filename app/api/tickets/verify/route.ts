import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyQrPayload } from "@/lib/tickets/qr";
import { requireScannerAuth } from "@/lib/scanner-middleware";

export async function POST(req: NextRequest) {
  // Check scanner authentication
  const authCheck = await requireScannerAuth(req);
  if (!authCheck.success) {
    return authCheck.response!;
  }

  const { payload } = await req.json().catch(() => ({}));
  if (!payload) return NextResponse.json({ ok: false, reason: "Missing payload" }, { status: 400 });

  const v = verifyQrPayload(payload);
  if (!v.ok) return NextResponse.json(v, { status: 400 });

  const { bookingRef, seatId, eventId } = v;

  const booking = await prisma.booking.findFirst({
    where: { booking_reference: bookingRef, event_id: parseInt(eventId), booking_status: "confirmed" },
    include: {
      event: { select: { title: true, event_date: true, event_time: true, venue: true } },
      booked_seats: {
        where: { seat_id: parseInt(seatId) },
        include: { seat: true }
      }
    }
  });

  if (!booking || booking.booked_seats.length === 0) {
    return NextResponse.json({ ok: false, reason: "Ticket not found" }, { status: 404 });
  }

  // Type assertion to help TypeScript understand the included relations
  const bookingWithRelations = booking as typeof booking & {
    event: { title: string; event_date: Date; event_time: string; venue: { id: number; name: string; description: string | null; address: string | null; city: string | null; capacity: number; image_url: string | null } };
    booked_seats: Array<{ id: number; attendee_name: string | null; scanned_at: Date | null; seat: { row_number: number; seat_number: number } }>;
  };

  const bs = bookingWithRelations.booked_seats[0];

  // Optional: Mark as scanned here, or in a separate "check-in" endpoint to avoid accidental scans.
  // await prisma.bookedSeat.update({ where: { id: bs.id }, data: { scanned_at: new Date() } });

  return NextResponse.json({
    ok: true,
    bookingReference: bookingRef,
    attendeeName: bs.attendee_name,
    seat: { row: bs.seat.row_number, number: bs.seat.seat_number },
    event: {
      title: bookingWithRelations.event.title,
      date: bookingWithRelations.event.event_date,
      time: bookingWithRelations.event.event_time,
      venue: bookingWithRelations.event.venue?.name
    },
    scanned_at: bs.scanned_at
  });
}