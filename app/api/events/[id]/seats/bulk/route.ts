import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth-utils';

// PATCH - Bulk update seat availability for an event (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access
    const adminCheck = await isAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const eventId = parseInt(params.id);
    const body = await request.json();
    const { is_available } = body;

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    if (typeof is_available !== 'boolean') {
      return NextResponse.json(
        { error: 'is_available must be a boolean value' },
        { status: 400 }
      );
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // If setting seats to unavailable, check for active bookings
    if (!is_available) {
      const activeBookings = await prisma.bookedSeat.findMany({
        where: {
          seat: {
            event_id: eventId
          },
          booking: {
            status: {
              in: ['confirmed', 'pending']
            }
          }
        },
        include: {
          booking: {
            select: {
              booking_reference: true,
              status: true
            }
          }
        }
      });

      if (activeBookings.length > 0) {
        return NextResponse.json(
          { 
            error: `Cannot set seats to unavailable - there are ${activeBookings.length} active bookings for this event`,
            activeBookings: activeBookings.length
          },
          { status: 400 }
        );
      }
    }

    // Update all seats for this event
    const updateResult = await prisma.seat.updateMany({
      where: {
        event_id: eventId
      },
      data: {
        is_available: is_available
      }
    });

    return NextResponse.json({ 
      success: true, 
      updated_seats: updateResult.count,
      message: `${updateResult.count} seats set to ${is_available ? 'available' : 'unavailable'}`
    });

  } catch (error) {
    console.error('Error bulk updating seats:', error);
    return NextResponse.json(
      { error: 'Failed to update seat availability' },
      { status: 500 }
    );
  }
}