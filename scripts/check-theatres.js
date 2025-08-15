const { prisma } = require('../lib/prisma');

async function checkTheatres() {
  try {
    const theatres = await prisma.theatre.findMany({
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

    console.log('Current theatres in database:');
    console.log('Total count:', theatres.length);
    console.log('\nDetailed list:');
    theatres.forEach(t => {
      console.log(`ID: ${t.id}, Name: ${t.name}, Language: ${t.content_language}, Group: ${t.translation_group}`);
    });

    // Group by language
    const byLanguage = theatres.reduce((acc, theatre) => {
      if (!acc[theatre.content_language]) {
        acc[theatre.content_language] = [];
      }
      acc[theatre.content_language].push(theatre);
      return acc;
    }, {});

    console.log('\nCount by language:');
    Object.keys(byLanguage).forEach(lang => {
      console.log(`${lang}: ${byLanguage[lang].length} theatres`);
    });

  } catch (error) {
    console.error('Error checking theatres:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatres();