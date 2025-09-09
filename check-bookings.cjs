const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkBookings() {
  try {
    console.log('Checking existing bookings...');
    
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        booking_reference: true,
        booking_status: true,
        user_id: true,
        event_id: true,
        booked_seats: {
          select: {
            id: true,
            seat_id: true,
            attendee_name: true
          }
        }
      }
    });
    
    console.log(`Found ${bookings.length} bookings:`);
    bookings.forEach(booking => {
      console.log(`- ${booking.booking_reference} (Status: ${booking.booking_status}, Seats: ${booking.booked_seats.length})`);
      booking.booked_seats.forEach(seat => {
        console.log(`  * Seat ID: ${seat.seat_id}, Attendee: ${seat.attendee_name || 'N/A'}`);
      });
    });
    
  } catch (error) {
    console.error('Error checking bookings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBookings();