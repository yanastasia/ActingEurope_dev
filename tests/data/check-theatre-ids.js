const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function checkTheatreIds() {
  try {
    console.log('Checking existing theatre IDs...');
    
    // Check sample events and their theatre IDs
    const events = await prisma.event.findMany({
      select: { id: true, title: true, theatre_id: true },
      take: 10
    });
    
    console.log('Sample events and their theatre IDs:');
    events.forEach(e => {
      console.log(`Event ${e.id}: "${e.title}" -> Theatre ID: ${e.theatre_id}`);
    });
    
    // Get unique theatre IDs from events
    const uniqueTheatreIds = await prisma.event.findMany({
      select: { theatre_id: true },
      distinct: ['theatre_id']
    });
    
    console.log('\nUnique Theatre IDs used in events:', uniqueTheatreIds.map(e => e.theatre_id).sort((a,b) => a-b));
    
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log('\nExisting theatres:');
    theatres.forEach(theatre => {
      console.log(`ID: ${theatre.id}, Name: ${theatre.name}, Language: ${theatre.content_language}`);
    });
    
  } catch (error) {
    console.error('Error checking theatre IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatreIds();