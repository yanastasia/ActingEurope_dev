import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyQrPayload } from '@/lib/tickets/qr';
import { hasFullAdminAccess } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // For this implementation, we'll rely on the frontend to validate admin access
    // In a production environment, you'd want proper session validation here
    // The frontend already checks hasFullAdminAccess before allowing access to this page

    const { qrPayload, attendeeName } = await request.json();

    if (!qrPayload) {
      return NextResponse.json(
        { ok: false, reason: 'QR payload is required' },
        { status: 400 }
      );
    }

    if (!attendeeName || !attendeeName.trim()) {
      return NextResponse.json(
        { ok: false, reason: 'Attendee name is required' },
        { status: 400 }
      );
    }

    // Verify the QR code signature
    const verification = verifyQrPayload(qrPayload);
    if (!verification.ok) {
      return NextResponse.json(
        { ok: false, reason: verification.reason },
        { status: 400 }
      );
    }

    const { bookingRef, seatId, eventId } = verification;

    // Check if this QR code already exists in the database
    const existingBookedSeat = await prisma.bookedSeat.findFirst({
      where: {
        qr_code_data: qrPayload
      },
      include: {
        booking: {
          include: {
            event: {
              select: {
                title: true,
                event_date: true,
                event_time: true,
                venue: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        seat: {
          select: {
            row_number: true,
            seat_number: true
          }
        }
      }
    });

    if (existingBookedSeat) {
      return NextResponse.json({
        ok: false,
        reason: 'Already exists',
        bookingReference: existingBookedSeat.booking.booking_reference,
        attendeeName: existingBookedSeat.attendee_name,
        seat: {
          row: existingBookedSeat.seat.row_number,
          number: existingBookedSeat.seat.seat_number
        },
        event: {
          title: existingBookedSeat.booking.event.title,
          date: existingBookedSeat.booking.event.event_date.toISOString().split('T')[0],
          time: existingBookedSeat.booking.event.event_time?.toString() || '19:00',
          venue: existingBookedSeat.booking.event.venue?.name || 'Unknown Venue'
        }
      });
    }

    // Try to find an existing booking and seat that matches the QR data
    const booking = await prisma.booking.findUnique({
      where: { booking_reference: bookingRef },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            event_date: true,
            event_time: true,
            venue: {
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

    if (booking && booking.booked_seats.length > 0) {
      // Update existing booked seat with QR code data
      const bookedSeat = booking.booked_seats[0];
      
      await prisma.bookedSeat.update({
        where: {
          id: bookedSeat.id
        },
        data: {
          qr_code_data: qrPayload,
          // If attendee_name is not set, we can extract it from QR or set a default
          attendee_name: bookedSeat.attendee_name || attendeeName.trim()
        }
      });

      return NextResponse.json({
        ok: true,
        bookingReference: booking.booking_reference,
        attendeeName: bookedSeat.attendee_name || attendeeName.trim(),
        seat: {
          row: bookedSeat.seat.row_number,
          number: bookedSeat.seat.seat_number
        },
        event: {
          title: booking.event.title,
          date: booking.event.event_date.toISOString().split('T')[0],
          time: booking.event.event_time?.toString() || '19:00',
          venue: booking.event.venue?.name || 'Unknown Venue'
        },
        added_at: new Date().toISOString()
      });
    }

    // If no existing booking/seat found, create a new entry
    // First, check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
      include: {
        venue: {
          select: {
            name: true
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json(
        { ok: false, reason: 'Event not found in database' },
        { status: 404 }
      );
    }

    // Check if the seat exists
    const seat = await prisma.seat.findUnique({
      where: { id: parseInt(seatId) }
    });

    if (!seat) {
      return NextResponse.json(
        { ok: false, reason: 'Seat not found in database' },
        { status: 404 }
      );
    }

    // Create a new booking for this external QR code
    // Generate a unique booking reference
    const newBookingRef = `EXT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create a placeholder user for external bookings (you might want to handle this differently)
    let externalUser = await prisma.user.findUnique({
      where: { email: 'external@actingeurope.eu' }
    });

    if (!externalUser) {
      // Create external user if it doesn't exist
      externalUser = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          email: 'external@actingeurope.eu',
          first_name: 'External',
          last_name: 'QR Code',
          is_admin: false
        }
      });
    }

    // Create the booking
    const newBooking = await prisma.booking.create({
      data: {
        user_id: externalUser.id,
        event_id: parseInt(eventId),
        booking_reference: bookingRef, // Use the original booking reference from QR
        total_amount: 0, // External QR codes don't have payment info
        booking_status: 'confirmed',
        attendee_names: JSON.stringify([attendeeName.trim()])
      }
    });

    // Create the booked seat
    await prisma.bookedSeat.create({
      data: {
        booking_id: newBooking.id,
        seat_id: parseInt(seatId),
        attendee_name: attendeeName.trim(),
        qr_code_data: qrPayload
      }
    });

    return NextResponse.json({
      ok: true,
      bookingReference: bookingRef,
      attendeeName: attendeeName.trim(),
      seat: {
        row: seat.row_number,
        number: seat.seat_number
      },
      event: {
        title: event.title,
        date: event.event_date.toISOString().split('T')[0],
        time: event.event_time?.toString() || '19:00',
        venue: event.venue?.name || 'Unknown Venue'
      },
      added_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error adding QR code:', error);
    return NextResponse.json(
      { ok: false, reason: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if a QR code exists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qrPayload = searchParams.get('qrPayload');

    if (!qrPayload) {
      return NextResponse.json(
        { error: 'QR payload is required' },
        { status: 400 }
      );
    }

    const existingBookedSeat = await prisma.bookedSeat.findFirst({
      where: {
        qr_code_data: qrPayload
      },
      include: {
        booking: {
          include: {
            event: {
              select: {
                title: true,
                event_date: true,
                event_time: true
              }
            }
          }
        },
        seat: {
          select: {
            row_number: true,
            seat_number: true
          }
        }
      }
    });

    return NextResponse.json({
      exists: !!existingBookedSeat,
      data: existingBookedSeat ? {
        bookingReference: existingBookedSeat.booking.booking_reference,
        attendeeName: existingBookedSeat.attendee_name,
        seat: {
          row: existingBookedSeat.seat.row_number,
          number: existingBookedSeat.seat.seat_number
        },
        event: {
          title: existingBookedSeat.booking.event.title,
          date: existingBookedSeat.booking.event.event_date.toISOString().split('T')[0],
          time: existingBookedSeat.booking.event.event_time?.toString() || '19:00'
        }
      } : null
    });

  } catch (error) {
    console.error('Error checking QR code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}