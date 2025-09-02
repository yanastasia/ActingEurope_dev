const fs = require('fs');
const path = require('path');

// Base URL for the API
const API_BASE = 'http://localhost:3001/api';

// Helper function to make HTTP requests
async function makeRequest(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    
    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${result}`);
      return null;
    }
    
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error(`Request failed for ${url}:`, error.message);
    return null;
  }
}

// Load JSON data from backup files
function loadBackupData(filename) {
  try {
    const filePath = path.join(__dirname, 'app', 'admin', 'database-backup', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return [];
  }
}

// Clear existing data
async function clearData() {
  console.log('Clearing existing data...');
  
  const endpoints = ['events', 'venues', 'theatres', 'news'];
  
  for (const endpoint of endpoints) {
    try {
      const result = await makeRequest(`${API_BASE}/${endpoint}`, 'DELETE');
      if (result) {
        console.log(`✓ Cleared ${endpoint}`);
      }
    } catch (error) {
      console.log(`⚠ Could not clear ${endpoint}: ${error.message}`);
    }
  }
}

// Seed theatres first (they are referenced by events)
async function seedTheatres() {
  console.log('\nSeeding theatres...');
  const theatres = loadBackupData('theatres_rows.json');
  
  let successCount = 0;
  for (const theatre of theatres) {
    const theatreData = {
      name: theatre.name,
      description: theatre.description || '',
      address: theatre.address || '',
      city: theatre.city || '',
      country: theatre.country || 'Bulgaria',
      website: theatre.website || '',
      email: theatre.email || '',
      phone: theatre.phone || '',
      imageUrl: theatre.image_url || '',
      language: theatre.language || 'Bulgarian'
    };
    
    const result = await makeRequest(`${API_BASE}/theatres`, 'POST', theatreData);
    if (result && result.success) {
      console.log(`✓ Created theatre: ${theatre.name}`);
      successCount++;
    } else {
      console.log(`✗ Failed to create theatre: ${theatre.name}`);
    }
  }
  
  console.log(`Theatres seeded: ${successCount}/${theatres.length}`);
}

// Seed venues
async function seedVenues() {
  console.log('\nSeeding venues...');
  const venues = loadBackupData('venues_rows.json');
  const venueSections = loadBackupData('venue_sections_rows.json');
  
  let successCount = 0;
  for (const venue of venues) {
    // Get sections for this venue
    const sections = venueSections.filter(section => section.venue_id === venue.id);
    
    const venueData = {
      name: venue.name,
      description: venue.description || '',
      capacity: venue.capacity || 100,
      imageUrl: venue.image_url || '',
      sections: sections.map(section => ({
        sectionName: section.section_name,
        sectionType: section.section_type,
        rows: [] // We'll add basic rows structure
      }))
    };
    
    // Add basic seat structure if no sections
    if (venueData.sections.length === 0) {
      venueData.sections = [{
        sectionName: 'Main',
        sectionType: 'regular',
        rows: []
      }];
    }
    
    const result = await makeRequest(`${API_BASE}/venues`, 'POST', venueData);
    if (result && result.success) {
      console.log(`✓ Created venue: ${venue.name}`);
      successCount++;
    } else {
      console.log(`✗ Failed to create venue: ${venue.name}`);
    }
  }
  
  console.log(`Venues seeded: ${successCount}/${venues.length}`);
}

// Seed events (requires theatres and venues to exist)
async function seedEvents() {
  console.log('\nSeeding events...');
  const events = loadBackupData('events_rows.json');
  
  // Get current theatres and venues to map IDs
  const currentTheatres = await makeRequest(`${API_BASE}/theatres`);
  const currentVenues = await makeRequest(`${API_BASE}/venues`);
  
  if (!currentTheatres || !currentVenues) {
    console.log('✗ Could not fetch current theatres/venues for mapping');
    return;
  }
  
  let successCount = 0;
  for (const event of events) {
    // Find matching venue (use first available if not found)
    let venueId = null;
    if (event.venue_id) {
      const venue = currentVenues.find(v => v.name === 'Main Stage' || v.name === 'Chamber Stage');
      if (venue) {
        venueId = parseInt(venue.id);
      }
    }
    
    // Use first available theatre if theatre_id doesn't match
    let theatreId = currentTheatres.length > 0 ? parseInt(currentTheatres[0].id) : 121;
    
    const eventData = {
      title: event.title,
      description: event.description || '',
      eventType: event.event_type || 'performance',
      eventDate: event.event_date,
      eventTime: event.event_time,
      price: event.price || '0.00',
      imageUrl: event.image_url || '',
      posterUrl: event.poster_url || '',
      language: event.language || 'Bulgarian',
      genre: event.genre || 'Drama',
      company: event.company || ['Theatre Company'],
      director: event.director || '',
      cast: event.cast || [],
      subtitles: event.subtitles || '',
      duration: event.duration || '120 minutes',
      isFeatured: event.is_featured || false,
      theatreId: theatreId,
      venueId: venueId,
      performanceLanguage: event.performance_language || event.language,
      subtitleLanguage: event.subtitle_language || 'en'
    };
    
    const result = await makeRequest(`${API_BASE}/events`, 'POST', eventData);
    if (result && result.success) {
      console.log(`✓ Created event: ${event.title}`);
      successCount++;
    } else {
      console.log(`✗ Failed to create event: ${event.title}`);
    }
  }
  
  console.log(`Events seeded: ${successCount}/${events.length}`);
}

// Seed news articles
async function seedNews() {
  console.log('\nSeeding news articles...');
  const newsArticles = loadBackupData('news_articles_rows.json');
  
  let successCount = 0;
  for (const article of newsArticles) {
    const newsData = {
      title: article.title,
      content: article.content || '',
      excerpt: article.excerpt || '',
      imageUrl: article.image_url || '',
      language: article.language || 'Bulgarian',
      isPublished: article.is_published !== false,
      publishedAt: article.published_at || new Date().toISOString()
    };
    
    const result = await makeRequest(`${API_BASE}/news`, 'POST', newsData);
    if (result && result.success) {
      console.log(`✓ Created news article: ${article.title}`);
      successCount++;
    } else {
      console.log(`✗ Failed to create news article: ${article.title}`);
    }
  }
  
  console.log(`News articles seeded: ${successCount}/${newsArticles.length}`);
}

// Main seeding function
async function main() {
  console.log('Starting database seeding from backup files...');
  console.log('='.repeat(50));
  
  try {
    // Clear existing data first
    await clearData();
    
    // Seed in order of dependencies
    await seedTheatres();
    await seedVenues();
    await seedEvents();
    await seedNews();
    
    console.log('\n' + '='.repeat(50));
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('\nSeeding failed:', error.message);
    process.exit(1);
  }
}

// Run the seeding
main();