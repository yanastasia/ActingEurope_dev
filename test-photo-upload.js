const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function testPhotoUploadWorkflow() {
  console.log('🔍 Testing Photo Upload and Database Handling Workflow\n');

  try {
    // 1. Check uploads directory
    console.log('1. Checking uploads directory...');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Uploads directory does not exist');
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Created uploads directory');
    } else {
      console.log('✅ Uploads directory exists');
      const files = fs.readdirSync(uploadsDir);
      console.log(`   Found ${files.length} files: ${files.join(', ')}`);
    }

    // 2. Test database connections
    console.log('\n2. Testing database connections...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // 3. Check theatre images in database
    console.log('\n3. Checking theatre images in database...');
    const theatreImages = await prisma.theatreImage.findMany({
      take: 5,
      include: {
        theatre: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });
    
    console.log(`   Found ${theatreImages.length} theatre images:`);
    theatreImages.forEach(img => {
      console.log(`   - Theatre: ${img.theatre.name} | URL: ${img.image_url} | Primary: ${img.is_primary}`);
      
      // Check if file exists
      if (img.image_url.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', img.image_url);
        const exists = fs.existsSync(filePath);
        console.log(`     File exists: ${exists ? '✅' : '❌'} (${filePath})`);
      }
    });

    // 4. Check news article images
    console.log('\n4. Checking news article images in database...');
    const newsImages = await prisma.newsArticle.findMany({
      where: {
        image_url: {
          not: null
        }
      },
      take: 5,
      select: {
        id: true,
        title: true,
        image_url: true,
        content_language: true
      }
    });
    
    console.log(`   Found ${newsImages.length} news articles with images:`);
    newsImages.forEach(article => {
      console.log(`   - Article: ${article.title} (${article.content_language}) | URL: ${article.image_url}`);
      
      // Check if file exists
      if (article.image_url && article.image_url.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', article.image_url);
        const exists = fs.existsSync(filePath);
        console.log(`     File exists: ${exists ? '✅' : '❌'} (${filePath})`);
      }
    });

    // 5. Check event images
    console.log('\n5. Checking event images in database...');
    const eventImages = await prisma.event.findMany({
      where: {
        OR: [
          { image_url: { not: null } },
          { poster_url: { not: null } }
        ]
      },
      take: 5,
      select: {
        id: true,
        title: true,
        image_url: true,
        poster_url: true,
        content_language: true
      }
    });
    
    console.log(`   Found ${eventImages.length} events with images:`);
    eventImages.forEach(event => {
      console.log(`   - Event: ${event.title} (${event.content_language})`);
      if (event.image_url) {
        console.log(`     Image URL: ${event.image_url}`);
        if (event.image_url.startsWith('/uploads/')) {
          const filePath = path.join(process.cwd(), 'public', event.image_url);
          const exists = fs.existsSync(filePath);
          console.log(`     Image file exists: ${exists ? '✅' : '❌'}`);
        }
      }
      if (event.poster_url) {
        console.log(`     Poster URL: ${event.poster_url}`);
        if (event.poster_url.startsWith('/uploads/')) {
          const filePath = path.join(process.cwd(), 'public', event.poster_url);
          const exists = fs.existsSync(filePath);
          console.log(`     Poster file exists: ${exists ? '✅' : '❌'}`);
        }
      }
    });

    // 6. Test file upload simulation
    console.log('\n6. Testing file upload simulation...');
    const testImagePath = path.join(uploadsDir, 'test-image.txt');
    fs.writeFileSync(testImagePath, 'This is a test file to simulate upload');
    console.log('✅ Test file created successfully');
    
    // Clean up test file
    fs.unlinkSync(testImagePath);
    console.log('✅ Test file cleaned up');

    // 7. Check for common issues
    console.log('\n7. Checking for common issues...');
    
    // Check for broken image URLs
    const brokenTheatreImages = await prisma.theatreImage.findMany({
      where: {
        image_url: {
          startsWith: '/uploads/'
        }
      }
    });
    
    let brokenCount = 0;
    for (const img of brokenTheatreImages) {
      const filePath = path.join(process.cwd(), 'public', img.image_url);
      if (!fs.existsSync(filePath)) {
        brokenCount++;
      }
    }
    
    if (brokenCount > 0) {
      console.log(`❌ Found ${brokenCount} broken theatre image references`);
    } else {
      console.log('✅ All theatre image files exist');
    }

    // Check for broken news images
    const brokenNewsImages = await prisma.newsArticle.findMany({
      where: {
        image_url: {
          startsWith: '/uploads/'
        }
      }
    });
    
    let brokenNewsCount = 0;
    for (const article of brokenNewsImages) {
      if (article.image_url) {
        const filePath = path.join(process.cwd(), 'public', article.image_url);
        if (!fs.existsSync(filePath)) {
          brokenNewsCount++;
        }
      }
    }
    
    if (brokenNewsCount > 0) {
      console.log(`❌ Found ${brokenNewsCount} broken news image references`);
    } else {
      console.log('✅ All news image files exist');
    }

    console.log('\n🎉 Photo upload workflow test completed!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testPhotoUploadWorkflow().catch(console.error);