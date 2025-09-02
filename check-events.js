const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkEvents() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        performance_language: true,
        content_language: true,
        language: true
      }
    });
    
    console.log('Total events:', events.length);
    console.log('Events with performance languages:');
    events.forEach(event => {
      console.log(`ID: ${event.id}, Title: ${event.title}, Performance Lang: ${event.performance_language}, Content Lang: ${event.content_language}, Lang: ${event.language}`);
    });
    
    const englishEvents = events.filter(event => 
      event.performance_language === 'English' || 
      event.performance_language === 'english' ||
      (!event.performance_language && event.title && /english/i.test(event.title))
    );
    
    console.log('\nEnglish events found:', englishEvents.length);
    englishEvents.forEach(event => {
      console.log(`- ${event.title} (Performance Lang: ${event.performance_language})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEvents();