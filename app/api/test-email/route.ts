import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTicketEmail } from '@/lib/email-service';

// POST - Test sending ticket email for existing booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find the most recent booking for this user
    const booking = await prisma.booking.findFirst({
      where: {
        user_id: user.id
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'No booking found for this user' },
        { status: 404 }
      );
    }

    console.log(`Testing email send for booking ${booking.booking_reference} to ${email}`);

    // Send the ticket email
    const result = await sendTicketEmail(booking.id.toString());

     return NextResponse.json({ 
       success: true, 
       message: `Ticket email sent successfully to ${email}!`,
       bookingId: booking.id,
       bookingReference: booking.booking_reference,
       emailResult: result
     });

  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Failed to send test email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}