const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, json: () => jsonData, text: () => data });
        } catch (error) {
          resolve({ ok: false, status: res.statusCode, json: () => null, text: () => data });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function createMissingEvent() {
  try {
    console.log('🎭 Creating missing "No Man\'s Land" event...');
    
    // First, get theatre IDs
    const theatresResponse = await makeRequest('http://localhost:3001/api/theatres');
    const theatres = theatresResponse.json();
    
    console.log('Available theatres:');
    theatres.forEach(theatre => {
      console.log(`- ${theatre.name} (ID: ${theatre.id})`);
    });
    
    // Find Macedonian National Theatre
    const macedonianTheatre = theatres.find(t => t.name.includes('Macedonian National'));
    if (!macedonianTheatre) {
      console.log('❌ Macedonian National Theatre not found');
      return;
    }
    
    console.log(`\n✅ Found theatre: ${macedonianTheatre.name} (ID: ${macedonianTheatre.id})`);
    
    // Create the event
    const eventData = {
      title: 'No Man\'s Land',
      theatreId: macedonianTheatre.id,
      director: 'Aleksandar Morfov',
      date: '2024-06-15',
      time: '19:30',
      imageUrl: '/images/events/no-mans-land.jpg',
      posterUrl: '/images/posters/no-mans-land.jpg',
      genre: 'Drama',
      language: 'Macedonian',
      duration: 120,
      synopsis: 'A psychological drama exploring themes of memory, identity, and the nature of reality through the encounter of four men in a London drawing room.'
    };
    
    console.log('\n📝 Event data:', eventData);
    
    const response = await makeRequest('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    
    console.log(`\n📡 API Response: ${response.status}`);
    
    if (response.ok) {
      const result = response.json();
      console.log('✅ Event created successfully:', result);
    } else {
      const errorText = response.text();
      console.log('❌ Failed to create event:', errorText);
    }
    
    // Check final state
    console.log('\n🔍 Checking final state...');
    const eventsResponse = await makeRequest('http://localhost:3001/api/events');
    const events = eventsResponse.json();
    
    const uniqueTitles = [...new Set(events.map(e => e.title.replace(/ \((EN|BG|MK|SR)\)$/, '')))];
    console.log(`\nTotal events: ${events.length}`);
    console.log(`Unique event titles: ${uniqueTitles.length}`);
    uniqueTitles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createMissingEvent();