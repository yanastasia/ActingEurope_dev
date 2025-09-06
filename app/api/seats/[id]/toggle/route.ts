import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth-utils';

// PATCH - Toggle seat availability (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const seatId = parseInt(params.id);

    if (isNaN(seatId)) {
      return NextResponse.json(
        { error: 'Invalid seat ID' },
        { status: 400 }
      );
    }

    // Check if seat exists
    const existingSeat = await prisma.seat.findUnique({
      where: { id: seatId },
      include: {
        booked_seats: {
          include: {
            booking: {
              select: {
                status: true
              }
            }
          }
        }
      }
    });

    if (!existingSeat) {
      return NextResponse.json(
        { error: 'Seat not found' },
        { status: 404 }
      );
    }

    // Check if seat is currently booked
    const hasActiveBooking = existingSeat.booked_seats.some(
      bs => bs.booking.status === 'confirmed' || bs.booking.status === 'pending'
    );

    if (hasActiveBooking && existingSeat.is_available) {
      return NextResponse.json(
        { error: 'Cannot make seat unavailable - it has active bookings' },
        { status: 400 }
      );
    }

    // Toggle seat availability
    const updatedSeat = await prisma.seat.update({
      where: { id: seatId },
      data: {
        is_available: !existingSeat.is_available
      }
    });

    return NextResponse.json({ 
      success: true, 
      seat: updatedSeat,
      message: `Seat ${updatedSeat.is_available ? 'enabled' : 'disabled'} successfully`
    });

  } catch (error) {
    console.error('Error toggling seat:', error);
    return NextResponse.json(
      { error: 'Failed to toggle seat availability' },
      { status: 500 }
    );
  }
}