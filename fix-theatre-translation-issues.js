const { prisma } = require('./lib/prisma');

async function fixTheatreTranslationIssues() {
  console.log('=== FIXING THEATRE TRANSLATION ISSUES ===\n');

  try {
    // 1. Fix Ivan Vazov theatre entries
    console.log('1. FIXING IVAN VAZOV THEATRE ENTRIES...');
    
    // Get all Ivan Vazov entries
    const ivanVazovTheatres = await prisma.theatre.findMany({
      where: {
        OR: [
          { name: { contains: 'Ivan Vazov' } },
          { name: { contains: 'Иван Вазов' } }
        ]
      },
      include: {
        events: true
      },
      orderBy: { id: 'asc' }
    });

    console.log('Current Ivan Vazov entries:');
    ivanVazovTheatres.forEach(theatre => {
      console.log(`- ID ${theatre.id}: "${theatre.name}" [${theatre.content_language}] Group: ${theatre.translation_group} (${theatre.events.length} events)`);
    });

    // Find the main theatre with events (ID 121)
    const mainTheatre = ivanVazovTheatres.find(t => t.events.length > 0);
    if (!mainTheatre) {
      console.log('❌ No main theatre with events found');
      return;
    }

    console.log(`\nUsing theatre ID ${mainTheatre.id} as the main theatre with translation group: ${mainTheatre.translation_group}`);

    // Update all other Ivan Vazov theatres to use the same translation group
    const otherTheatres = ivanVazovTheatres.filter(t => t.id !== mainTheatre.id);
    
    for (const theatre of otherTheatres) {
      if (theatre.translation_group !== mainTheatre.translation_group) {
        console.log(`Updating theatre ID ${theatre.id} to use translation group: ${mainTheatre.translation_group}`);
        await prisma.theatre.update({
          where: { id: theatre.id },
          data: { translation_group: mainTheatre.translation_group }
        });
      }
    }

    // 2. Create missing English translation for Ivan Vazov
    console.log('\n2. CHECKING FOR MISSING ENGLISH TRANSLATION...');
    const englishIvanVazov = ivanVazovTheatres.find(t => t.content_language === 'en');
    
    if (!englishIvanVazov) {
      console.log('Creating English translation for Ivan Vazov...');
      await prisma.theatre.create({
        data: {
          name: '"Ivan Vazov" National Theatre',
          city: 'Sofia',
          country: 'Bulgaria',
          description: 'The Ivan Vazov National Theatre is Bulgaria\'s national theatre and the oldest theatre in the country.',
          content_language: 'en',
          translation_group: mainTheatre.translation_group
        }
      });
      console.log('✅ English translation created');
    } else {
      console.log('✅ English translation already exists');
    }

    // 3. Fix "No man's land" events translation groups
    console.log('\n3. FIXING "NO MAN\'S LAND" EVENTS...');
    const noMansLandEvents = await prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: 'No man\'s land' } },
          { title: { contains: 'No Man\'s Land' } },
          { title: { contains: 'Ничија земја' } }
        ]
      }
    });

    if (noMansLandEvents.length > 0) {
      const translationGroup = `event_no_mans_land_${Date.now()}`;
      console.log(`Found ${noMansLandEvents.length} "No man's land" events, assigning translation group: ${translationGroup}`);
      
      for (const event of noMansLandEvents) {
        await prisma.event.update({
          where: { id: event.id },
          data: { translation_group: translationGroup }
        });
        console.log(`- Updated event ${event.id}: "${event.title}" [${event.content_language}]`);
      }
    } else {
      console.log('No "No man\'s land" events found');
    }

    // 4. Check for events without translation groups
    console.log('\n4. CHECKING EVENTS WITHOUT TRANSLATION GROUPS...');
    const eventsWithoutGroups = await prisma.event.findMany({
      where: {
        translation_group: null
      },
      take: 5
    });

    if (eventsWithoutGroups.length > 0) {
      console.log(`Found ${eventsWithoutGroups.length} events without translation groups (showing first 5):`);
      eventsWithoutGroups.forEach(event => {
        console.log(`- Event ${event.id}: "${event.title}" [${event.content_language}]`);
      });
      
      // Assign unique translation groups to events without them
      for (const event of eventsWithoutGroups) {
        const translationGroup = `event_${event.id}_${Date.now()}`;
        await prisma.event.update({
          where: { id: event.id },
          data: { translation_group: translationGroup }
        });
      }
      console.log('✅ Assigned translation groups to events without them');
    } else {
      console.log('✅ All events have translation groups');
    }

    console.log('\n=== FIXES COMPLETED ===');
    
  } catch (error) {
    console.error('Error fixing theatre translation issues:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixTheatreTranslationIssues().catch(console.error);