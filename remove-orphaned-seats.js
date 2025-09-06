const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function removeOrphanedSeats() {
  try {
    console.log('Removing orphaned booked_seats records...');
    
    // The specific seat IDs that are showing as unavailable but shouldn't be
    const orphanedSeatIds = [8121, 8122, 8123, 8594];
    
    // First, let's check what booked_seats records exist for these seats
    const existingBookedSeats = await prisma.bookedSeat.findMany({
      where: {
        seat_id: { in: orphanedSeatIds }
      },
      include: {
        booking: {
          select: {
            id: true,
            booking_reference: true,
            booking_status: true,
            event_id: true
          }
        },
        seat: {
          select: {
            row_number: true,
            seat_number: true
          }
        }
      }
    });
    
    console.log(`Found ${existingBookedSeats.length} booked_seats records for these seats:`);
    existingBookedSeats.forEach(bs => {
      console.log(`- Seat ${bs.seat.row_number}-${bs.seat.seat_number} (ID: ${bs.seat_id}), Booking: ${bs.booking?.booking_reference || 'NULL'} (${bs.booking?.booking_status || 'NO BOOKING'})`);
    });
    
    // Find booked_seats that have no valid booking (orphaned)
    const orphanedBookedSeats = existingBookedSeats.filter(bs => !bs.booking);
    
    if (orphanedBookedSeats.length > 0) {
      console.log(`\nRemoving ${orphanedBookedSeats.length} orphaned booked_seats records...`);
      
      const deleteResult = await prisma.bookedSeat.deleteMany({
        where: {
          id: {
            in: orphanedBookedSeats.map(bs => bs.id)
          }
        }
      });
      
      console.log(`Successfully deleted ${deleteResult.count} orphaned booked_seats records.`);
    } else {
      console.log('No orphaned booked_seats found. All records have valid bookings.');
      
      // If all have valid bookings, let's check if any bookings should be cancelled/deleted
      const validBookedSeats = existingBookedSeats.filter(bs => bs.booking);
      console.log('\nValid booked_seats with their booking status:');
      validBookedSeats.forEach(bs => {
        console.log(`- Seat ${bs.seat.row_number}-${bs.seat.seat_number}: Booking ${bs.booking.booking_reference} (${bs.booking.booking_status}) for event ${bs.booking.event_id}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeOrphanedSeats();