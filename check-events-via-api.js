const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ ok: res.statusCode === 200, status: res.statusCode, json: () => jsonData, text: () => data });
        } catch (error) {
          resolve({ ok: false, status: res.statusCode, json: () => null, text: () => data });
        }
      });
    });
    req.on('error', reject);
  });
}

async function checkEventsViaAPI() {
  try {
    console.log('🔍 Checking database state via running server...');
    
    // Check theatres first
    console.log('\n📍 Checking theatres...');
    const theatresResponse = await makeRequest('http://localhost:3001/api/theatres');
    
    if (theatresResponse.ok) {
      const theatres = theatresResponse.json();
      console.log(`✅ Theatres API working: ${theatres.length} theatres found`);
      theatres.forEach((theatre, index) => {
        console.log(`${index + 1}. ${theatre.name} (ID: ${theatre.id})`);
      });
    } else {
      console.log(`❌ Theatres API failed: ${theatresResponse.status}`);
    }
    
    // Check events
    console.log('\n🎭 Checking events...');
    const eventsResponse = await makeRequest('http://localhost:3001/api/events');
    
    if (eventsResponse.ok) {
      const events = eventsResponse.json();
      console.log(`✅ Events API working: ${events.length} events found`);
      
      if (events.length > 0) {
        // Group by unique titles
        const uniqueTitles = {};
        events.forEach(event => {
          const baseTitle = event.title.replace(/ \((EN|BG|MK|SR)\)$/, '');
          if (!uniqueTitles[baseTitle]) {
            uniqueTitles[baseTitle] = [];
          }
          uniqueTitles[baseTitle].push(event);
        });
        
        console.log(`\nUnique event titles: ${Object.keys(uniqueTitles).length}`);
        Object.keys(uniqueTitles).forEach((title, index) => {
          const eventGroup = uniqueTitles[title];
          const languages = eventGroup.map(e => e.contentLanguage || 'unknown').join(', ');
          const theatreName = eventGroup[0].theatreName || 'Unknown Theatre';
          console.log(`${index + 1}. ${title} - ${theatreName} (${languages})`);
        });
      }
    } else {
      console.log(`❌ Events API failed: ${eventsResponse.status}`);
      
      // Try to get the response text to see what's being returned
      const responseText = eventsResponse.text();
      console.log('Response content:', responseText.substring(0, 200));
    }
    
    // Check if there's a different events endpoint
    console.log('\n🔍 Checking alternative endpoints...');
    
    const endpoints = [
      '/api/events/all',
      '/api/event',
      '/api/performances',
      '/api/performance'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await makeRequest(`http://localhost:3001${endpoint}`);
        console.log(`${endpoint}: ${response.status}`);
        if (response.ok) {
          const data = response.json();
          console.log(`  ✅ Found working endpoint with ${Array.isArray(data) ? data.length : 'unknown'} items`);
        }
      } catch (error) {
        console.log(`${endpoint}: Error - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ API check failed:', error.message);
  }
}

checkEventsViaAPI();