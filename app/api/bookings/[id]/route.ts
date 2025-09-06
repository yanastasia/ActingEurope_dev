import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

// DELETE - Delete specific booking (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access
    if (!isAdmin()) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const bookingId = parseInt(params.id);

    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      );
    }

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        booked_seats: {
          include: {
            seat: true
          }
        }
      }
    });

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Delete booking and release seats in a transaction
    await prisma.$transaction(async (tx: any) => {
      // Release all seats (set them back to available)
      const seatIds = existingBooking.booked_seats.map(bs => bs.seat_id);
      if (seatIds.length > 0) {
        await tx.seat.updateMany({
          where: {
            id: {
              in: seatIds
            }
          },
          data: {
            is_available: true
          }
        });
      }

      // Delete all booked seats associated with this booking
      await tx.bookedSeat.deleteMany({
        where: { booking_id: bookingId }
      });

      // Delete the booking itself
      await tx.booking.delete({
        where: { id: bookingId }
      });
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled and seats released successfully' 
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}