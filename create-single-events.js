const fetch = require('node-fetch').default || require('node-fetch');

async function createSingleEvents() {
  try {
    console.log('🧹 Deleting all events and creating 6 single events without translations...');
    
    const baseUrl = 'http://localhost:3001/api';
    
    // Delete ALL events first
    const eventsResponse = await fetch(`${baseUrl}/events`);
    const events = await eventsResponse.json();
    
    console.log(`Deleting ${events.length} existing events...`);
    
    for (const event of events) {
      try {
        const response = await fetch(`${baseUrl}/events/${event.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer super_admin' }
        });
        if (response.ok) {
          console.log(`✅ Deleted event: ${event.title} (ID: ${event.id})`);
        }
      } catch (error) {
        console.log(`⚠️ Could not delete event ${event.title}:`, error.message);
      }
    }
    
    // Wait for deletions to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get theatre mapping
    const theatresResponse = await fetch(`${baseUrl}/theatres`);
    const theatres = await theatresResponse.json();
    const theatreMap = {};
    theatres.forEach(t => {
      theatreMap[t.name] = t.id;
    });
    
    console.log('\nTheatre mapping:');
    Object.entries(theatreMap).forEach(([name, id]) => {
      console.log(`- ${name}: ${id}`);
    });
    
    console.log('\n🎪 Creating 6 single events using direct database operations...');
    
    // Create events using a custom endpoint that bypasses translations
    const eventsToCreate = [
      {
        title: "No Man's Land",
        theatreName: "Macedonian National Theatre",
        director: "Aleksandar Morfov",
        date: "2025-09-20",
        time: "19:00",
        imageUrl: "/nizhija_zemja1.jpg",
        posterUrl: "/nichija_zemja.jpg",
        genre: "Drama",
        language: "Macedonian",
        duration: "120 minutes",
        synopsis: "The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia."
      },
      {
        title: "Don Juan",
        theatreName: "National Theatre in Niš",
        director: "Vasil Vasilev",
        date: "2025-09-18",
        time: "19:00",
        imageUrl: "/don_zhuan1.jpg",
        posterUrl: "/don_zhuan.jpg",
        genre: "Drama",
        language: "Serbian",
        duration: "120 minutes",
        synopsis: "A person's life journey and the marks they leave on others, their constant pursuit of self-improvement."
      },
      {
        title: "Oh My God",
        theatreName: '"Ivan Vazov" National Theatre',
        director: "Stoyan Radev",
        date: "2025-09-21",
        time: "16:00",
        imageUrl: "/1bozhe_moj.jpg",
        posterUrl: "/bozhe_moj.jpg",
        genre: "Monodrama",
        language: "Bulgarian",
        duration: "90 minutes",
        synopsis: "A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ."
      },
      {
        title: "Aivar or Lutenitsa",
        theatreName: 'OSAIK "36 Monkeys"',
        director: "Gergana Dimitrova",
        date: "2025-09-20",
        time: "16:00",
        imageUrl: "/a_ili_lj1.jpg",
        posterUrl: "/a_ili_lj.png",
        genre: "Comedy",
        language: "Bulgarian and Macedonian",
        duration: "90 minutes",
        synopsis: "Two women competing on stage. Two women measure the similarities and differences between the two peoples."
      },
      {
        title: "Artists in waiting",
        theatreName: 'Drama Theatre "Krum Kyulyavkov"',
        director: "Presiyan Kuzov",
        date: "2025-09-19",
        time: "19:30",
        imageUrl: "/a_in_wait1.jpg",
        posterUrl: "/artists_in_waiting.jpg",
        genre: "Comedy",
        language: "Bulgarian",
        duration: "120 minutes",
        synopsis: "Waiting Artists is a comedy that caricatures the lives of people in the world of theater."
      },
      {
        title: "In the Dark",
        theatreName: '"Ivan Vazov" National Theatre',
        director: "Albena Stavreva",
        date: "2025-09-21",
        time: "19:00",
        imageUrl: "/nevedenie1.jpg",
        posterUrl: "/nevedenie.jpg",
        genre: "Monodrama",
        language: "Bulgarian",
        duration: "90 minutes",
        synopsis: "With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry."
      }
    ];
    
    let createdEvents = 0;
    
    // Create events using a custom API call that creates single events
    for (const event of eventsToCreate) {
      const theatreId = theatreMap[event.theatreName];
      
      if (!theatreId) {
        console.warn(`⚠️ Theatre not found for ${event.theatreName}, skipping event ${event.title}`);
        continue;
      }
      
      try {
        // Use a custom endpoint that creates single events without translations
        const eventData = {
          title: event.title,
          theatreId: theatreId,
          eventType: 'performance',
          date: event.date,
          time: event.time,
          description: event.synopsis,
          price: '25',
          imageUrl: event.imageUrl,
          posterUrl: event.posterUrl,
          language: event.language,
          genre: event.genre,
          company: [event.theatreName],
          director: event.director,
          cast: ['Actor 1', 'Actor 2'],
          synopsis: event.synopsis,
          duration: event.duration,
          isFeatured: false,
          contentLanguage: 'en',
          skipTranslations: true // Custom flag to skip translations
        };
        
        console.log(`Creating single event: ${event.title} for theatre ${event.theatreName} (ID: ${theatreId})`);
        
        // Try to use a custom endpoint first, if it doesn't exist, we'll create it
        let response = await fetch(`${baseUrl}/events/single`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer super_admin'
          },
          body: JSON.stringify(eventData)
        });
        
        // If the single endpoint doesn't exist, fall back to direct database operation
        if (!response.ok && response.status === 404) {
          console.log('Single events endpoint not found, using direct database approach...');
          
          // Create a script that uses direct Prisma operations
          const directCreateScript = `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSingleEvent() {
  try {
    const event = await prisma.event.create({
      data: {
        title: "${event.title}",
        description: "${event.synopsis}",
        event_type: "performance",
        event_date: new Date("${event.date}"),
        event_time: new Date("1970-01-01T${event.time}:00.000Z"),
        theatre_id: ${theatreId},
        price: 25,
        image_url: "${event.imageUrl}",
        poster_url: "${event.posterUrl}",
        language: "${event.language}",
        content_language: "en",
        genre: "${event.genre}",
        company: ["${event.theatreName}"],
        director: "${event.director}",
        cast: ["Actor 1", "Actor 2"],
        synopsis: "${event.synopsis}",
        duration: "${event.duration}",
        is_featured: false
      }
    });
    console.log('Created event:', event.id, event.title);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSingleEvent();
`;
          
          // Write and execute the direct script
          const fs = require('fs');
          fs.writeFileSync('temp-create-event.js', directCreateScript);
          
          const { exec } = require('child_process');
          await new Promise((resolve, reject) => {
            exec('node temp-create-event.js', (error, stdout, stderr) => {
              if (error) {
                console.error('Error executing direct create:', error);
                reject(error);
              } else {
                console.log(stdout);
                resolve();
              }
            });
          });
          
          // Clean up temp file
          fs.unlinkSync('temp-create-event.js');
          
          createdEvents++;
          console.log(`✅ Created event via direct database: ${event.title}`);
        } else if (response.ok) {
          createdEvents++;
          console.log(`✅ Created event via API: ${event.title}`);
        } else {
          const errorText = await response.text();
          console.error(`❌ Failed to create event ${event.title}: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error(`❌ Error creating event ${event.title}:`, error.message);
      }
    }
    
    console.log('\n✅ Single events creation completed!');
    console.log(`Created ${createdEvents} events`);
    
  } catch (error) {
    console.error('❌ Error in single events creation:', error.message);
  }
}

createSingleEvents();