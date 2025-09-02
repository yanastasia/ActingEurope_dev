const fs = require('fs');
const path = require('path');

// Base URL for API calls
const BASE_URL = 'http://localhost:3001';

// Helper function to make API requests
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

  const response = await fetch(url, options);
  const responseText = await response.text();
  
  if (!response.ok) {
    console.error(`❌ ${method} ${url} failed:`, response.status, responseText);
    return null;
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    return responseText;
  }
}

// Load backup data
function loadBackupData(filename) {
  const filePath = path.join(__dirname, 'app', 'admin', 'database-backup', filename);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Seed events
async function seedEvents() {
  console.log('\n🎭 Seeding events...');
  const events = loadBackupData('events_rows.json');
  let successCount = 0;

  for (const event of events) {
    // Map backup data to API expected format
    const eventData = {
      title: event.title,
      eventType: event.event_type,
      eventDate: event.event_date,
      eventTime: event.event_time,
      venue: event.venue_id,
      company: event.company,
      description: event.description,
      imageUrl: event.image_url,
      posterUrl: event.poster_url,
      isFeatured: event.is_featured,
      price: event.price,
      theatreId: event.theatre_id,
      language: event.content_language,
      genre: event.genre,
      director: event.director,
      cast: event.cast,
      subtitles: event.subtitles,
      duration: event.duration,
      performanceLanguage: event.performance_language,
      subtitleLanguage: event.subtitle_language
    };

    const result = await makeRequest(`${BASE_URL}/api/events`, 'POST', eventData);
    if (result) {
      successCount++;
      console.log(`✅ Created event: ${event.title}`);
    }
  }

  console.log(`📊 Events seeded: ${successCount}/${events.length}`);
}

// Seed venue sections (via venues API)
async function seedVenueSections() {
  console.log('\n🏛️ Seeding venue sections...');
  const venueSections = loadBackupData('venue_sections_rows.json');
  
  // Group sections by venue_id
  const sectionsByVenue = {};
  venueSections.forEach(section => {
    if (!sectionsByVenue[section.venue_id]) {
      sectionsByVenue[section.venue_id] = [];
    }
    sectionsByVenue[section.venue_id].push({
      sectionName: section.section_name,
      sectionType: section.section_type
    });
  });

  let successCount = 0;
  
  // Update each venue with its sections
  for (const [venueId, sections] of Object.entries(sectionsByVenue)) {
    // First get the current venue data
    const venue = await makeRequest(`${BASE_URL}/api/venues/${venueId}`);
    if (!venue) {
      console.log(`❌ Could not find venue ${venueId}`);
      continue;
    }

    // Update venue with sections
    const venueData = {
      ...venue,
      sections: sections
    };

    const result = await makeRequest(`${BASE_URL}/api/venues/${venueId}`, 'PUT', venueData);
    if (result) {
      successCount += sections.length;
      console.log(`✅ Updated venue ${venueId} with ${sections.length} sections`);
    }
  }

  console.log(`📊 Venue sections seeded: ${successCount}/${venueSections.length}`);
}

// Seed theatre images (via theatres API)
async function seedTheatreImages() {
  console.log('\n🖼️ Seeding theatre images...');
  const theatreImages = loadBackupData('theatre_images_rows.json');
  
  // Group images by theatre_id
  const imagesByTheatre = {};
  theatreImages.forEach(image => {
    if (!imagesByTheatre[image.theatre_id]) {
      imagesByTheatre[image.theatre_id] = [];
    }
    imagesByTheatre[image.theatre_id].push({
      url: image.image_url,
      caption: image.caption,
      isPrimary: image.is_primary
    });
  });

  let successCount = 0;
  
  // Update each theatre with its images
  for (const [theatreId, images] of Object.entries(imagesByTheatre)) {
    // First get the current theatre data
    const theatre = await makeRequest(`${BASE_URL}/api/theatres/${theatreId}`);
    if (!theatre) {
      console.log(`❌ Could not find theatre ${theatreId}`);
      continue;
    }

    // Update theatre with images
    const theatreData = {
      ...theatre,
      images: images
    };

    const result = await makeRequest(`${BASE_URL}/api/theatres/${theatreId}`, 'PUT', theatreData);
    if (result) {
      successCount += images.length;
      console.log(`✅ Updated theatre ${theatreId} with ${images.length} images`);
    }
  }

  console.log(`📊 Theatre images seeded: ${successCount}/${theatreImages.length}`);
}

// Verify final counts
async function verifyFinalCounts() {
  console.log('\n📊 Final verification...');
  
  const theatres = await makeRequest(`${BASE_URL}/api/theatres?admin=true`);
  const venues = await makeRequest(`${BASE_URL}/api/venues`);
  const events = await makeRequest(`${BASE_URL}/api/events`);
  
  console.log(`Theatres: ${theatres?.length || 0}`);
  console.log(`Venues: ${venues?.length || 0}`);
  console.log(`Events: ${events?.length || 0}`);
}

// Main execution
async function main() {
  console.log('🚀 Starting corrected seeding process...');
  
  try {
    await seedEvents();
    await seedVenueSections();
    await seedTheatreImages();
    await verifyFinalCounts();
    
    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();