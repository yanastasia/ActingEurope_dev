const fetch = require('node-fetch').default || require('node-fetch');

async function checkDatabaseState() {
  try {
    console.log('📊 Checking current database state...');
    
    const baseUrl = 'http://localhost:3001/api';
    
    // Check theatres
    try {
      const theatresResponse = await fetch(`${baseUrl}/theatres`);
      if (theatresResponse.ok) {
        const theatres = await theatresResponse.json();
        console.log(`Current theatres: ${theatres.length}`);
        theatres.forEach(theatre => {
          console.log(`- ${theatre.name} (ID: ${theatre.id})`);
        });
      } else {
        console.log(`❌ Theatres API error: ${theatresResponse.status}`);
      }
    } catch (error) {
      console.log(`❌ Error fetching theatres: ${error.message}`);
    }
    
    // Check events with different endpoints
    console.log('\nTrying different event endpoints...');
    
    const eventEndpoints = ['/events', '/performances'];
    
    for (const endpoint of eventEndpoints) {
      try {
        console.log(`Trying ${baseUrl}${endpoint}...`);
        const response = await fetch(`${baseUrl}${endpoint}`);
        console.log(`Status: ${response.status}`);
        
        if (response.ok) {
          const events = await response.json();
          console.log(`Current events from ${endpoint}: ${events.length}`);
          
          if (events.length > 0) {
            // Group by title to show unique events
            const uniqueTitles = [...new Set(events.map(e => e.title.replace(/ \((EN|BG|MK|SR)\)$/, '')))];
            console.log(`Unique event titles: ${uniqueTitles.length}`);
            uniqueTitles.forEach((title, index) => {
              console.log(`${index + 1}. ${title}`);
            });
            
            // Show theatre associations
            console.log('\nTheatre associations:');
            events.slice(0, 5).forEach(event => {
              console.log(`- ${event.title}: Theatre ID ${event.theatre_id || event.theatreId || 'N/A'}`);
            });
          }
          break; // Found working endpoint
        }
      } catch (error) {
        console.log(`❌ Error with ${endpoint}: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking database state:', error.message);
  }
}

checkDatabaseState();