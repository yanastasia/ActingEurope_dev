const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestData() {
  try {
    console.log('Checking existing data...');
    
    // Check events
    const events = await prisma.event.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        venue_id: true,
        date: true
      }
    });
    
    console.log('Events:', events);
    
    // Check venues
    const venues = await prisma.venue.findMany({
      take: 5,
      select: {
        id: true,
        name: true
      }
    });
    
    console.log('Venues:', venues);
    
    // Check seats
    const seats = await prisma.seat.findMany({
      take: 10,
      select: {
        id: true,
        row_number: true,
        seat_number: true,
        venueSection: {
          select: {
            venue_id: true,
            section_name: true
          }
        }
      }
    });
    
    console.log('Seats:', seats);
    
    // Check users
    const users = await prisma.user.findMany({
      take: 3,
      select: {
        id: true,
        email: true
      }
    });
    
    console.log('Users:', users);
    
    // If we have the necessary data, create a test booking
    if (events.length > 0 && seats.length > 0 && users.length > 0) {
      const event = events[0];
      const seat = seats[0];
      const user = users[0];
      
      console.log('\nCreating test booking...');
      
      // Generate a unique booking reference
      const bookingRef = `BK-TEST-${Date.now()}`;
      
      const booking = await prisma.booking.create({
        data: {
          user_id: user.id,
          event_id: event.id,
          booking_reference: bookingRef,
          total_amount: 25.00,
          booking_status: 'confirmed',
          attendee_names: ['Test User']
        }
      });
      
      console.log('Created booking:', booking);
      
      // Create booked seat
      const bookedSeat = await prisma.bookedSeat.create({
        data: {
          booking_id: booking.id,
          seat_id: seat.id,
          attendee_name: 'Test User',
          qr_code: `QR-${booking.booking_reference}-${seat.id}`
        }
      });
      
      console.log('Created booked seat:', bookedSeat);
      
      console.log(`\n✅ Test booking created successfully!`);
      console.log(`📋 Booking Reference: ${booking.booking_reference}`);
      console.log(`🎫 PDF Download URL: http://localhost:3000/api/bookings/${booking.booking_reference}/pdf`);
      
    } else {
      console.log('❌ Missing required data to create test booking');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestData();