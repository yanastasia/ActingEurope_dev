const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupOrphanedBookedSeats() {
  try {
    console.log('Starting cleanup of orphaned booked_seats...');
    
    // Find booked_seats that reference non-existent bookings
    const orphanedSeats = await prisma.bookedSeat.findMany({
      where: {
        booking: null
      },
      include: {
        booking: true
      }
    });
    
    console.log(`Found ${orphanedSeats.length} orphaned booked_seats`);
    
    if (orphanedSeats.length > 0) {
      // Delete orphaned booked_seats
      const deleteResult = await prisma.bookedSeat.deleteMany({
        where: {
          id: {
            in: orphanedSeats.map(seat => seat.id)
          }
        }
      });
      
      console.log(`Deleted ${deleteResult.count} orphaned booked_seats`);
    }
    
    // Also check for booked_seats with invalid booking references
    const allBookedSeats = await prisma.bookedSeat.findMany({
      include: {
        booking: true
      }
    });
    
    const invalidSeats = allBookedSeats.filter(seat => !seat.booking);
    console.log(`Found ${invalidSeats.length} booked_seats with invalid booking references`);
    
    if (invalidSeats.length > 0) {
      const deleteInvalidResult = await prisma.bookedSeat.deleteMany({
        where: {
          id: {
            in: invalidSeats.map(seat => seat.id)
          }
        }
      });
      
      console.log(`Deleted ${deleteInvalidResult.count} invalid booked_seats`);
    }
    
    console.log('Cleanup completed successfully!');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupOrphanedBookedSeats();