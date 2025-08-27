const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTheatreTags() {
  try {
    console.log('=== THEATRE TAGS ANALYSIS ===\n');
    
    // Get all theatre tags
    const tags = await prisma.theatre_tags.findMany({
      include: {
        theatre: {
          select: {
            id: true,
            name: true,
            content_language: true
          }
        }
      },
      orderBy: {
        tag_name: 'asc'
      }
    });
    
    console.log('All theatre tags:');
    tags.forEach(tag => {
      console.log(`- "${tag.tag_name}" (Theatre: ${tag.theatre.name} [${tag.theatre.content_language}])`);
    });
    
    // Get unique tag names
    const uniqueTagNames = [...new Set(tags.map(tag => tag.tag_name))];
    console.log('\n=== UNIQUE TAG NAMES ===');
    uniqueTagNames.forEach(tagName => {
      console.log(`- ${tagName}`);
    });
    
    // Group tags by language
    const tagsByLanguage = {};
    tags.forEach(tag => {
      const lang = tag.theatre.content_language;
      if (!tagsByLanguage[lang]) {
        tagsByLanguage[lang] = new Set();
      }
      tagsByLanguage[lang].add(tag.tag_name);
    });
    
    console.log('\n=== TAGS BY LANGUAGE ===');
    Object.keys(tagsByLanguage).forEach(lang => {
      console.log(`\n${lang.toUpperCase()}:`);
      [...tagsByLanguage[lang]].forEach(tagName => {
        console.log(`  - ${tagName}`);
      });
    });
    
    console.log(`\n=== SUMMARY ===`);
    console.log(`Total tag entries: ${tags.length}`);
    console.log(`Unique tag names: ${uniqueTagNames.length}`);
    console.log(`Languages with tags: ${Object.keys(tagsByLanguage).join(', ')}`);
    
  } catch (error) {
    console.error('Error checking theatre tags:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatreTags();