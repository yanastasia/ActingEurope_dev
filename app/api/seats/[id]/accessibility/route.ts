import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth-utils';

// PATCH - Update seat accessibility (admin only)
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

    // Parse request body
    const body = await request.json();
    const { is_accessible } = body;

    if (typeof is_accessible !== 'boolean') {
      return NextResponse.json(
        { error: 'is_accessible must be a boolean value' },
        { status: 400 }
      );
    }

    // Check if seat exists
    const existingSeat = await prisma.seat.findUnique({
      where: { id: seatId }
    });

    if (!existingSeat) {
      return NextResponse.json(
        { error: 'Seat not found' },
        { status: 404 }
      );
    }

    // Update seat accessibility
    const updatedSeat = await prisma.seat.update({
      where: { id: seatId },
      data: {
        is_accessible: is_accessible
      }
    });

    return NextResponse.json({ 
      success: true, 
      seat: updatedSeat,
      message: `Seat accessibility ${is_accessible ? 'enabled' : 'disabled'} successfully`
    });

  } catch (error) {
    console.error('Error updating seat accessibility:', error);
    return NextResponse.json(
      { error: 'Failed to update seat accessibility' },
      { status: 500 }
    );
  }
}