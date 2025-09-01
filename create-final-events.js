const fetch = require('node-fetch').default || require('node-fetch');

async function createFinalEvents() {
  try {
    console.log('🎪 Creating exactly 6 events using API...');
    
    const baseUrl = 'http://localhost:3001/api';
    
    // Get theatre mapping
    const theatresResponse = await fetch(`${baseUrl}/theatres`);
    const theatres = await theatresResponse.json();
    const theatreMap = {};
    theatres.forEach(t => {
      theatreMap[t.name] = t.id;
    });
    
    console.log('Theatre mapping:');
    Object.entries(theatreMap).forEach(([name, id]) => {
      console.log(`- ${name}: ${id}`);
    });
    
    const eventsToCreate = [
      {
        title: "No Man's Land",
        theatreName: "Macedonian National Theatre",
        date: "2025-09-20",
        time: "19:00",
        description: "The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia.",
        price: "25",
        imageUrl: "/nizhija_zemja1.jpg",
        posterUrl: "/nichija_zemja.jpg",
        genre: "Drama",
        language: "Macedonian",
        duration: "120 minutes",
        director: "Aleksandar Morfov",
        cast: ["Actor 1", "Actor 2"]
      },
      {
        title: "Don Juan",
        theatreName: "National Theatre in Niš",
        date: "2025-09-18",
        time: "19:00",
        description: "A person's life journey and the marks they leave on others, their constant pursuit of self-improvement.",
        price: "25",
        imageUrl: "/don_zhuan1.jpg",
        posterUrl: "/don_zhuan.jpg",
        genre: "Drama",
        language: "Serbian",
        duration: "120 minutes",
        director: "Vasil Vasilev",
        cast: ["Actor 1", "Actor 2"]
      },
      {
        title: "Oh My God",
        theatreName: '"Ivan Vazov" National Theatre',
        date: "2025-09-21",
        time: "16:00",
        description: "A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ.",
        price: "25",
        imageUrl: "/1bozhe_moj.jpg",
        posterUrl: "/bozhe_moj.jpg",
        genre: "Monodrama",
        language: "Bulgarian",
        duration: "90 minutes",
        director: "Stoyan Radev",
        cast: ["Actor 1", "Actor 2"]
      },
      {
        title: "Aivar or Lutenitsa",
        theatreName: 'OSAIK "36 Monkeys"',
        date: "2025-09-20",
        time: "16:00",
        description: "Two women competing on stage. Two women measure the similarities and differences between the two peoples.",
        price: "0",
        imageUrl: "/a_ili_lj1.jpg",
        posterUrl: "/a_ili_lj.png",
        genre: "Comedy",
        language: "Bulgarian and Macedonian",
        duration: "90 minutes",
        director: "Gergana Dimitrova",
        cast: ["Actor 1", "Actor 2"]
      },
      {
        title: "Artists in waiting",
        theatreName: 'Drama Theatre "Krum Kyulyavkov"',
        date: "2025-09-19",
        time: "19:30",
        description: "Waiting Artists is a comedy that caricatures the lives of people in the world of theater.",
        price: "0",
        imageUrl: "/a_in_wait1.jpg",
        posterUrl: "/artists_in_waiting.jpg",
        genre: "Comedy",
        language: "Bulgarian",
        duration: "120 minutes",
        director: "Presiyan Kuzov",
        cast: ["Actor 1", "Actor 2"]
      },
      {
        title: "In the Dark",
        theatreName: '"Ivan Vazov" National Theatre',
        date: "2025-09-21",
        time: "19:00",
        description: "With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry.",
        price: "25",
        imageUrl: "/nevedenie1.jpg",
        posterUrl: "/nevedenie.jpg",
        genre: "Monodrama",
        language: "Bulgarian",
        duration: "90 minutes",
        director: "Albena Stavreva",
        cast: ["Actor 1", "Actor 2"]
      }
    ];
    
    let createdEvents = 0;
    
    for (const event of eventsToCreate) {
      const theatreId = theatreMap[event.theatreName];
      
      if (!theatreId) {
        console.warn(`⚠️ Theatre not found for ${event.theatreName}, skipping event ${event.title}`);
        continue;
      }
      
      try {
        console.log(`Creating event: ${event.title} for theatre ${event.theatreName} (ID: ${theatreId})`);
        
        const eventData = {
          title: event.title,
          theatreId: theatreId,
          eventType: 'performance',
          date: event.date,
          time: event.time,
          description: event.description,
          price: event.price,
          imageUrl: event.imageUrl,
          posterUrl: event.posterUrl,
          language: event.language,
          genre: event.genre,
          company: [event.theatreName],
          director: event.director,
          cast: event.cast,
          synopsis: event.description,
          duration: event.duration,
          isFeatured: false,
          contentLanguage: 'en'
        };
        
        const response = await fetch(`${baseUrl}/events`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer super_admin'
          },
          body: JSON.stringify(eventData)
        });
        
        if (response.ok) {
          const result = await response.json();
          // The API returns an array of created events (translations), we only want to count this as 1
          createdEvents++;
          console.log(`✅ Created event: ${event.title}`);
        } else {
          const errorText = await response.text();
          console.error(`❌ Failed to create event ${event.title}: ${response.status} - ${errorText}`);
        }
        
      } catch (error) {
        console.error(`❌ Error creating event ${event.title}:`, error.message);
      }
    }
    
    console.log('\n✅ Event creation completed!');
    console.log(`Attempted to create ${createdEvents} events`);
    
    // Wait a moment for database operations to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check final state
    const finalEventsResponse = await fetch(`${baseUrl}/events`);
    const finalEvents = await finalEventsResponse.json();
    
    const finalTheatresResponse = await fetch(`${baseUrl}/theatres`);
    const finalTheatres = await finalTheatresResponse.json();
    
    console.log(`\n📊 Final database state:`);
    console.log(`- Theatres: ${finalTheatres.length}`);
    console.log(`- Events: ${finalEvents.length}`);
    
    if (finalEvents.length > 6) {
      console.log('\n⚠️ More than 6 events created due to translations. Showing unique event titles:');
      const uniqueTitles = [...new Set(finalEvents.map(e => e.title.replace(/ \((EN|BG|MK|SR)\)$/, '')))];
      uniqueTitles.forEach((title, index) => {
        console.log(`${index + 1}. ${title}`);
      });
      console.log(`\nUnique events: ${uniqueTitles.length}`);
    }
    
  } catch (error) {
    console.error('❌ Error in event creation:', error.message);
  }
}

createFinalEvents();