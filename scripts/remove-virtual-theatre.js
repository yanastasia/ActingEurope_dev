const { PrismaClient } = require('../lib/prisma-client');

const prisma = new PrismaClient();

async function removeVirtualTheatre() {
  try {
    console.log('🗑️ Removing virtual theatre entries...');

    // Find all virtual theatre entries
    const virtualTheatres = await prisma.theatre.findMany({
      where: {
        OR: [
          { name: { contains: 'Virtual Booking Theatre' } },
          { translation_group: 'virtual_booking_theatre' },
          { translation_group: { startsWith: 'theatre_1755550673008' } } // The specific virtual theatre group
        ]
      },
      include: {
        events: true,
        images: true,
        tags: true
      }
    });

    if (virtualTheatres.length === 0) {
      console.log('✅ No virtual theatre entries found to remove.');
      return;
    }

    console.log(`Found ${virtualTheatres.length} virtual theatre entries:`);
    virtualTheatres.forEach(theatre => {
      console.log(`  - ID: ${theatre.id}, Name: ${theatre.name}, Language: ${theatre.content_language}`);
    });

    // Check if any virtual theatres have associated events
    const theatresWithEvents = virtualTheatres.filter(theatre => theatre.events.length > 0);
    if (theatresWithEvents.length > 0) {
      console.log('⚠️ Warning: Some virtual theatres have associated events:');
      theatresWithEvents.forEach(theatre => {
        console.log(`  - Theatre ID ${theatre.id} has ${theatre.events.length} events`);
      });
      console.log('Please reassign or remove these events before deleting the theatres.');
      return;
    }

    // Remove virtual theatres
    for (const theatre of virtualTheatres) {
      console.log(`\n🗑️ Removing theatre: ${theatre.name} (ID: ${theatre.id})`);
      
      // Delete associated images
      if (theatre.images.length > 0) {
        await prisma.theatreImage.deleteMany({
          where: { theatre_id: theatre.id }
        });
        console.log(`  ✅ Deleted ${theatre.images.length} images`);
      }

      // Delete associated tags
      if (theatre.tags.length > 0) {
        await prisma.theatreTag.deleteMany({
          where: { theatre_id: theatre.id }
        });
        console.log(`  ✅ Deleted ${theatre.tags.length} tags`);
      }

      // Delete the theatre
      await prisma.theatre.delete({
        where: { id: theatre.id }
      });
      console.log(`  ✅ Deleted theatre: ${theatre.name}`);
    }

    console.log('\n🎉 Successfully removed all virtual theatre entries!');
    console.log('Virtual theatre entries have been cleaned up from the database.');

  } catch (error) {
    console.error('❌ Error removing virtual theatre:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeVirtualTheatre();