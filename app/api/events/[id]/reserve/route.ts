import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession, getServerUser } from '@/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    const user = await getServerUser()
    
    if (!session || !user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const eventId = parseInt(params.id)
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    const { seatIds } = await request.json()
    
    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      return NextResponse.json(
        { error: 'Seat IDs are required' },
        { status: 400 }
      )
    }

    // Get user details from database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        id: true,
        email: true,
        is_admin: true
      }
    })

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check seat limit for non-admin users
    if (!dbUser.is_admin && seatIds.length > 2) {
      return NextResponse.json(
        { error: 'Users can reserve maximum 2 seats per event' },
        { status: 400 }
      )
    }

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { 
        id: true, 
        title: true, 
        venue_id: true, 
        translation_group: true,
        price: true
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check if event has a venue
    if (!event.venue_id) {
      return NextResponse.json(
        { error: 'Event does not have a venue assigned' },
        { status: 400 }
      )
    }

    // Verify all seats exist and belong to the event's venue
    const seats = await prisma.seat.findMany({
      where: {
        id: { in: seatIds },
        venueSection: {
          venue_id: event.venue_id
        }
      },
      include: {
        venueSection: {
          select: {
            section_name: true,
            venue_id: true
          }
        }
      }
    })

    if (seats.length !== seatIds.length) {
      return NextResponse.json(
        { error: 'Some seats are invalid or do not belong to this venue' },
        { status: 400 }
      )
    }

    // Check if seats are available
    const unavailableSeats = seats.filter(seat => !seat.is_available)
    if (unavailableSeats.length > 0) {
      return NextResponse.json(
        { error: 'Some selected seats are not available' },
        { status: 400 }
      )
    }

    // Check if seats are already booked for events in the same translation group
    let conflictingBookings = []
    
    if (event.translation_group) {
      // Find all events in the same translation group that use the same venue
      const relatedEvents = await prisma.event.findMany({
        where: {
          translation_group: event.translation_group,
          venue_id: event.venue_id
        },
        select: { id: true }
      })

      const relatedEventIds = relatedEvents.map(e => e.id)

      conflictingBookings = await prisma.bookedSeat.findMany({
        where: {
          seat_id: { in: seatIds },
          booking: {
            event_id: { in: relatedEventIds },
            booking_status: { in: ['pending', 'confirmed'] }
          }
        }
      })
    } else {
      conflictingBookings = await prisma.bookedSeat.findMany({
        where: {
          seat_id: { in: seatIds },
          booking: {
            event_id: eventId,
            booking_status: { in: ['pending', 'confirmed'] }
          }
        }
      })
    }

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Some seats are already booked' },
        { status: 409 }
      )
    }

    // Create booking and booked seats in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the booking
      const booking = await tx.booking.create({
        data: {
          user_id: dbUser.id,
          event_id: eventId,
          booking_status: 'pending',
          total_amount: Number(event.price) * seatIds.length,
          booking_reference: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
      })

      // Create booked seats
      const bookedSeats = await tx.bookedSeat.createMany({
        data: seatIds.map((seatId: number) => ({
          booking_id: booking.id,
          seat_id: seatId
        }))
      })

      return { booking, bookedSeats }
    })

    // Return booking details with seat information
    const bookingWithSeats = await prisma.booking.findUnique({
      where: { id: result.booking.id },
      include: {
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
        },
        event: {
          select: {
            title: true,
            event_date: true,
            event_time: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      booking: bookingWithSeats,
      message: 'Seats reserved successfully'
    })

  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}