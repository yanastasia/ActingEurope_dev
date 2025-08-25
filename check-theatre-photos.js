const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTheatrePhotos() {
  try {
    console.log('Checking theatre photos and images...');
    
    // Check theatres with photos column
    const theatresWithPhotos = await prisma.theatre.findMany({
      where: {
        photos: {
          isEmpty: false
        }
      },
      select: {
        id: true,
        name: true,
        photos: true
      }
    });
    
    console.log(`\nTheatres with photos column populated: ${theatresWithPhotos.length}`);
    theatresWithPhotos.forEach(theatre => {
      console.log(`- ${theatre.name} (ID: ${theatre.id}): ${theatre.photos.length} photos`);
      theatre.photos.forEach((photo, index) => {
        console.log(`  ${index + 1}. ${photo}`);
      });
    });
    
    // Check theatre images table
    const theatreImages = await prisma.theatreImage.findMany({
      include: {
        theatre: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    console.log(`\nTheatre images in theatre_images table: ${theatreImages.length}`);
    const imagesByTheatre = {};
    theatreImages.forEach(image => {
      const theatreId = image.theatre_id;
      if (!imagesByTheatre[theatreId]) {
        imagesByTheatre[theatreId] = {
          name: image.theatre.name,
          images: []
        };
      }
      imagesByTheatre[theatreId].images.push({
        url: image.image_url,
        caption: image.caption,
        is_primary: image.is_primary
      });
    });
    
    Object.entries(imagesByTheatre).forEach(([theatreId, data]) => {
      console.log(`- ${data.name} (ID: ${theatreId}): ${data.images.length} images`);
      data.images.forEach((image, index) => {
        console.log(`  ${index + 1}. ${image.url} ${image.is_primary ? '(PRIMARY)' : ''} ${image.caption ? `- ${image.caption}` : ''}`);
      });
    });
    
    // Check for discrepancies
    console.log('\n=== ANALYSIS ===');
    const theatresWithImagesButNoPhotos = await prisma.theatre.findMany({
      where: {
        AND: [
          { images: { some: {} } },
          { photos: { isEmpty: true } }
        ]
      },
      include: {
        images: true
      }
    });
    
    console.log(`\nTheatres with images in theatre_images but empty photos column: ${theatresWithImagesButNoPhotos.length}`);
    theatresWithImagesButNoPhotos.forEach(theatre => {
      console.log(`- ${theatre.name} (ID: ${theatre.id}): ${theatre.images.length} images in theatre_images table, but photos column is empty`);
    });
    
  } catch (error) {
    console.error('Error checking theatre photos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatrePhotos();