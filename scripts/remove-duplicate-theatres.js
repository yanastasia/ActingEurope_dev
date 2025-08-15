const { prisma } = require('../lib/prisma');

async function removeDuplicateTheatres() {
  try {
    console.log('Starting duplicate theatre removal...');
    
    // Get all theatres grouped by translation_group and content_language
    const theatres = await prisma.theatre.findMany({
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' },
        { id: 'asc' } // Keep the first created one
      ]
    });
    
    // Group theatres by translation_group and language
    const groupedTheatres = {};
    
    theatres.forEach(theatre => {
      const key = `${theatre.translation_group}_${theatre.content_language}`;
      if (!groupedTheatres[key]) {
        groupedTheatres[key] = [];
      }
      groupedTheatres[key].push(theatre);
    });
    
    // Find duplicates and collect IDs to delete
    const idsToDelete = [];
    
    Object.entries(groupedTheatres).forEach(([key, theatreGroup]) => {
      if (theatreGroup.length > 1) {
        console.log(`Found ${theatreGroup.length} duplicates for ${key}:`);
        theatreGroup.forEach((theatre, index) => {
          console.log(`  ID: ${theatre.id}, Name: ${theatre.name}`);
          if (index > 0) { // Keep the first one (index 0), delete the rest
            idsToDelete.push(theatre.id);
          }
        });
      }
    });
    
    if (idsToDelete.length === 0) {
      console.log('No duplicates found!');
      return;
    }
    
    console.log(`\nRemoving ${idsToDelete.length} duplicate theatres...`);
    
    // Delete related data first (foreign key constraints)
    console.log('Deleting related theatre images...');
    await prisma.theatreImage.deleteMany({
      where: {
        theatre_id: {
          in: idsToDelete
        }
      }
    });
    
    console.log('Deleting related theatre tags...');
    await prisma.theatreTag.deleteMany({
      where: {
        theatre_id: {
          in: idsToDelete
        }
      }
    });
    
    console.log('Deleting related events...');
    await prisma.event.deleteMany({
      where: {
        theatre_id: {
          in: idsToDelete
        }
      }
    });
    
    // Finally delete the duplicate theatres
    console.log('Deleting duplicate theatres...');
    const deleteResult = await prisma.theatre.deleteMany({
      where: {
        id: {
          in: idsToDelete
        }
      }
    });
    
    console.log(`Successfully deleted ${deleteResult.count} duplicate theatres.`);
    
    // Verify the results
    const remainingTheatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true,
        translation_group: true
      },
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' }
      ]
    });
    
    console.log('\nRemaining theatres after cleanup:');
    const languageCounts = {};
    remainingTheatres.forEach(theatre => {
      console.log(`ID: ${theatre.id}, Name: ${theatre.name}, Language: ${theatre.content_language}, Group: ${theatre.translation_group}`);
      languageCounts[theatre.content_language] = (languageCounts[theatre.content_language] || 0) + 1;
    });
    
    console.log('\nCount by language after cleanup:');
    Object.entries(languageCounts).forEach(([lang, count]) => {
      console.log(`${lang}: ${count} theatres`);
    });
    
  } catch (error) {
    console.error('Error removing duplicate theatres:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicateTheatres();