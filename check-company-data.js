const { prisma } = require('./lib/prisma');

async function checkCompanyData() {
  console.log('Checking current event company data...');
  
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        company: true,
        content_language: true,
        theatre_id: true,
        event_type: true
      },
      take: 15
    });
    
    console.log('\nCurrent event companies:');
    events.forEach(event => {
      console.log(`${event.id}: ${event.title} [${event.content_language}]`);
      console.log(`  Company: ${JSON.stringify(event.company)}`);
      console.log(`  Theatre ID: ${event.theatre_id}`);
      console.log(`  Event Type: ${event.event_type}`);
      console.log('---');
    });
    
    // Check theatres to see what companies should align with
    console.log('\nChecking theatre names for alignment:');
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      },
      orderBy: [
        { content_language: 'asc' },
        { name: 'asc' }
      ]
    });
    
    theatres.forEach(theatre => {
      console.log(`Theatre ${theatre.id}: ${theatre.name} [${theatre.content_language}]`);
    });
    
  } catch (error) {
    console.error('Error checking company data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCompanyData();