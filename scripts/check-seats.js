const { PrismaClient } = require('../lib/prisma-client');

const prisma = new PrismaClient();

async function checkSeats() {
  try {
    console.log('Checking venues...');
    const venues = await prisma.venue.findMany({
      include: {
        sections: {
          include: {
            seats: true
          }
        }
      }
    });
    
    console.log(`Found ${venues.length} venues`);
    
    for (const venue of venues) {
      console.log(`\nVenue: ${venue.name} (ID: ${venue.id})`);
      console.log(`  Sections: ${venue.sections.length}`);
      
      for (const section of venue.sections) {
        console.log(`    Section: ${section.name} - ${section.seats.length} seats`);
      }
    }
    
    console.log('\nChecking events...');
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        venue_id: true,
        theatre_id: true
      },
      take: 5
    });
    
    console.log(`Found ${events.length} events (showing first 5):`);
    events.forEach(event => {
      console.log(`  Event ${event.id}: ${event.title} (venue: ${event.venue_id}, theatre: ${event.theatre_id})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSeats();