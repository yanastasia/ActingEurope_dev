const { PrismaClient } = require('./lib/prisma-client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function createTestNews() {
  console.log('📰 Creating test news article with image\n');

  try {
    await prisma.$connect();
    console.log('✅ Connected to database');

    // Check available uploaded files
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const availableFiles = fs.readdirSync(uploadsDir);
    
    if (availableFiles.length === 0) {
      console.log('❌ No uploaded files available');
      return;
    }

    const imageUrl = `/uploads/${availableFiles[0]}`;
    console.log(`Using image: ${imageUrl}`);

    // Create test news article with correct schema
    try {
      const testArticle = await prisma.newsArticle.create({
        data: {
          title: 'Test Article - Image Upload Verification',
          excerpt: 'This test article demonstrates the repaired image upload functionality.',
          content: `This article was created to verify that the image upload and database integration is working correctly. 
          
The image upload system has been successfully repaired and tested. Key improvements include:
          
- Fixed broken theatre image references
- Verified upload directory permissions
- Tested database image storage
- Confirmed API endpoint functionality
          
The system is now ready for production use.`,
          image_url: imageUrl,
          content_language: 'en',
          translation_group: `test_news_${Date.now()}`,
          category: 'System Update',
          author: 'System Administrator',
          published_at: new Date(),
          is_published: true
        }
      });
      
      console.log(`✅ Created test news article: ${testArticle.title}`);
      console.log(`   ID: ${testArticle.id}`);
      console.log(`   Image URL: ${testArticle.image_url}`);
      console.log(`   Published: ${testArticle.is_published}`);
      
      // Verify the image file exists
      const imagePath = path.join(process.cwd(), 'public', testArticle.image_url);
      if (fs.existsSync(imagePath)) {
        console.log('✅ Image file exists and is accessible');
        
        const stats = fs.statSync(imagePath);
        console.log(`   File size: ${(stats.size / 1024).toFixed(1)}KB`);
      } else {
        console.log('❌ Image file not found');
      }
      
    } catch (error) {
      console.error('❌ Failed to create test article:', error.message);
      
      // If it's a schema error, show the available fields
      if (error.message.includes('Unknown argument')) {
        console.log('\n📋 Checking NewsArticle schema...');
        
        // Try to get schema info by attempting a findFirst
        try {
          await prisma.newsArticle.findFirst();
        } catch (schemaError) {
          console.log('Schema error details:', schemaError.message);
        }
      }
    }

    // Show current news articles
    console.log('\n📋 Current news articles with images:');
    const newsWithImages = await prisma.newsArticle.findMany({
      where: {
        image_url: { not: null }
      },
      select: {
        id: true,
        title: true,
        image_url: true,
        content_language: true,
        is_published: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    
    if (newsWithImages.length > 0) {
      newsWithImages.forEach(article => {
        const filePath = path.join(process.cwd(), 'public', article.image_url);
        const exists = fs.existsSync(filePath);
        console.log(`   ${exists ? '✅' : '❌'} ${article.title} (${article.content_language})`);
        console.log(`      Image: ${article.image_url}`);
        console.log(`      Published: ${article.is_published}`);
        console.log('');
      });
    } else {
      console.log('   No news articles with images found');
    }
    
    console.log('🎉 Test news creation completed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
createTestNews().catch(console.error);