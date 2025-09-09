const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestBooking() {
  try {
    console.log('Creating test booking...');
    
    // First, check if we have users and events
    const users = await prisma.user.findMany();
    const events = await prisma.event.findMany();
    const seats = await prisma.seat.findMany({ take: 2 });
    
    console.log(`Found ${users.length} users, ${events.length} events, ${seats.length} seats`);
    
    if (users.length === 0 || events.length === 0 || seats.length === 0) {
      console.log('No users, events, or seats found. Please seed the database first.');
      return;
    }
    
    // Create a test booking
    const booking = await prisma.booking.create({
      data: {
        user_id: users[0].id,
        event_id: events[0].id,
        booking_reference: 'BK-TEST-001',
        total_amount: 25.00,
        booking_status: 'confirmed',
        attendee_names: JSON.stringify(['John Doe', 'Jane Smith']),
        booked_seats: {
          create: [
            {
              seat_id: seats[0].id,
              attendee_name: 'John Doe'
            },
            {
              seat_id: seats[1].id,
              attendee_name: 'Jane Smith'
            }
          ]
        }
      },
      include: {
        booked_seats: {
          include: {
            seat: true
          }
        }
      }
    });
    
    console.log('Test booking created:');
    console.log(`- Booking Reference: ${booking.booking_reference}`);
    console.log(`- User ID: ${booking.user_id}`);
    console.log(`- Event ID: ${booking.event_id}`);
    console.log('- Booked Seats:');
    booking.booked_seats.forEach(bs => {
      console.log(`  * Seat ID: ${bs.seat_id}, Row: ${bs.seat.row_number}, Seat: ${bs.seat.seat_number}, Attendee: ${bs.attendee_name}`);
    });
    
  } catch (error) {
    console.error('Error creating test booking:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestBooking();