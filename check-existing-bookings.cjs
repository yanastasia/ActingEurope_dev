const { PrismaClient } = require('@prisma/client');

async function checkBookings() {
  const prisma = new PrismaClient();
  
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        reference: true,
        event_id: true,
        user_email: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10
    });
    
    console.log('Recent bookings:');
    if (bookings.length === 0) {
      console.log('No bookings found in database.');
    } else {
      bookings.forEach(booking => {
        console.log(`Reference: ${booking.reference}, Event: ${booking.event_id}, Email: ${booking.user_email}`);
      });
    }
  } catch (error) {
    console.error('Error checking bookings:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkBookings();