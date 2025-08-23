const { PrismaClient } = require('../lib/prisma-client');

const prisma = new PrismaClient();

async function checkTheatreLanguages() {
  try {
    console.log('Checking existing theatres and their languages...');
    
    // Get all theatres grouped by translation group
    const allTheatres = await prisma.theatre.findMany({
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' }
      ]
    });

    console.log(`\nTotal theatres found: ${allTheatres.length}`);
    
    // Group by translation group
    const groupedTheatres = {};
    const orphanedTheatres = [];
    
    allTheatres.forEach(theatre => {
      if (theatre.translation_group) {
        if (!groupedTheatres[theatre.translation_group]) {
          groupedTheatres[theatre.translation_group] = [];
        }
        groupedTheatres[theatre.translation_group].push(theatre);
      } else {
        orphanedTheatres.push(theatre);
      }
    });

    console.log('\n=== THEATRES WITH TRANSLATION GROUPS ===');
    Object.keys(groupedTheatres).forEach(group => {
      const theatres = groupedTheatres[group];
      console.log(`\nTranslation Group: ${group}`);
      theatres.forEach(theatre => {
        console.log(`  - ID: ${theatre.id}, Language: ${theatre.content_language}, Name: ${theatre.name}`);
      });
      
      // Check for missing languages
      const supportedLanguages = ['en', 'bg', 'mk', 'sr'];
      const existingLanguages = theatres.map(t => t.content_language);
      const missingLanguages = supportedLanguages.filter(lang => !existingLanguages.includes(lang));
      
      if (missingLanguages.length > 0) {
        console.log(`  ⚠️  Missing languages: ${missingLanguages.join(', ')}`);
      } else {
        console.log(`  ✅ All languages present`);
      }
    });

    console.log('\n=== ORPHANED THEATRES (No Translation Group) ===');
    if (orphanedTheatres.length > 0) {
      orphanedTheatres.forEach(theatre => {
        console.log(`- ID: ${theatre.id}, Language: ${theatre.content_language}, Name: ${theatre.name}`);
      });
    } else {
      console.log('No orphaned theatres found.');
    }

    // Summary
    console.log('\n=== SUMMARY ===');
    console.log(`Translation groups: ${Object.keys(groupedTheatres).length}`);
    console.log(`Orphaned theatres: ${orphanedTheatres.length}`);
    
    // Check which groups need additional languages
    const incompleteGroups = Object.keys(groupedTheatres).filter(group => {
      const theatres = groupedTheatres[group];
      const existingLanguages = theatres.map(t => t.content_language);
      const supportedLanguages = ['en', 'bg', 'mk', 'sr'];
      return supportedLanguages.some(lang => !existingLanguages.includes(lang));
    });
    
    console.log(`Groups needing additional languages: ${incompleteGroups.length}`);
    
  } catch (error) {
    console.error('Error checking theatre languages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatreLanguages();