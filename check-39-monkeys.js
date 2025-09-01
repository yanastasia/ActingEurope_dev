const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkFor39Monkeys() {
  try {
    console.log('🔍 Checking for events with "39 Monkeys" in company names...');
    
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { company: { array_contains: 'OSAIK "39 Monkeys"' } },
          { company: { array_contains: 'ОСАИК "39 Маймуни"' } },
          { company: { array_contains: 'ОСАИК "39 Мајмуни"' } },
          { company: { array_contains: 'ОСАИК "39 Мајмуна"' } }
        ]
      },
      select: {
        id: true,
        title: true,
        company: true,
        content_language: true
      }
    });
    
    console.log(`Found ${events.length} events with "39 Monkeys":`);
    
    if (events.length > 0) {
      events.forEach(event => {
        console.log(`- Event ${event.id}: "${event.title}" [${event.content_language}]`);
        console.log(`  Company: ${JSON.stringify(event.company)}`);
      });
    } else {
      console.log('✅ No events found with "39 Monkeys" in company names.');
    }
    
    // Also check for any events with "Aivar" or "Lutenitsa" to see their current company names
    console.log('\n🔍 Checking Aivar/Lutenitsa events specifically...');
    const aivarEvents = await prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: 'Aivar' } },
          { title: { contains: 'Lutenitsa' } },
          { title: { contains: 'Ајвар' } },
          { title: { contains: 'лутеница' } },
          { title: { contains: 'лютеница' } }
        ]
      },
      select: {
        id: true,
        title: true,
        company: true,
        content_language: true
      }
    });
    
    console.log(`Found ${aivarEvents.length} Aivar/Lutenitsa events:`);
    aivarEvents.forEach(event => {
      console.log(`- Event ${event.id}: "${event.title}" [${event.content_language}]`);
      console.log(`  Company: ${JSON.stringify(event.company)}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFor39Monkeys();