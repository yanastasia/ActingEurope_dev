const { PrismaClient } = require('../lib/prisma-client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importData() {
  try {
    console.log('Starting database import...');

    // Read JSON files
    const dataDir = path.join(__dirname, '..', 'app', 'api', 'database-json');
    
    const venuesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'venues_rows.json'), 'utf8'));
    const theatresData = JSON.parse(fs.readFileSync(path.join(dataDir, 'theatres_rows.json'), 'utf8'));
    const newsArticlesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'news_articles_rows.json'), 'utf8'));
    const eventsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'events_rows.json'), 'utf8'));

    console.log(`Found ${venuesData.length} venues, ${theatresData.length} theatres, ${newsArticlesData.length} news articles, ${eventsData.length} events`);

    // Clear existing data (in correct order due to foreign key constraints)
    console.log('Clearing existing data...');
    await prisma.event.deleteMany();
    await prisma.newsArticle.deleteMany();
    await prisma.venue.deleteMany();
    await prisma.theatre.deleteMany();

    // Create a mapping of old IDs to new IDs
    const theatreIdMap = new Map();
    const venueIdMap = new Map();

    // Import venues
    console.log('Importing venues...');
    for (const venue of venuesData) {
      const newVenue = await prisma.venue.create({
        data: {
          name: venue.name,
          description: venue.description,
          capacity: parseInt(venue.capacity),
          created_at: new Date(venue.created_at)
        }
      });
      venueIdMap.set(venue.id, newVenue.id);
    }

    // Import theatres
    console.log('Importing theatres...');
    for (const theatre of theatresData) {
      const newTheatre = await prisma.theatre.create({
        data: {
          name: theatre.name,
          city: theatre.city,
          country: theatre.country,
          description: theatre.description,
          history: theatre.history,
          website: theatre.website,
          founded_year: theatre.founded_year ? parseInt(theatre.founded_year) : null,
          content_language: theatre.content_language,
          translation_group: theatre.translation_group,
          created_at: new Date(theatre.created_at),
          updated_at: new Date(theatre.updated_at),
          photos: theatre.photos
        }
      });
      theatreIdMap.set(theatre.id, newTheatre.id);
    }

    // Import news articles
    console.log('Importing news articles...');
    for (const article of newsArticlesData) {
      await prisma.newsArticle.create({
        data: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          image_url: article.image_url,
          author: article.author,
          content_language: article.content_language,
          translation_group: article.translation_group,
          published_at: new Date(article.published_at),
          is_published: article.is_published,
          created_at: new Date(article.created_at),
          updated_at: new Date(article.updated_at)
        }
      });
    }

    // Import events
    console.log('Importing events...');
    for (const event of eventsData) {
      // Skip events with invalid theatre or venue references
      const mappedTheatreId = theatreIdMap.get(event.theatre_id);
      const mappedVenueId = venueIdMap.get(event.venue_id);
      
      if (!mappedTheatreId || !mappedVenueId) {
        console.log(`Skipping event "${event.title}" - missing theatre (${event.theatre_id}) or venue (${event.venue_id}) reference`);
        continue;
      }
      
      await prisma.event.create({
        data: {
          title: event.title,
          theatre_id: mappedTheatreId,
          venue_id: mappedVenueId,
          event_type: event.event_type,
          event_date: new Date(event.event_date),
          event_time: new Date(`1970-01-01T${event.event_time}.000Z`),
          description: event.description,
          price: parseFloat(event.price),
          image_url: event.image_url,
          poster_url: event.poster_url,
          language: event.language,
          content_language: event.content_language,
          translation_group: event.translation_group,
          performance_language: event.performance_language,
          subtitle_language: event.subtitle_language,
          genre: event.genre,
          company: event.company,
          director: event.director,
          cast: event.cast,
          subtitles: event.subtitles,
          duration: event.duration,
          is_featured: event.is_featured,
          created_at: new Date(event.created_at),
          updated_at: new Date(event.updated_at)
        }
      });
    }

    console.log('Database import completed successfully!');
    
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importData()
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });