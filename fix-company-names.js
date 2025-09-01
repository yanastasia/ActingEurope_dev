// Script to fix company names in database from "39 Monkeys" to "36 Monkeys"
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixCompanyNames() {
  try {
    console.log('🔍 Checking current company names in database...');
    
    // Find all events with company names containing "39 Monkeys" or "39 Маймуни" or "39 Мајмуни" or "39 Мајмуна"
    const eventsWithOldNames = await prisma.event.findMany({
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
    
    console.log(`Found ${eventsWithOldNames.length} events with old company names:`);
    
    if (eventsWithOldNames.length === 0) {
      console.log('✅ No events found with old company names. Database is already up to date!');
      return;
    }
    
    // Display found events
    eventsWithOldNames.forEach(event => {
      console.log(`- Event ${event.id}: "${event.title}" [${event.content_language}]`);
      console.log(`  Current company: ${JSON.stringify(event.company)}`);
    });
    
    console.log('\n🔄 Updating company names...');
    
    // Update each event
    for (const event of eventsWithOldNames) {
      let updatedCompany = [...event.company]; // Create a copy
      
      // Replace old names with new ones
      updatedCompany = updatedCompany.map(company => {
        if (company === 'OSAIK "39 Monkeys"') {
          return 'OSAIK "36 Monkeys"';
        }
        if (company === 'ОСАИК "39 Маймуни"') {
          return 'ОСАИК "36 Маймуни"';
        }
        if (company === 'ОСАИК "39 Мајмуни"') {
          return 'ОСАИК "36 Мајмуни"';
        }
        if (company === 'ОСАИК "39 Мајмуна"') {
          return 'ОСАИК "36 Мајмуна"';
        }
        return company;
      });
      
      // Update the event in database
      await prisma.event.update({
        where: { id: event.id },
        data: { company: updatedCompany }
      });
      
      console.log(`✅ Updated event ${event.id}: "${event.title}" [${event.content_language}]`);
      console.log(`  Old: ${JSON.stringify(event.company)}`);
      console.log(`  New: ${JSON.stringify(updatedCompany)}`);
      console.log('---');
    }
    
    console.log(`\n🎉 Successfully updated ${eventsWithOldNames.length} events!`);
    
    // Verify the changes
    console.log('\n🔍 Verifying changes...');
    const remainingOldEvents = await prisma.event.findMany({
      where: {
        OR: [
          { company: { array_contains: 'OSAIK "39 Monkeys"' } },
          { company: { array_contains: 'ОСАИК "39 Маймуни"' } },
          { company: { array_contains: 'ОСАИК "39 Мајмуни"' } },
          { company: { array_contains: 'ОСАИК "39 Мајмуна"' } }
        ]
      }
    });
    
    if (remainingOldEvents.length === 0) {
      console.log('✅ Verification successful! No events with old company names remain.');
    } else {
      console.log(`❌ Warning: ${remainingOldEvents.length} events still have old company names.`);
    }
    
  } catch (error) {
    console.error('❌ Error fixing company names:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCompanyNames();