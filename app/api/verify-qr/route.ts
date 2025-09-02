import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyQrPayload } from '@/lib/tickets/qr';

export async function POST(request: NextRequest) {
  try {
    const { qrPayload } = await request.json();

    if (!qrPayload) {
      return NextResponse.json(
        { error: 'QR payload is required' },
        { status: 400 }
      );
    }

    // Verify the QR code signature
    const verification = verifyQrPayload(qrPayload);
    if (!verification.ok) {
      return NextResponse.json(
        { error: verification.reason, valid: false },
        { status: 400 }
      );
    }

    const { bookingRef, seatId, eventId } = verification;

    // Find the booking and booked seat
    const booking = await prisma.booking.findUnique({
      where: { booking_reference: bookingRef },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            event_date: true,
            event_time: true,
            theatre: {
              select: {
                name: true
              }
            }
          }
        },
        booked_seats: {
          where: {
            seat_id: parseInt(seatId)
          },
          include: {
            seat: {
              select: {
                row_number: true,
                seat_number: true
              }
            }
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Booking not found',
          message: 'This ticket does not exist in our system'
        },
        { status: 404 }
      );
    }

    // Verify event ID matches
    if (booking.event.id !== parseInt(eventId)) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Event mismatch',
          message: 'This ticket is not for this event'
        },
        { status: 400 }
      );
    }

    // Check if booking is confirmed
    if (booking.booking_status !== 'confirmed') {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Booking not confirmed',
          message: `This booking is ${booking.booking_status}`
        },
        { status: 400 }
      );
    }

    // Find the specific booked seat
    const bookedSeat = booking.booked_seats[0];
    if (!bookedSeat) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Seat not found',
          message: 'This seat is not part of this booking'
        },
        { status: 400 }
      );
    }

    // Check if already scanned
    if (bookedSeat.scanned_at) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Already scanned',
          message: `This ticket was already scanned at ${bookedSeat.scanned_at.toLocaleString()}`,
          scannedAt: bookedSeat.scanned_at
        },
        { status: 400 }
      );
    }

    // Check if event date is valid (allow scanning up to 2 hours after event time)
    const eventDateTime = new Date(`${booking.event.event_date}T${booking.event.event_time}`);
    const now = new Date();
    const twoHoursAfterEvent = new Date(eventDateTime.getTime() + 2 * 60 * 60 * 1000);
    
    if (now > twoHoursAfterEvent) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Event expired',
          message: 'This event has already ended'
        },
        { status: 400 }
      );
    }

    // Mark the seat as scanned
    await prisma.bookedSeat.update({
      where: {
        id: bookedSeat.id
      },
      data: {
        scanned_at: new Date()
      }
    });

    // Return success with ticket details
    return NextResponse.json({
      valid: true,
      message: 'Ticket verified successfully',
      ticket: {
        bookingReference: booking.booking_reference,
        attendeeName: bookedSeat.attendee_name,
        seat: {
          row: bookedSeat.seat.row_number,
          number: bookedSeat.seat.seat_number
        },
        event: {
          title: booking.event.title,
          date: booking.event.event_date.toLocaleDateString(),
          time: booking.event.event_time,
          venue: booking.event.theatre.name
        },
        customer: {
          name: `${booking.user.first_name} ${booking.user.last_name}`,
          email: booking.user.email
        },
        scannedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error verifying QR code:', error);
    return NextResponse.json(
      { 
        valid: false,
        error: 'Verification failed',
        message: 'An error occurred while verifying the ticket'
      },
      { status: 500 }
    );
  }
}

// GET - Get verification status (for testing)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingReference = searchParams.get('booking');

  if (!bookingReference) {
    return NextResponse.json(
      { error: 'Booking reference is required' },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: {
        booking_reference: bookingReference
      },
      include: {
        event: {
          select: {
            title: true,
            event_date: true,
            event_time: true
          }
        },
        booked_seats: {
          select: {
            id: true,
            attendee_name: true,
            qr_code_data: true,
            scanned_at: true,
            seat: {
              select: {
                row_number: true,
                seat_number: true
              }
            }
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking: {
        reference: booking.booking_reference,
        status: booking.booking_status,
        totalSeats: booking.booked_seats.length,
        scannedSeats: booking.booked_seats.filter(seat => seat.scanned_at).length,
        event: booking.event,
        seats: booking.booked_seats.map(seat => ({
          attendeeName: seat.attendee_name,
          seat: `Row ${seat.seat.row_number}, Seat ${seat.seat.seat_number}`,
          hasQrCode: !!seat.qr_code_data,
          scannedAt: seat.scanned_at
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}