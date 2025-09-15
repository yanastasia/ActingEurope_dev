import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin, isAdminEmail, canReserveUnlimitedSeats } from '@/lib/auth';
import { sendTicketEmail } from '@/lib/email-service';
import { buildQrPayload } from '@/lib/tickets/qr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Generate unique booking reference
function generateBookingReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `BK${timestamp}${random}`.toUpperCase();
}

// GET - Fetch bookings (admin gets all, users get their own)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');
    
    console.log('Bookings API called with userId:', userIdParam);
    
    // If userId is provided, fetch user's bookings (no admin check needed)
    if (userIdParam) {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userIdParam)) {
        console.log('Invalid userId format:', userIdParam);
        return NextResponse.json(
          { error: 'Invalid user ID format' },
          { status: 400 }
        );
      }
      const userId = userIdParam;
      
      // Verify session authentication
        const cookieStore = cookies();
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              async get(name: string) {
                return (await cookieStore).get(name)?.value;
              },
            },
          }
        );
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
      }
      
      if (!session?.user) {
        console.log('No authenticated user found');
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
      
      if (session.user.id !== userId) {
        console.log('User ID mismatch:', session.user.id, 'vs', userId);
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
      }
      
      console.log('Authentication verified for user:', session.user.id);
      
      console.log('Querying database for bookings with user_id:', userId);
      const bookings = await prisma.booking.findMany({
        where: {
          user_id: userId
        },
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
              venue: true,
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
      
      console.log('Found bookings:', bookings.length, 'for user:', userId);
      return NextResponse.json(bookings);
    }
  } catch (error) {
      console.error('Error in user bookings fetch:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user bookings' },
        { status: 500 }
      );
    }
    
    // Admin access required for all bookings
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
  try {
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
    // Get authenticated user from session
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value;
          },
        },
      }
    );
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      console.log('Authentication error:', sessionError);
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const userId = session.user.id;
    const userEmail = session.user.email;
    
    const body = await request.json();
    
    // Debug logging for incoming booking data
    console.log('\n=== BOOKING API DEBUG ===');
    console.log('Authenticated user:', userId, userEmail);
    console.log('Raw request body:', JSON.stringify(body, null, 2));
    
    const { event_id: eventId, seat_ids: selectedSeats, attendee_names: requestAttendeeNames, seats_with_sections } = body;
    
    // Debug extracted values
    console.log('Extracted values:');
    console.log('- userId:', userId);
    console.log('- eventId:', eventId, typeof eventId);
    console.log('- selectedSeats:', selectedSeats, typeof selectedSeats);
    console.log('- attendee_names:', requestAttendeeNames);
    console.log('- seats_with_sections:', seats_with_sections);
    console.log('========================\n');

    // Validate required fields
    if (!eventId || !selectedSeats) {
      console.log('VALIDATION FAILED - Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: event_id, seat_ids' },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return NextResponse.json(
        { error: 'seat_ids must be a non-empty array' },
        { status: 400 }
      );
    }

    // Get event details to find translation group and price
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        translation_group: true,
        venue_id: true,
        price: true
      }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get or create user in database
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    });

    if (!user) {
      // Create user in database if they don't exist
      user = await prisma.user.create({
        data: {
          id: userId,
          email: userEmail!,
          first_name: session.user.user_metadata?.first_name || '',
          last_name: session.user.user_metadata?.last_name || ''
        },
        select: { email: true }
      });
    }

    // Calculate total amount based on event price and number of seats
    const totalAmount = event.price.toString();
    
    // Extract attendee names from request or use user email as fallback
    let attendee_names: string[];
    if (requestAttendeeNames && Array.isArray(requestAttendeeNames)) {
      // Handle both old format (array of strings) and new format (array of objects with fullName)
      attendee_names = requestAttendeeNames.map((attendee: any) => {
        if (typeof attendee === 'string') {
          return attendee;
        } else if (typeof attendee === 'object' && attendee.fullName) {
          return attendee.fullName;
        }
        return userEmail; // fallback
      });
    } else {
      // Fallback to user email for all seats if no attendee names provided
      attendee_names = selectedSeats.map(() => userEmail!);
    }
    
    console.log('Final attendee_names:', attendee_names);

    // Check seat limit: maximum 2 seats per user per event (unless user can reserve unlimited seats)
    const userCanReserveUnlimited = canReserveUnlimitedSeats(user.email);
    
    if (!userCanReserveUnlimited) {
      const existingUserBookings = await prisma.booking.findMany({
        where: {
          user_id: userId,
          event_id: eventId,
          booking_status: { in: ['pending', 'confirmed'] }
        },
        include: {
          booked_seats: true
        }
      });

      const currentlyBookedSeats = existingUserBookings.reduce((total, booking) => {
        return total + booking.booked_seats.length;
      }, 0);

      if (currentlyBookedSeats + selectedSeats.length > 2) {
        return NextResponse.json(
          { error: `You can only reserve a maximum of 2 seats per event. You currently have ${currentlyBookedSeats} seat(s) booked for this event.` },
          { status: 400 }
        );
      }
    }

    // Check if seats are available
    // Handle both array of IDs and array of objects with id property
    const seatIds = selectedSeats.map(seat => typeof seat === 'object' ? seat.id : seat);
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
          booking_status: 'confirmed',
          attendee_names: attendee_names
        }
      });

      // Create booked seats with attendee names and QR codes
      const bookedSeatsData = selectedSeats.map((seat, index) => {
        const seatId = typeof seat === 'object' ? seat.id : seat;
        const attendeeName = attendee_names[index];
        const qrPayload = buildQrPayload(booking.booking_reference, seatId.toString(), eventId);
        
        return {
          booking_id: booking.id,
          seat_id: seatId,
          attendee_name: attendeeName,
          qr_code_data: qrPayload
        };
      });

      const bookedSeats = await tx.bookedSeat.createMany({
        data: bookedSeatsData
      });

      // Note: Seat availability is determined dynamically by checking bookedSeat records
      // No need to update seat.is_available as it's handled in the events API

      return { booking, bookedSeats };
    });

    // Fetch complete booking data for email
    const completeBooking = await prisma.booking.findUnique({
      where: { id: result.booking.id },
      include: {
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
              select: {
                row_number: true,
                seat_number: true,
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

    // Send ticket email if customer email is provided
    if (userEmail && completeBooking) {
      try {
        await sendTicketEmail(completeBooking.id.toString());
      } catch (emailError) {
        console.error('Failed to send ticket email:', emailError);
        // Don't fail the booking if email fails
      }
    }

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

        // Note: Seats are automatically freed when booking status is cancelled
        // Seat availability is determined dynamically by checking bookedSeat records
        // and filtering by booking_status in the events API
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

// DELETE - Delete booking (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check admin access
    if (!isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Missing required parameter: bookingId' },
        { status: 400 }
      );
    }

    // Delete booking and associated booked seats in a transaction
    await prisma.$transaction(async (tx: any) => {
      // First delete all booked seats associated with this booking
      await tx.bookedSeat.deleteMany({
        where: { booking_id: parseInt(bookingId) }
      });

      // Then delete the booking itself
      await tx.booking.delete({
        where: { id: parseInt(bookingId) }
      });
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking and associated seats deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}