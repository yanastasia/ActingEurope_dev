const { prisma } = require('./lib/prisma');

async function alignCompanyWithTheatres() {
  console.log('Aligning company fields with theatre names...');
  
  try {
    // Get all events
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        company: true,
        content_language: true,
        theatre_id: true,
        event_type: true
      }
    });
    
    console.log(`Found ${events.length} events to process`);
    
    // Get all theatres for mapping
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      }
    });
    
    // Create theatre mapping by ID and language
    const theatreMap = {};
    theatres.forEach(theatre => {
      if (!theatreMap[theatre.id]) {
        theatreMap[theatre.id] = {};
      }
      theatreMap[theatre.id][theatre.content_language] = theatre.name;
    });
    
    let updatedCount = 0;
    
    for (const event of events) {
      let newCompany;
      
      if (event.event_type === 'workshop' || event.event_type === 'discussion') {
        // Workshops and discussions are organized by ActingEurope
        newCompany = ['ActingEurope'];
      } else {
        // For performances, use the theatre name based on theatre_id and content_language
        if (event.theatre_id && theatreMap[event.theatre_id] && theatreMap[event.theatre_id][event.content_language]) {
          newCompany = [theatreMap[event.theatre_id][event.content_language]];
        } else {
          // Fallback to existing company if theatre mapping not found
          newCompany = event.company || ['Unknown Theatre'];
        }
      }
      
      // Update the event if company has changed
      const currentCompanyStr = JSON.stringify(event.company || []);
      const newCompanyStr = JSON.stringify(newCompany);
      
      if (currentCompanyStr !== newCompanyStr) {
        await prisma.event.update({
          where: { id: event.id },
          data: { company: newCompany }
        });
        
        console.log(`Updated event ${event.id}: "${event.title}" [${event.content_language}]`);
        console.log(`  Old company: ${currentCompanyStr}`);
        console.log(`  New company: ${newCompanyStr}`);
        console.log(`  Event type: ${event.event_type}`);
        console.log('---');
        
        updatedCount++;
      }
    }
    
    console.log(`\n✅ Company alignment completed!`);
    console.log(`Updated ${updatedCount} events`);
    
    // Verify the results
    console.log('\nVerification - Sample of updated events:');
    const sampleEvents = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        company: true,
        content_language: true,
        event_type: true
      },
      take: 10
    });
    
    sampleEvents.forEach(event => {
      console.log(`${event.id}: ${event.title} [${event.content_language}] - ${event.event_type}`);
      console.log(`  Company: ${JSON.stringify(event.company)}`);
    });
    
  } catch (error) {
    console.error('Error aligning company data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

alignCompanyWithTheatres();