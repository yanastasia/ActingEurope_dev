const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function checkVenueIds() {
  try {
    console.log('Checking existing venue IDs...');
    
    const venues = await prisma.venue.findMany({
      select: {
        id: true,
        name: true,
        capacity: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log('\nExisting venues:');
    venues.forEach(venue => {
      console.log(`ID: ${venue.id}, Name: ${venue.name}, Capacity: ${venue.capacity}`);
    });
    
  } catch (error) {
    console.error('Error checking venue IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVenueIds();