const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function fixImageIssues() {
  console.log('🔧 Fixing Image Upload and Database Issues\n');

  try {
    await prisma.$connect();
    console.log('✅ Connected to database');

    // 1. Find and fix broken theatre image references
    console.log('\n1. Checking theatre images...');
    const theatreImages = await prisma.theatreImage.findMany({
      include: {
        theatre: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });

    console.log(`Found ${theatreImages.length} theatre images in database`);
    
    const brokenImages = [];
    const validImages = [];
    
    for (const img of theatreImages) {
      if (img.image_url.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', img.image_url);
        if (!fs.existsSync(filePath)) {
          brokenImages.push(img);
          console.log(`❌ Broken: ${img.theatre.name} - ${img.image_url}`);
        } else {
          validImages.push(img);
          console.log(`✅ Valid: ${img.theatre.name} - ${img.image_url}`);
        }
      } else {
        // Check if it's a static image in public folder
        const staticPath = path.join(process.cwd(), 'public', img.image_url);
        if (fs.existsSync(staticPath)) {
          validImages.push(img);
          console.log(`✅ Static: ${img.theatre.name} - ${img.image_url}`);
        } else {
          brokenImages.push(img);
          console.log(`❌ Missing static: ${img.theatre.name} - ${img.image_url}`);
        }
      }
    }

    // 2. Check what files exist in uploads directory
    console.log('\n2. Checking uploads directory...');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const uploadedFiles = fs.readdirSync(uploadsDir);
    console.log(`Found ${uploadedFiles.length} files in uploads:`);
    uploadedFiles.forEach(file => {
      console.log(`   - ${file}`);
    });

    // 3. Check news articles and their images
    console.log('\n3. Checking news articles...');
    const allNewsArticles = await prisma.newsArticle.findMany({
      select: {
        id: true,
        title: true,
        image_url: true,
        content_language: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log(`Found ${allNewsArticles.length} news articles:`);
    allNewsArticles.forEach(article => {
      const imageStatus = article.image_url ? 
        (article.image_url.startsWith('/uploads/') ? 
          (fs.existsSync(path.join(process.cwd(), 'public', article.image_url)) ? '✅' : '❌') : 
          '📁') : 
        '❌';
      console.log(`   ${imageStatus} ${article.title} (${article.content_language}) - ${article.image_url || 'No image'}`);
    });

    // 4. Check for orphaned files (files in uploads not referenced in database)
    console.log('\n4. Checking for orphaned files...');
    const referencedFiles = new Set();
    
    // Collect all referenced upload files
    theatreImages.forEach(img => {
      if (img.image_url.startsWith('/uploads/')) {
        referencedFiles.add(img.image_url.replace('/uploads/', ''));
      }
    });
    
    allNewsArticles.forEach(article => {
      if (article.image_url && article.image_url.startsWith('/uploads/')) {
        referencedFiles.add(article.image_url.replace('/uploads/', ''));
      }
    });

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { image_url: { startsWith: '/uploads/' } },
          { poster_url: { startsWith: '/uploads/' } }
        ]
      },
      select: {
        image_url: true,
        poster_url: true
      }
    });

    events.forEach(event => {
      if (event.image_url && event.image_url.startsWith('/uploads/')) {
        referencedFiles.add(event.image_url.replace('/uploads/', ''));
      }
      if (event.poster_url && event.poster_url.startsWith('/uploads/')) {
        referencedFiles.add(event.poster_url.replace('/uploads/', ''));
      }
    });

    const orphanedFiles = uploadedFiles.filter(file => !referencedFiles.has(file));
    
    if (orphanedFiles.length > 0) {
      console.log(`Found ${orphanedFiles.length} orphaned files:`);
      orphanedFiles.forEach(file => {
        console.log(`   🗑️  ${file}`);
      });
    } else {
      console.log('✅ No orphaned files found');
    }

    // 5. Suggest fixes
    console.log('\n5. Suggested fixes:');
    
    if (brokenImages.length > 0) {
      console.log(`\n📋 ${brokenImages.length} broken image references found:`);
      for (const img of brokenImages) {
        console.log(`   Theatre: ${img.theatre.name}`);
        console.log(`   Image ID: ${img.id}`);
        console.log(`   Broken URL: ${img.image_url}`);
        console.log(`   Suggested action: Update or remove this image reference\n`);
      }
    }

    if (orphanedFiles.length > 0) {
      console.log(`\n🗑️  ${orphanedFiles.length} orphaned files can be cleaned up`);
    }

    // 6. Check upload API endpoint
    console.log('\n6. Checking upload API configuration...');
    const uploadApiPath = path.join(process.cwd(), 'app', 'api', 'upload', 'route.ts');
    if (fs.existsSync(uploadApiPath)) {
      console.log('✅ Upload API endpoint exists');
    } else {
      console.log('❌ Upload API endpoint missing');
    }

    // 7. Check if there are any recent upload attempts
    console.log('\n7. Checking recent upload activity...');
    const recentFiles = uploadedFiles
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          created: stats.birthtime,
          size: stats.size
        };
      })
      .sort((a, b) => b.created - a.created);

    console.log('Recent uploads:');
    recentFiles.slice(0, 5).forEach(file => {
      console.log(`   📁 ${file.name} (${(file.size / 1024).toFixed(1)}KB) - ${file.created.toLocaleString()}`);
    });

    console.log('\n🎉 Image issues analysis completed!');
    
  } catch (error) {
    console.error('❌ Error during analysis:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the analysis
fixImageIssues().catch(console.error);