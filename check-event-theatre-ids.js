const { prisma } = require('./lib/prisma');

async function checkEventTheatreIds() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        theatre_id: true
      }
    });
    
    console.log('Events and their theatre IDs:');
    events.forEach(event => {
      console.log(`Event ${event.id}: "${event.title}" - Theatre ID: ${event.theatre_id}`);
    });
    
    // Also check what theatres exist
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      },
      orderBy: { id: 'asc' }
    });
    
    console.log('\nTheatres in database:');
    theatres.forEach(theatre => {
      console.log(`Theatre ${theatre.id}: "${theatre.name}" [${theatre.content_language}]`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEventTheatreIds();