const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedFromBackup() {
  try {
    console.log('🌱 Starting database seed from backup files...');
    
    const backupDir = path.join(__dirname, 'app', 'admin', 'database-backup');
    
    // Read backup files
    const theatres = JSON.parse(fs.readFileSync(path.join(backupDir, 'theatres_rows.json'), 'utf8'));
    const venues = JSON.parse(fs.readFileSync(path.join(backupDir, 'venues_rows.json'), 'utf8'));
    const venueSections = JSON.parse(fs.readFileSync(path.join(backupDir, 'venue_sections_rows.json'), 'utf8'));
    const events = JSON.parse(fs.readFileSync(path.join(backupDir, 'events_rows.json'), 'utf8'));
    const newsArticles = JSON.parse(fs.readFileSync(path.join(backupDir, 'news_articles_rows.json'), 'utf8'));
    const theatreImages = JSON.parse(fs.readFileSync(path.join(backupDir, 'theatre_images_rows.json'), 'utf8'));
    
    console.log(`📊 Found ${theatres.length} theatres, ${venues.length} venues, ${events.length} events, ${newsArticles.length} news articles`);
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await prisma.event.deleteMany();
    await prisma.newsArticle.deleteMany();
    await prisma.theatreImage.deleteMany();
    await prisma.venueSection.deleteMany();
    await prisma.venue.deleteMany();
    await prisma.theatre.deleteMany();
    
    // Seed theatres
    console.log('🎭 Seeding theatres...');
    for (const theatre of theatres) {
      await prisma.theatre.create({
        data: {
          id: theatre.id,
          name: theatre.name,
          city: theatre.city,
          country: theatre.country,
          description: theatre.description,
          history: theatre.history,
          website: theatre.website,
          founded: theatre.founded,
          contentLanguage: theatre.content_language,
          translationGroup: theatre.translation_group,
          createdAt: new Date(theatre.created_at),
          updatedAt: new Date(theatre.updated_at),
          photoUrl: theatre.photo_url
        }
      });
    }
    console.log(`✅ Seeded ${theatres.length} theatres`);
    
    // Seed venues
    console.log('🏛️ Seeding venues...');
    for (const venue of venues) {
      await prisma.venue.create({
        data: {
          id: venue.id,
          name: venue.name,
          description: venue.description,
          address: venue.address,
          city: venue.city,
          country: venue.country,
          capacity: venue.capacity,
          createdAt: new Date(venue.created_at),
          updatedAt: new Date(venue.updated_at)
        }
      });
    }
    console.log(`✅ Seeded ${venues.length} venues`);
    
    // Seed venue sections
    console.log('🎫 Seeding venue sections...');
    for (const section of venueSections) {
      await prisma.venueSection.create({
        data: {
          id: section.id,
          venueId: section.venue_id,
          name: section.name,
          sectionType: section.section_type,
          capacity: section.capacity,
          priceMultiplier: parseFloat(section.price_multiplier),
          createdAt: new Date(section.created_at),
          updatedAt: new Date(section.updated_at)
        }
      });
    }
    console.log(`✅ Seeded ${venueSections.length} venue sections`);
    
    // Seed events
    console.log('🎪 Seeding events...');
    for (const event of events) {
      await prisma.event.create({
        data: {
          id: event.id,
          title: event.title,
          theatreId: event.theatre_id,
          venueId: event.venue_id,
          eventType: event.event_type,
          eventDate: new Date(event.event_date),
          eventTime: event.event_time,
          description: event.description,
          price: parseFloat(event.price),
          imageUrl: event.image_url,
          posterUrl: event.poster_url,
          language: event.language,
          contentLanguage: event.content_language,
          translationGroup: event.translation_group,
          performanceLanguage: event.performance_language,
          subtitleLanguage: event.subtitle_language,
          genre: event.genre,
          company: event.company,
          director: event.director,
          cast: event.cast,
          subtitles: event.subtitles,
          duration: event.duration,
          isFeatured: event.is_featured,
          createdAt: new Date(event.created_at),
          updatedAt: new Date(event.updated_at)
        }
      });
    }
    console.log(`✅ Seeded ${events.length} events`);
    
    // Seed news articles
    console.log('📰 Seeding news articles...');
    for (const article of newsArticles) {
      await prisma.newsArticle.create({
        data: {
          id: article.id,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          imageUrl: article.image_url,
          publishedAt: new Date(article.published_at),
          contentLanguage: article.content_language,
          translationGroup: article.translation_group,
          createdAt: new Date(article.created_at),
          updatedAt: new Date(article.updated_at)
        }
      });
    }
    console.log(`✅ Seeded ${newsArticles.length} news articles`);
    
    // Seed theatre images
    console.log('🖼️ Seeding theatre images...');
    for (const image of theatreImages) {
      await prisma.theatreImage.create({
        data: {
          id: image.id,
          theatreId: image.theatre_id,
          imageUrl: image.image_url,
          caption: image.caption,
          isPrimary: image.is_primary,
          createdAt: new Date(image.created_at),
          updatedAt: new Date(image.updated_at)
        }
      });
    }
    console.log(`✅ Seeded ${theatreImages.length} theatre images`);
    
    console.log('\n✅ Database seeded successfully from backup files!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedFromBackup()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });