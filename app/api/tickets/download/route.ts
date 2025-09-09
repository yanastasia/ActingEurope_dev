import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBrandedTicketPdf } from '@/lib/pdf/branded-pdf-generator';
import { formatEventTime } from '@/lib/utils';

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
        seat_id: parseInt(seatId)
        // Note: Using attendeeName from URL parameter instead of database
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

    // Prepare data for the branded PDF generator
    const ticketContext = {
      bookingReference: bookedSeat.booking.booking_reference,
      event: {
        id: bookedSeat.booking.event.id.toString(),
        title: bookedSeat.booking.event.title,
        date: bookedSeat.booking.event.event_date.toLocaleDateString('en-GB'),
        time: bookedSeat.booking.event.event_time ? formatEventTime(bookedSeat.booking.event.event_time) : '19:00',
        venueName: venue,
        venueAddress: undefined // Add if available in your data
      }
    };

    const seatInfo = {
      id: bookedSeat.seat.id.toString(),
      row: bookedSeat.seat.row_number,
      number: bookedSeat.seat.seat_number,
      price: 0, // Add actual price if available
      category: bookedSeat.seat.venueSection?.section_name || 'Standard',
      sectionName: bookedSeat.seat.venueSection?.section_name,
      attendeeEmail: '' // Add if available in your data
    };

    // Generate PDF
    console.log('Generating PDF with context:', ticketContext, 'and seat:', seatInfo);
    const { buffer: pdfBuffer } = await generateBrandedTicketPdf(ticketContext, seatInfo);
    console.log('PDF generated successfully, buffer length:', pdfBuffer.length);

    // Create filename with proper encoding for non-ASCII characters
    const safeAttendee = attendeeName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const filename = `ticket-${bookingReference}-${safeAttendee}.pdf`;
    const encodedFilename = encodeURIComponent(`ticket-${bookingReference}-${attendeeName}.pdf`);

    // Return PDF as download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
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