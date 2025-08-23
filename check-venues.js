const { PrismaClient } = require('./lib/prisma-client');
const prisma = new PrismaClient();

async function checkVenues() {
  try {
    const venues = await prisma.venue.findMany();
    console.log('All venues in database:');
    venues.forEach(venue => {
      console.log(`ID: ${venue.id}, Name: ${venue.name}`);
    });
    
    // Check if Chamber Stage exists
    const chamberStage = venues.find(v => v.name === 'Chamber Stage');
    if (!chamberStage) {
      console.log('\nChamber Stage not found, creating it...');
      const newVenue = await prisma.venue.create({
        data: {
          name: 'Chamber Stage',
          description: 'Intimate performance space for smaller productions',
          capacity: 150
        }
      });
      console.log(`Created Chamber Stage with ID: ${newVenue.id}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVenues();