import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch available seats for an event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = parseInt(params.id);

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        venue_id: true,
        translation_group: true
      }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (!event.venue_id) {
      return NextResponse.json(
        { error: 'Event has no venue assigned' },
        { status: 400 }
      );
    }

    // Get all seats for the venue
    const venueSeats = await prisma.seat.findMany({
      where: {
        venueSection: {
          venue_id: event.venue_id
        }
      },
      include: {
        venueSection: {
          select: {
            id: true,
            section_name: true,
            section_type: true
          }
        }
      },
      orderBy: [
        { venueSection: { section_name: 'asc' } },
        { row_number: 'asc' },
        { seat_number: 'asc' }
      ]
    });

    // Get booked seats for events in the same translation group (or just this event if no translation group)
    let bookedSeatIds: number[] = [];
    
    if (event.translation_group) {
      // Find all events in the same translation group that use the same venue
      const relatedEvents = await prisma.event.findMany({
        where: {
          translation_group: event.translation_group,
          venue_id: event.venue_id
        },
        select: { id: true }
      });

      const relatedEventIds = relatedEvents.map((e: any) => e.id);

      // Get booked seats for all related events
      const bookedSeats = await prisma.bookedSeat.findMany({
        where: {
          booking: {
            event_id: { in: relatedEventIds },
            booking_status: { in: ['pending', 'confirmed'] }
          }
        },
        select: { seat_id: true }
      });

      bookedSeatIds = bookedSeats.map((bs: any) => bs.seat_id);
    } else {
      // Get booked seats for just this event
      const bookedSeats = await prisma.bookedSeat.findMany({
        where: {
          booking: {
            event_id: eventId,
            booking_status: { in: ['pending', 'confirmed'] }
          }
        },
        select: { seat_id: true }
      });

      bookedSeatIds = bookedSeats.map((bs: any) => bs.seat_id);
    }

    // Mark seats as available/unavailable based on bookings
    const seatsWithAvailability = venueSeats.map((seat: any) => ({
      id: seat.id,
      row_number: seat.row_number,
      seat_number: seat.seat_number,
      is_available: seat.is_available && !bookedSeatIds.includes(seat.id),
      is_accessible: seat.is_accessible,
      section: {
        id: seat.venueSection.id,
        name: seat.venueSection.section_name,
        type: seat.venueSection.section_type
      }
    }));

    // Group seats by section
    const seatsBySection = seatsWithAvailability.reduce((acc: any, seat: any) => {
      const sectionKey = seat.section.id;
      if (!acc[sectionKey]) {
        acc[sectionKey] = {
          section: seat.section,
          seats: []
        };
      }
      acc[sectionKey].seats.push({
        id: seat.id,
        row_number: seat.row_number,
        seat_number: seat.seat_number,
        is_available: seat.is_available,
        is_accessible: seat.is_accessible
      });
      return acc;
    }, {} as Record<number, { section: any; seats: any[] }>);

    const sections = Object.values(seatsBySection);

    return NextResponse.json({
      event: {
        id: event.id,
        title: event.title,
        translation_group: event.translation_group
      },
      sections,
      total_seats: seatsWithAvailability.length,
      available_seats: seatsWithAvailability.filter((s: any) => s.is_available).length,
      booked_seats: bookedSeatIds.length
    });

  } catch (error) {
    console.error('Error fetching event seats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event seats' },
      { status: 500 }
    );
  }
}