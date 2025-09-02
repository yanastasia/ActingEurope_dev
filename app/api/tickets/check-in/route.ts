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

  try {
    // Use transaction to atomically check and update scanned_at
    const result = await prisma.$transaction(async (tx) => {
      // Find the booking and booked seat
      const booking = await tx.booking.findFirst({
        where: {
          booking_reference: bookingRef,
          event_id: parseInt(eventId),
          booking_status: "confirmed"
        },
        include: {
          event: { select: { title: true, event_date: true, event_time: true, venue: true } },
          booked_seats: {
            where: { seat_id: parseInt(seatId) },
            include: { seat: true }
          }
        }
      });

      if (!booking || booking.booked_seats.length === 0) {
        throw new Error("Ticket not found");
      }

      // Type assertion to help TypeScript understand the included relations
      const bookingWithRelations = booking as typeof booking & {
        event: { title: string; event_date: Date; event_time: string; venue: any };
        booked_seats: Array<{ id: number; attendee_name: string | null; scanned_at: Date | null; seat: { row_number: number; seat_number: number } }>;
      };

      const bookedSeat = bookingWithRelations.booked_seats[0];

      // Check if already scanned
      if (bookedSeat.scanned_at) {
        return {
          ok: false,
          reason: "Ticket already scanned",
          scanned_at: bookedSeat.scanned_at,
          attendeeName: bookedSeat.attendee_name,
          seat: { row: bookedSeat.seat.row_number, number: bookedSeat.seat.seat_number },
          event: {
            title: bookingWithRelations.event.title,
            date: bookingWithRelations.event.event_date,
            time: bookingWithRelations.event.event_time,
            venue: bookingWithRelations.event.venue?.name
          }
        };
      }

      // Mark as scanned
      const updatedBookedSeat = await tx.bookedSeat.update({
        where: { id: bookedSeat.id },
        data: { scanned_at: new Date() }
      });

      return {
        ok: true,
        bookingReference: bookingRef,
        attendeeName: bookedSeat.attendee_name,
        seat: { row: bookedSeat.seat.row_number, number: bookedSeat.seat.seat_number },
        event: {
          title: bookingWithRelations.event.title,
          date: bookingWithRelations.event.event_date,
          time: bookingWithRelations.event.event_time,
          venue: bookingWithRelations.event.venue?.name
        },
        scanned_at: updatedBookedSeat.scanned_at,
        first_scan: true
      };
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Check-in error:', error);
    
    if (error instanceof Error && error.message === "Ticket not found") {
      return NextResponse.json({ ok: false, reason: "Ticket not found" }, { status: 404 });
    }
    
    return NextResponse.json({ ok: false, reason: "Internal server error" }, { status: 500 });
  }
}