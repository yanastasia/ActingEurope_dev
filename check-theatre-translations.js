const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function checkTheatreTranslations() {
  try {
    console.log('Checking current theatre translations...');
    
    // Get all theatres grouped by language
    const allTheatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        content_language: true,
        translation_group: true
      },
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' }
      ]
    });

    console.log(`\nTotal theatres found: ${allTheatres.length}`);
    
    // Group by language
    const byLanguage = {
      en: [],
      bg: [],
      mk: [],
      sr: []
    };
    
    allTheatres.forEach(theatre => {
      if (byLanguage[theatre.content_language]) {
        byLanguage[theatre.content_language].push(theatre);
      }
    });

    console.log('\n=== THEATRES BY LANGUAGE ===');
    Object.keys(byLanguage).forEach(lang => {
      console.log(`\n${lang.toUpperCase()} (${byLanguage[lang].length} theatres):`);
      byLanguage[lang].forEach(theatre => {
        console.log(`  - ID: ${theatre.id}, Name: ${theatre.name}, Group: ${theatre.translation_group || 'None'}`);
      });
    });

    // Check translation groups
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

    console.log('\n=== TRANSLATION GROUPS ===');
    Object.keys(groupedTheatres).forEach(group => {
      const theatres = groupedTheatres[group];
      console.log(`\nGroup: ${group}`);
      theatres.forEach(theatre => {
        console.log(`  - ${theatre.content_language}: ${theatre.name} (ID: ${theatre.id})`);
      });
      
      // Check for missing languages
      const supportedLanguages = ['en', 'bg', 'mk', 'sr'];
      const existingLanguages = theatres.map(t => t.content_language);
      const missingLanguages = supportedLanguages.filter(lang => !existingLanguages.includes(lang));
      
      if (missingLanguages.length > 0) {
        console.log(`  Missing languages: ${missingLanguages.join(', ')}`);
      }
    });

    if (orphanedTheatres.length > 0) {
      console.log('\n=== ORPHANED THEATRES (No Translation Group) ===');
      orphanedTheatres.forEach(theatre => {
        console.log(`- ID: ${theatre.id}, Language: ${theatre.content_language}, Name: ${theatre.name}`);
      });
    }

    // Show unique locations
    const uniqueLocations = [...new Set(allTheatres.map(t => `${t.city}, ${t.country}`))];
    console.log(`\n=== UNIQUE LOCATIONS ===`);
    uniqueLocations.forEach(loc => console.log(`- ${loc}`));
    
    const uniqueCities = [...new Set(allTheatres.map(t => t.city))];
    console.log(`\n=== UNIQUE CITIES ===`);
    uniqueCities.forEach(city => console.log(`- ${city}`));
    
    const uniqueCountries = [...new Set(allTheatres.map(t => t.country))];
    console.log(`\n=== UNIQUE COUNTRIES ===`);
    uniqueCountries.forEach(country => console.log(`- ${country}`));
    
    // Get all theatres with tags
    const theatresWithTags = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true,
        tags: {
          select: {
            tag_name: true
          }
        }
      }
    });
    
    // Collect all tags
    const allTags = [];
    theatresWithTags.forEach(theatre => {
      if (theatre.tags && theatre.tags.length > 0) {
        theatre.tags.forEach(tag => {
          allTags.push({
            tagName: tag.tag_name,
            theatreName: theatre.name,
            language: theatre.content_language
          });
        });
      }
    });
    
    const uniqueTagNames = [...new Set(allTags.map(tag => tag.tagName))];
    console.log(`\n=== UNIQUE TAG NAMES ===`);
    uniqueTagNames.forEach(tagName => {
      console.log(`- ${tagName}`);
    });
    
    // Group tags by language
    const tagsByLanguage = {};
    allTags.forEach(tag => {
      const lang = tag.language;
      if (!tagsByLanguage[lang]) {
        tagsByLanguage[lang] = new Set();
      }
      tagsByLanguage[lang].add(tag.tagName);
    });
    
    console.log(`\n=== TAGS BY LANGUAGE ===`);
    Object.keys(tagsByLanguage).forEach(lang => {
      console.log(`\n${lang.toUpperCase()}:`);
      [...tagsByLanguage[lang]].forEach(tagName => {
        console.log(`  - ${tagName}`);
      });
    });

    console.log(`\nSummary:`);
    console.log(`Total theatres: ${allTheatres.length}`);
    console.log(`Theatres in English: ${byLanguage.en.length}`);
    console.log(`Theatres in Bulgarian: ${byLanguage.bg.length}`);
    console.log(`Theatres in Macedonian: ${byLanguage.mk.length}`);
    console.log(`Theatres in Serbian: ${byLanguage.sr.length}`);
    console.log(`Orphaned theatres: ${orphanedTheatres.length}`);
    console.log(`Total tag entries: ${allTags.length}`);
    console.log(`Unique tag names: ${uniqueTagNames.length}`);

  } catch (error) {
    console.error('Error checking theatre translations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatreTranslations();