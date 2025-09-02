const fs = require('fs');
const path = require('path');

// Helper function to make API requests
const makeRequest = async (url, method = 'GET', data = null) => {
  const fetch = (await import('node-fetch')).default;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer super_admin'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, options);
  const responseText = await response.text();
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${responseText}`);
  }
  
  return responseText ? JSON.parse(responseText) : null;
};

// Helper function to load JSON data
const loadBackupData = (filename) => {
  const filePath = path.join(__dirname, 'app', 'admin', 'database-backup', filename);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Seed events
const seedEvents = async () => {
  console.log('Seeding events...');
  const events = loadBackupData('events_rows.json');
  let successCount = 0;
  
  for (const event of events) {
    try {
      await makeRequest('http://localhost:3001/api/events', 'POST', event);
      successCount++;
      console.log(`✓ Seeded event: ${event.title}`);
    } catch (error) {
      console.error(`Failed to seed event ${event.title}: ${error.message}`);
    }
  }
  
  console.log(`Seeded ${successCount}/${events.length} events`);
};

// Seed venue sections
const seedVenueSections = async () => {
  console.log('Seeding venue sections...');
  const venueSections = loadBackupData('venue_sections_rows.json');
  let successCount = 0;
  
  for (const section of venueSections) {
    try {
      await makeRequest('http://localhost:3001/api/venues/sections', 'POST', section);
      successCount++;
      console.log(`✓ Seeded venue section: ${section.section_name} for venue ${section.venue_id}`);
    } catch (error) {
      console.error(`Failed to seed venue section ${section.section_name}: ${error.message}`);
    }
  }
  
  console.log(`Seeded ${successCount}/${venueSections.length} venue sections`);
};

// Seed theatre images
const seedTheatreImages = async () => {
  console.log('Seeding theatre images...');
  const theatreImages = loadBackupData('theatre_images_rows.json');
  let successCount = 0;
  
  for (const image of theatreImages) {
    try {
      await makeRequest('http://localhost:3001/api/theatres/images', 'POST', image);
      successCount++;
      console.log(`✓ Seeded theatre image: ${image.image_url} for theatre ${image.theatre_id}`);
    } catch (error) {
      console.error(`Failed to seed theatre image ${image.image_url}: ${error.message}`);
    }
  }
  
  console.log(`Seeded ${successCount}/${theatreImages.length} theatre images`);
};

// Main function
const main = async () => {
  try {
    console.log('Starting specific table seeding...');
    
    await seedEvents();
    await seedVenueSections();
    await seedTheatreImages();
    
    console.log('\nSpecific table seeding completed!');
    
    // Verify final counts
    console.log('\nVerifying final database state...');
    const events = await makeRequest('http://localhost:3001/api/events');
    const venues = await makeRequest('http://localhost:3001/api/venues');
    const theatres = await makeRequest('http://localhost:3001/api/theatres?admin=true');
    
    console.log('Final counts:');
    console.log(`- Theatres: ${theatres.length}`);
    console.log(`- Venues: ${venues.length}`);
    console.log(`- Events: ${events.length}`);
    
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

main();