const { prisma } = require('./lib/prisma');

async function checkVenueIds() {
  try {
    console.log('🔍 Checking venue IDs in database...');
    
    const venues = await prisma.venue.findMany({
      select: {
        id: true,
        name: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log(`\n📊 Found ${venues.length} venues:`);
    venues.forEach(venue => {
      console.log(`ID: ${venue.id} | ${venue.name}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking venue IDs:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkVenueIds();