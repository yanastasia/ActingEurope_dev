import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSingleTicketPDF } from '@/lib/pdf-generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingReference = searchParams.get('bookingReference');
    const seatId = searchParams.get('seatId');
    const attendeeName = searchParams.get('attendeeName');

    console.log('PDF Download Request:', { bookingReference, seatId, attendeeName });

    if (!bookingReference || !seatId || !attendeeName) {
      console.log('Missing parameters:', { bookingReference, seatId, attendeeName });
      return NextResponse.json(
        { error: 'Missing required parameters: bookingReference, seatId, attendeeName' },
        { status: 400 }
      );
    }

    // Find the booked seat with all related information
    const bookedSeat = await prisma.bookedSeat.findFirst({
      where: {
        booking: {
          booking_reference: bookingReference
        },
        seat_id: parseInt(seatId),
        attendee_name: attendeeName
      },
      include: {
        booking: {
          include: {
            event: {
              include: {
                venue: true,
                theatre: true
              }
            }
          }
        },
        seat: {
          include: {
            venueSection: true
          }
        }
      }
    });

    if (!bookedSeat) {
      console.log('Ticket not found for:', { bookingReference, seatId, attendeeName });
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    console.log('Found booked seat:', bookedSeat.id);

    // Prepare ticket information for PDF generation
    const venue = typeof bookedSeat.booking.event.venue === 'object' 
      ? bookedSeat.booking.event.venue?.name || 'TBD'
      : bookedSeat.booking.event.venue || 'TBD';

    const ticketInfo = {
      title: bookedSeat.booking.event.title,
      date: bookedSeat.booking.event.event_date.toLocaleDateString(),
      time: bookedSeat.booking.event.event_time ? bookedSeat.booking.event.event_time.toISOString().slice(11, 16) : '19:00',
      venue: venue,
      seat: `Row ${bookedSeat.seat.row_number}, Seat ${bookedSeat.seat.seat_number}`,
      sectionName: bookedSeat.seat.venueSection?.section_name,
      attendeeName: bookedSeat.attendee_name || 'Guest',
      bookingReference: bookedSeat.booking.booking_reference,
      qrData: bookedSeat.qr_code_data || ''
    };

    // Generate PDF
    console.log('Generating PDF with ticket info:', ticketInfo);
    const pdfBuffer = await generateSingleTicketPDF(ticketInfo);
    console.log('PDF generated successfully, buffer length:', pdfBuffer.length);

    // Create filename
    const filename = `ticket-${bookingReference}-${attendeeName.replace(/\s+/g, '-').toLowerCase()}.pdf`;

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}