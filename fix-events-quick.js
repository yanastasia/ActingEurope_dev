const { default: fetch } = require('node-fetch');

async function main() {
  try {
    console.log('🔧 Starting quick event fixes via API...');
    
    // First, let's check if we can connect to the API
    const response = await fetch('http://localhost:3001/api/events');
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const events = data.value || data;
    
    console.log(`Found ${events.length} events via API`);
    
    if (events.length === 0) {
      console.log('No events found. Database might be empty or API filtering is too strict.');
      
      // Try without language filter
      const allResponse = await fetch('http://localhost:3001/api/events?language=all');
      if (allResponse.ok) {
        const allData = await allResponse.json();
        const allEvents = allData.value || allData;
        console.log(`Found ${allEvents.length} events without language filter`);
        
        if (allEvents.length > 0) {
          console.log('Events exist but are filtered out by language. This confirms the content_language issue.');
        }
      }
      return;
    }
    
    // Theatre ID mappings
    const theatreMapping = {
      'National Theatre in Niš': 123,
      'OSAIK \'39 Monkeys\'': 124,
      'Macedonian National Theatre': 121
    };
    
    // Update specific problematic events
    const problematicEvents = [
      { title: 'Don Juan', expectedCompany: 'National Theatre in Niš' },
      { title: 'Aivar', expectedCompany: 'OSAIK \'39 Monkeys\'' },
      { title: 'Lutenitsa', expectedCompany: 'OSAIK \'39 Monkeys\'' },
      { title: 'No Man\'s Land', expectedCompany: 'Macedonian National Theatre' }
    ];
    
    let updatedCount = 0;
    
    for (const problemEvent of problematicEvents) {
      const matchingEvents = events.filter(event => 
        event.title && event.title.toLowerCase().includes(problemEvent.title.toLowerCase())
      );
      
      for (const event of matchingEvents) {
        const correctTheatreId = theatreMapping[problemEvent.expectedCompany];
        if (correctTheatreId && event.theatreId !== correctTheatreId) {
          try {
            const updateResponse = await fetch(`http://localhost:3001/api/events/${event.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...event,
                theatreId: correctTheatreId,
                contentLanguage: 'en'
              })
            });
            
            if (updateResponse.ok) {
              console.log(`✅ Updated theatre_id for event: ${event.title} -> Theatre ID ${correctTheatreId}`);
              updatedCount++;
            } else {
              console.error(`❌ Failed to update event ${event.title}: ${updateResponse.status}`);
            }
          } catch (error) {
            console.error(`❌ Error updating event ${event.title}:`, error.message);
          }
        }
      }
    }
    
    console.log(`✅ Quick event fixes completed! Updated ${updatedCount} events.`);
    
  } catch (error) {
    console.error('❌ Error fixing events:', error.message);
  }
}

main()
  .catch(console.error);