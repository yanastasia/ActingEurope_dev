import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

// Generate unique booking reference
function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `BK${timestamp}${random}`.toUpperCase();
}

// GET - Fetch bookings (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin access
    if (!isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true
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
          include: {
            seat: {
              include: {
                venueSection: {
                  select: {
                    section_name: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, eventId, selectedSeats, totalAmount } = body;

    // Validate required fields
    if (!userId || !eventId || !selectedSeats || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, eventId, selectedSeats, totalAmount' },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return NextResponse.json(
        { error: 'selectedSeats must be a non-empty array' },
        { status: 400 }
      );
    }

    // Get event details to find translation group
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        translation_group: true,
        venue_id: true
      }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if seats are available
    const seatIds = selectedSeats.map(seat => seat.id);
    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
        is_available: true
      }
    });

    if (seats.length !== selectedSeats.length) {
      return NextResponse.json(
        { error: 'Some selected seats are no longer available' },
        { status: 409 }
      );
    }

    // Check if any seats are already booked for events in the same translation group
    if (event.translation_group) {
      const existingBookings = await prisma.bookedSeat.findMany({
        where: {
          seat_id: { in: seatIds },
          booking: {
            event: {
              translation_group: event.translation_group,
              venue_id: event.venue_id
            },
            booking_status: { in: ['pending', 'confirmed'] }
          }
        }
      });

      if (existingBookings.length > 0) {
        return NextResponse.json(
          { error: 'Some seats are already booked for events in the same translation group' },
          { status: 409 }
        );
      }
    }

    // Create booking with transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Create booking
      const booking = await tx.booking.create({
        data: {
          user_id: userId,
          event_id: eventId,
          booking_reference: generateBookingReference(),
          total_amount: totalAmount,
          booking_status: 'pending'
        }
      });

      // Create booked seats
      const bookedSeats = await tx.bookedSeat.createMany({
        data: selectedSeats.map(seat => ({
          booking_id: booking.id,
          seat_id: seat.id
        }))
      });

      // Update seat availability
      await tx.seat.updateMany({
        where: {
          id: { in: seatIds }
        },
        data: {
          is_available: false
        }
      });

      return { booking, bookedSeats };
    });

    // Fetch complete booking data to return
    const completeBooking = await prisma.booking.findUnique({
      where: { id: result.booking.id },
      include: {
        event: {
          select: {
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
          include: {
            seat: {
              include: {
                venueSection: {
                  select: {
                    section_name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      booking: completeBooking
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// PUT - Update booking status (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check admin access
    if (!isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, cancelled' },
        { status: 400 }
      );
    }

    // If cancelling, free up the seats
    if (status === 'cancelled') {
      await prisma.$transaction(async (tx: any) => {
        // Get booked seats
        const bookedSeats = await tx.bookedSeat.findMany({
          where: { booking_id: bookingId }
        });

        // Update booking status
        await tx.booking.update({
          where: { id: bookingId },
          data: { booking_status: status }
        });

        // Free up seats
        if (bookedSeats.length > 0) {
          await tx.seat.updateMany({
            where: {
              id: { in: bookedSeats.map((bs: { seat_id: string }) => bs.seat_id) }
            },
            data: {
              is_available: true
            }
          });
        }
      });
    } else {
      // Just update status
      await prisma.booking.update({
        where: { id: bookingId },
        data: { booking_status: status }
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}