const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkEvents() {
  try {
    console.log('🔍 Checking current events in database...');
    
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        content_language: true,
        translation_group: true,
        theatre_id: true
      }
    });
    
    console.log(`\nFound ${events.length} events:`);
    events.forEach(event => {
      console.log(`- ID ${event.id}: "${event.title}" [${event.content_language || 'no lang'}] (Theatre: ${event.theatre_id}, Group: ${event.translation_group || 'none'})`);
    });
    
    // Check for No Man's Land specifically
    const noMansLandEvents = events.filter(e => 
      e.title.toLowerCase().includes('no man') || 
      e.title.toLowerCase().includes('ничија земја')
    );
    
    console.log(`\n🎭 "No Man's Land" events found: ${noMansLandEvents.length}`);
    noMansLandEvents.forEach(event => {
      console.log(`- ID ${event.id}: "${event.title}" [${event.content_language}]`);
    });
    
    // Check theatres
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      }
    });
    
    console.log(`\n🏛️ Available theatres: ${theatres.length}`);
    theatres.forEach(theatre => {
      console.log(`- ID ${theatre.id}: "${theatre.name}" [${theatre.content_language}]`);
    });
    
  } catch (error) {
    console.error('❌ Error checking events:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkEvents();