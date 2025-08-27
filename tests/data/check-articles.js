// Import the shared Prisma instance
const { prisma } = require('./lib/prisma.ts');

async function checkArticles() {
  try {
    const articles = await prisma.newsArticle.findMany({
      select: {
        id: true,
        title: true,
        content_language: true,
        translation_group: true,
        is_published: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log('All news articles:');
    console.table(articles);
    
    // Check specifically for article ID 7
    const article7 = await prisma.newsArticle.findMany({
      where: {
        OR: [
          { id: 7 },
          { translation_group: { in: articles.filter(a => a.id === 7).map(a => a.translation_group).filter(Boolean) } }
        ]
      },
      select: {
        id: true,
        title: true,
        content_language: true,
        translation_group: true,
        is_published: true,
        content: true
      }
    });
    
    console.log('\nArticle 7 and its translations:');
    console.table(article7.map(a => ({
      id: a.id,
      title: a.title,
      content_language: a.content_language,
      translation_group: a.translation_group,
      is_published: a.is_published,
      content_preview: a.content.substring(0, 50) + '...'
    })));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkArticles();