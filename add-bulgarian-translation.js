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

async function addBulgarianTranslationAndVirtualTheatre() {
  try {
    console.log('🎭 Adding Bulgarian translation for Macedonian National Theatre and creating virtual booking theatre...');
    
    // Get existing theatres
    const theatresResponse = await makeRequest('http://localhost:3000/api/theatres');
    console.log('Theatres API response status:', theatresResponse.status);
    console.log('Theatres API response text:', theatresResponse.text().substring(0, 200));
    
    const theatres = theatresResponse.json();
    if (!theatres || !Array.isArray(theatres)) {
      console.log('❌ Invalid theatres response:', typeof theatres);
      return;
    }
    
    console.log('\nExisting theatres:');
    theatres.forEach(theatre => {
      console.log(`- ${theatre.name} (ID: ${theatre.id}, Lang: ${theatre.content_language || 'unknown'})`);
    });
    
    // Find Macedonian National Theatre
    const macedonianTheatre = theatres.find(t => t.name.includes('Macedonian National'));
    if (!macedonianTheatre) {
      console.log('❌ Macedonian National Theatre not found');
      return;
    }
    
    console.log(`\n✅ Found Macedonian National Theatre: ${macedonianTheatre.name} (ID: ${macedonianTheatre.id})`);
    
    // Create Bulgarian translation for Macedonian National Theatre
    const bulgarianTheatreData = {
      name: 'Македонски национален театър',
      city: 'Скопие',
      country: 'Северна Македония',
      description: 'Македонският национален театър е водещата театрална институция в Северна Македония, основана през 1945 година.',
      history: 'Театърът има богата история от над 75 години, представяйки класически и съвременни произведения на македонски и световни автори.',
      website: macedonianTheatre.website,
      founded_year: macedonianTheatre.founded_year,
      content_language: 'bg',
      translation_group: macedonianTheatre.translation_group || `macedonian_national_${macedonianTheatre.id}`
    };
    
    console.log('\n📝 Creating Bulgarian translation...');
    const bulgarianResponse = await makeRequest('http://localhost:3000/api/theatres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer super_admin'
      },
      body: JSON.stringify(bulgarianTheatreData)
    });
    
    if (bulgarianResponse.ok) {
      const result = bulgarianResponse.json();
      console.log('✅ Bulgarian translation created successfully:', result);
    } else {
      console.log('❌ Failed to create Bulgarian translation:', bulgarianResponse.text());
    }
    
    // Create virtual booking theatre (hidden from users)
    const virtualTheatreData = {
      name: 'Virtual Booking Theatre',
      city: 'System',
      country: 'Virtual',
      description: 'Virtual theatre used for centralized booking management. Not visible to users.',
      history: 'System-generated theatre for booking coordination across event translations.',
      website: null,
      founded_year: 2024,
      content_language: 'en',
      translation_group: 'virtual_booking_theatre',
      is_virtual: true // This would need to be added to schema
    };
    
    console.log('\n🏛️ Creating virtual booking theatre...');
    const virtualResponse = await makeRequest('http://localhost:3000/api/theatres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer super_admin'
      },
      body: JSON.stringify(virtualTheatreData)
    });
    
    if (virtualResponse.ok) {
      const result = virtualResponse.json();
      console.log('✅ Virtual booking theatre created successfully:', result);
    } else {
      console.log('❌ Failed to create virtual theatre:', virtualResponse.text());
    }
    
    // Update original Macedonian theatre with translation group if not set
    if (!macedonianTheatre.translation_group) {
      console.log('\n🔗 Updating original theatre with translation group...');
      const updateData = {
        translation_group: `macedonian_national_${macedonianTheatre.id}`
      };
      
      const updateResponse = await makeRequest(`http://localhost:3000/api/theatres/${macedonianTheatre.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer super_admin'
        },
        body: JSON.stringify(updateData)
      });
      
      if (updateResponse.ok) {
        console.log('✅ Original theatre updated with translation group');
      } else {
        console.log('❌ Failed to update original theatre:', updateResponse.text());
      }
    }
    
    // Check final state
    console.log('\n🔍 Checking final state...');
    const finalTheatresResponse = await makeRequest('http://localhost:3000/api/theatres');
    const finalTheatres = finalTheatresResponse.json();
    
    console.log(`\nTotal theatres: ${finalTheatres.length}`);
    finalTheatres.forEach((theatre, index) => {
      console.log(`${index + 1}. ${theatre.name} (Lang: ${theatre.content_language || 'unknown'}, Group: ${theatre.translation_group || 'none'})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addBulgarianTranslationAndVirtualTheatre();