const { PrismaClient } = require('@prisma/client');

async function testEventsDirect() {
  let prisma;
  try {
    prisma = new PrismaClient();
    
    console.log('🔍 Testing direct database access...');
    
    // Check if we can connect to the database
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Count theatres
    const theatreCount = await prisma.theatre.count();
    console.log(`Theatres in database: ${theatreCount}`);
    
    // Count events
    const eventCount = await prisma.event.count();
    console.log(`Events in database: ${eventCount}`);
    
    if (eventCount > 0) {
      // Get first few events
      const events = await prisma.event.findMany({
        take: 5,
        select: {
          id: true,
          title: true,
          theatre_id: true,
          content_language: true,
          event_date: true,
          event_time: true
        }
      });
      
      console.log('\nFirst 5 events:');
      events.forEach(event => {
        console.log(`- ${event.title} (ID: ${event.id}, Theatre: ${event.theatre_id}, Lang: ${event.content_language})`);
      });
      
      // Check unique titles
      const allEvents = await prisma.event.findMany({
        select: {
          title: true
        }
      });
      
      const uniqueTitles = [...new Set(allEvents.map(e => e.title.replace(/ \((EN|BG|MK|SR)\)$/, '')))];
      console.log(`\nUnique event titles: ${uniqueTitles.length}`);
      uniqueTitles.forEach((title, index) => {
        console.log(`${index + 1}. ${title}`);
      });
    }
    
    // Test the database operations functions
    console.log('\n🧪 Testing database operations...');
    
    try {
      const { getAllEvents } = require('./lib/database-operations');
      const events = await getAllEvents();
      console.log(`getAllEvents() returned: ${events.length} events`);
    } catch (error) {
      console.log(`❌ Error with getAllEvents(): ${error.message}`);
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

testEventsDirect();