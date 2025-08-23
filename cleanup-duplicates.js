const fetch = require('node-fetch').default || require('node-fetch');

async function cleanupDuplicates() {
  try {
    // Get all theatres and events
    const theatresResponse = await fetch('http://localhost:3001/api/theatres');
    const eventsResponse = await fetch('http://localhost:3001/api/events');
    
    const theatres = await theatresResponse.json();
    const events = await eventsResponse.json();
    
    console.log(`Found ${theatres.length} theatres and ${events.length} events`);
    
    // Group theatres by name to find duplicates
    const theatreGroups = {};
    theatres.forEach(theatre => {
      const name = theatre.name;
      if (!theatreGroups[name]) {
        theatreGroups[name] = [];
      }
      theatreGroups[name].push(theatre);
    });
    
    // Delete duplicate theatres (keep the first one of each name)
    for (const [name, group] of Object.entries(theatreGroups)) {
      if (group.length > 1) {
        console.log(`Removing ${group.length - 1} duplicate(s) of theatre: ${name}`);
        for (let i = 1; i < group.length; i++) {
          const response = await fetch(`http://localhost:3001/api/theatres/${group[i].id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer super_admin'
            }
          });
          if (response.ok) {
            console.log(`  Deleted theatre ID: ${group[i].id}`);
          } else {
            console.log(`  Failed to delete theatre ID: ${group[i].id}`);
          }
        }
      }
    }
    
    // Group events by title to find duplicates
    const eventGroups = {};
    events.forEach(event => {
      const title = event.title;
      if (!eventGroups[title]) {
        eventGroups[title] = [];
      }
      eventGroups[title].push(event);
    });
    
    // Delete duplicate events (keep the first one of each title)
    for (const [title, group] of Object.entries(eventGroups)) {
      if (group.length > 1) {
        console.log(`Removing ${group.length - 1} duplicate(s) of event: ${title}`);
        for (let i = 1; i < group.length; i++) {
          const response = await fetch(`http://localhost:3001/api/events/${group[i].id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer super_admin'
            }
          });
          if (response.ok) {
            console.log(`  Deleted event ID: ${group[i].id}`);
          } else {
            console.log(`  Failed to delete event ID: ${group[i].id}`);
          }
        }
      }
    }
    
    console.log('\nCleanup completed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

cleanupDuplicates();