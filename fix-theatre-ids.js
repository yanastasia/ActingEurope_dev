// Script to fix theatre IDs using API endpoints
const { default: fetch } = require('node-fetch');

async function updateEventTheatres() {
  try {
    console.log('🔍 Fetching all events from API...');
    
    // Get all events from the API
    const response = await fetch('http://localhost:3001/api/events');
    const allEvents = await response.json();
    
    console.log(`Found ${allEvents.length} total events`);
    
    if (allEvents.length === 0) {
      console.log('❌ No events found. The database might be empty.');
      return;
    }
    
    // Find the problematic events
    const problematicEvents = allEvents.filter(event => 
      event.title.includes('Don Juan') || 
      event.title.includes('Aivar') || 
      event.title.includes('Lutenitsa') || 
      event.title.includes("No Man's Land")
    );
    
    console.log(`Found ${problematicEvents.length} problematic events:`);
    problematicEvents.forEach(event => {
      console.log(`- ${event.title} (ID: ${event.id}, Company: ${event.company})`);
    });
    
    // Update each problematic event
    for (const event of problematicEvents) {
      let theatreId = null;
      
      // Determine correct theatre ID based on title and company
      if (event.title.includes('Don Juan')) {
        theatreId = 123; // National Theatre in Niš
      } else if (event.title.includes("No Man's Land")) {
        theatreId = 121; // Macedonian National Theatre
      } else if (event.title.includes('Aivar') || event.title.includes('Lutenitsa')) {
        // Check company to determine correct theatre
        const companyStr = Array.isArray(event.company) ? event.company.join(' ') : (event.company || '');
        
        if (companyStr.includes('36 Monkeys')) {
          theatreId = 124; // OSAIK "36 Monkeys"
        }
      }
      
      if (theatreId) {
        console.log(`\n🔄 Updating event ${event.id} (${event.title}) to theatre ${theatreId}...`);
        
        const updateData = {
          ...event,
          theatreId: theatreId,
          content_language: event.content_language || 'en'
        };
        
        const updateResponse = await fetch(`http://localhost:3001/api/events/${event.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });
        
        if (updateResponse.ok) {
          console.log(`✅ Successfully updated event ${event.id}`);
        } else {
          const errorText = await updateResponse.text();
          console.error(`❌ Failed to update event ${event.id}: ${errorText}`);
        }
      } else {
        console.log(`⚠️ Could not determine theatre for event ${event.id} (${event.title})`);
      }
    }
    
    console.log('\n🎉 Theatre ID updates completed!');
    
  } catch (error) {
    console.error('❌ Error updating theatre IDs:', error);
  }
}

updateEventTheatres();