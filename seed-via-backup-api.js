const fs = require('fs');
const path = require('path');

async function seedFromBackupViaAPI() {
  try {
    console.log('🌱 Starting database seed from backup files via API...');
    
    const backupDir = path.join(__dirname, 'app', 'admin', 'database-backup');
    const apiBase = 'http://localhost:3001/api';
    
    // Read backup files
    const theatres = JSON.parse(fs.readFileSync(path.join(backupDir, 'theatres_rows.json'), 'utf8'));
    const venues = JSON.parse(fs.readFileSync(path.join(backupDir, 'venues_rows.json'), 'utf8'));
    const events = JSON.parse(fs.readFileSync(path.join(backupDir, 'events_rows.json'), 'utf8'));
    const newsArticles = JSON.parse(fs.readFileSync(path.join(backupDir, 'news_articles_rows.json'), 'utf8'));
    
    console.log(`📊 Found ${theatres.length} theatres, ${venues.length} venues, ${events.length} events, ${newsArticles.length} news articles`);
    
    // Clear existing data by deleting all records
    console.log('🧹 Clearing existing data...');
    
    try {
      // Get all existing events and delete them
      const existingEvents = await fetch(`${apiBase}/events`).then(r => r.json());
      for (const event of existingEvents) {
        await fetch(`${apiBase}/events/${event.id}`, { method: 'DELETE' });
      }
      console.log(`Deleted ${existingEvents.length} existing events`);
    } catch (e) {
      console.log('No existing events to delete or error:', e.message);
    }
    
    try {
      // Get all existing theatres and delete them
      const existingTheatres = await fetch(`${apiBase}/theatres`).then(r => r.json());
      for (const theatre of existingTheatres) {
        await fetch(`${apiBase}/theatres/${theatre.id}`, { method: 'DELETE' });
      }
      console.log(`Deleted ${existingTheatres.length} existing theatres`);
    } catch (e) {
      console.log('No existing theatres to delete or error:', e.message);
    }
    
    // Seed theatres first
    console.log('🎭 Seeding theatres...');
    for (const theatre of theatres) {
      try {
        const theatreData = {
          name: theatre.name,
          city: theatre.city,
          country: theatre.country,
          description: theatre.description,
          history: theatre.history,
          website: theatre.website,
          founded: theatre.founded,
          contentLanguage: theatre.content_language,
          translationGroup: theatre.translation_group,
          photoUrl: theatre.photo_url
        };
        
        const response = await fetch(`${apiBase}/theatres`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(theatreData)
        });
        
        if (!response.ok) {
          console.error(`Failed to create theatre ${theatre.name}:`, await response.text());
        } else {
          console.log(`✅ Created theatre: ${theatre.name}`);
        }
      } catch (error) {
        console.error(`Error creating theatre ${theatre.name}:`, error.message);
      }
    }
    
    // Seed venues
    console.log('🏛️ Seeding venues...');
    for (const venue of venues) {
      try {
        const venueData = {
          name: venue.name,
          theatreId: venue.theatre_id,
          description: venue.description,
          capacity: venue.capacity,
          venueType: venue.venue_type
        };
        
        const response = await fetch(`${apiBase}/venues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(venueData)
        });
        
        if (!response.ok) {
          console.error(`Failed to create venue ${venue.name}:`, await response.text());
        } else {
          console.log(`✅ Created venue: ${venue.name}`);
        }
      } catch (error) {
        console.error(`Error creating venue ${venue.name}:`, error.message);
      }
    }
    
    // Seed events
    console.log('🎪 Seeding events...');
    for (const event of events) {
      try {
        const eventData = {
          title: event.title,
          theatreId: event.theatre_id,
          venueId: event.venue_id,
          eventType: event.event_type,
          eventDate: event.event_date,
          eventTime: event.event_time,
          description: event.description,
          price: event.price,
          imageUrl: event.image_url,
          posterUrl: event.poster_url,
          language: event.language,
          genre: event.genre,
          company: event.company,
          director: event.director,
          cast: event.cast,
          subtitles: event.subtitles,
          duration: event.duration
        };
        
        const response = await fetch(`${apiBase}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData)
        });
        
        if (!response.ok) {
          console.error(`Failed to create event ${event.title}:`, await response.text());
        } else {
          console.log(`✅ Created event: ${event.title}`);
        }
      } catch (error) {
        console.error(`Error creating event ${event.title}:`, error.message);
      }
    }
    
    // Seed news articles
    console.log('📰 Seeding news articles...');
    for (const article of newsArticles) {
      try {
        const articleData = {
          title: article.title,
          content: article.content,
          summary: article.summary,
          imageUrl: article.image_url,
          language: article.language,
          isPublished: article.is_published
        };
        
        const response = await fetch(`${apiBase}/news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData)
        });
        
        if (!response.ok) {
          console.error(`Failed to create news article ${article.title}:`, await response.text());
        } else {
          console.log(`✅ Created news article: ${article.title}`);
        }
      } catch (error) {
        console.error(`Error creating news article ${article.title}:`, error.message);
      }
    }
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedFromBackupViaAPI();