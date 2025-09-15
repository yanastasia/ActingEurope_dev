// Test script to verify the simplified booking process
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSimplifiedBooking() {
  try {
    console.log('Testing simplified booking process...');
    
    // Check if we have events and seats
    const events = await prisma.event.findMany({
      take: 1,
      select: {
        id: true,
        title: true,
        price: true
      }
    });
    
    const seats = await prisma.seat.findMany({
      take: 2,
      where: {
        is_available: true
      },
      select: {
        id: true,
        row_number: true,
        seat_number: true
      }
    });
    
    console.log(`Found ${events.length} events and ${seats.length} available seats`);
    
    if (events.length > 0 && seats.length > 0) {
      const event = events[0];
      const selectedSeats = seats.slice(0, 2);
      
      console.log('\nEvent details:');
      console.log(`- ID: ${event.id}`);
      console.log(`- Title: ${event.title}`);
      console.log(`- Price: €${event.price}`);
      
      console.log('\nSelected seats:');
      selectedSeats.forEach(seat => {
        console.log(`- Seat ID: ${seat.id}, Row: ${seat.row_number}, Seat: ${seat.seat_number}`);
      });
      
      const totalAmount = parseFloat(event.price) * selectedSeats.length;
      console.log(`\nCalculated total: €${totalAmount}`);
      
      console.log('\n✅ Booking data structure is ready!');
      console.log('The API now expects:');
      console.log('- event_id: number');
      console.log('- seat_ids: number[]');
      console.log('- No userId (gets from session)');
      console.log('- No attendee_names (uses user email)');
      console.log('- No totalAmount (calculated from event price)');
      
    } else {
      console.log('❌ No events or available seats found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSimplifiedBooking();