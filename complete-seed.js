const fetch = require('node-fetch').default || require('node-fetch');

async function completeSeed() {
  try {
    console.log('🧹 Starting complete database cleanup and seed...');
    
    const baseUrl = 'http://localhost:3001/api';
    
    // First, delete all existing events and theatres
    console.log('🗑️ Cleaning up existing data...');
    
    // Get and delete all events
    const eventsResponse = await fetch(`${baseUrl}/events`);
    const events = await eventsResponse.json();
    
    for (const event of events) {
      try {
        const response = await fetch(`${baseUrl}/events/${event.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer super_admin' }
        });
        if (response.ok) {
          console.log(`✅ Deleted event: ${event.title}`);
        }
      } catch (error) {
        console.log(`⚠️ Could not delete event ${event.title}:`, error.message);
      }
    }
    
    // Get and delete all theatres
    const theatresResponse = await fetch(`${baseUrl}/theatres`);
    const theatres = await theatresResponse.json();
    
    for (const theatre of theatres) {
      try {
        const response = await fetch(`${baseUrl}/theatres/${theatre.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer super_admin' }
        });
        if (response.ok) {
          console.log(`✅ Deleted theatre: ${theatre.name}`);
        }
      } catch (error) {
        console.log(`⚠️ Could not delete theatre ${theatre.name}:`, error.message);
      }
    }
    
    console.log('\n🎭 Creating 6 theatres...');
    
    // Create exactly 6 theatres based on the performance data
    const theatresToCreate = [
      { name: 'Macedonian National Theatre', city: 'Skopje', country: 'North Macedonia', description: 'National theatre of North Macedonia' },
      { name: 'National Theatre in Niš', city: 'Niš', country: 'Serbia', description: 'Regional theatre in Serbia' },
      { name: '"Ivan Vazov" National Theatre', city: 'Sofia', country: 'Bulgaria', description: 'National theatre of Bulgaria' },
      { name: 'OSAIK "39 Monkeys"', city: 'Kyustendil', country: 'Bulgaria', description: 'Independent theatre group' },
      { name: 'Drama Theatre "Krum Kyulyavkov"', city: 'Shumen', country: 'Bulgaria', description: 'Regional drama theatre' },
      { name: 'Intimate Theatre Bitola', city: 'Bitola', country: 'North Macedonia', description: 'Small intimate theatre' }
    ];
    
    const createdTheatres = [];
    for (const theatre of theatresToCreate) {
      try {
        const response = await fetch(`${baseUrl}/theatres`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer super_admin'
          },
          body: JSON.stringify({
            ...theatre,
            contentLanguage: 'en',
            foundedYear: 1950,
            website: `https://${theatre.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          createdTheatres.push({ ...theatre, id: result.id });
          console.log(`✅ Created theatre: ${theatre.name}`);
        } else {
          console.error(`❌ Failed to create theatre ${theatre.name}: ${response.status}`);
        }
      } catch (error) {
        console.error(`❌ Error creating theatre ${theatre.name}:`, error.message);
      }
    }
    
    // Wait for theatres to be created
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get updated theatre list
    const newTheatresResponse = await fetch(`${baseUrl}/theatres`);
    const newTheatres = await newTheatresResponse.json();
    const theatreMap = {};
    newTheatres.forEach(t => {
      theatreMap[t.name] = t.id;
    });
    
    console.log('\n🎪 Creating 6 events...');
    
    // Create exactly 6 events based on performance data
    const eventsToCreate = [
      {
        title: "No Man's Land",
        company: ["Macedonian National Theatre"],
        director: "Aleksandar Morfov",
        cast: ["Saško Kocev", "Toni Mihajlovski"],
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
        company: ["National Theatre in Niš"],
        director: "Vasil Vasilev",
        cast: ["Dejan Lilić", "Dragiša Veljković"],
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
        company: ['"Ivan Vazov" National Theatre'],
        director: "Stoyan Radev",
        cast: ["Hristo Mutafchiev"],
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
        company: ['OSAIK "39 Monkeys"'],
        director: "Gergana Dimitrova",
        cast: ["Denitsa Darinova", "Sofia Ristevska"],
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
        company: ['Drama Theatre "Krum Kyulyavkov"'],
        director: "Presiyan Kuzov",
        cast: ["Yordan Danchev", "Tsvetelina Nikolova"],
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
        company: ['"Ivan Vazov" National Theatre'],
        director: "Albena Stavreva",
        cast: ["Albena Stavreva"],
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
    for (const event of eventsToCreate) {
      const primaryCompany = event.company[0];
      const theatreId = theatreMap[primaryCompany];
      
      if (!theatreId) {
        console.warn(`⚠️ Theatre not found for ${primaryCompany}, skipping event ${event.title}`);
        continue;
      }
      
      try {
        const response = await fetch(`${baseUrl}/events`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer super_admin'
          },
          body: JSON.stringify({
            title: event.title,
            theatreId: theatreId,
            eventType: 'performance',
            date: event.date,
            time: event.time,
            description: event.synopsis,
            price: '0',
            imageUrl: event.imageUrl,
            posterUrl: event.posterUrl,
            language: event.language,
            genre: event.genre,
            company: event.company,
            director: event.director,
            cast: event.cast,
            synopsis: event.synopsis,
            duration: event.duration,
            isFeatured: false
          })
        });
        
        if (response.ok) {
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
    
    console.log('\n✅ Complete database seed finished!');
    console.log(`Created ${createdTheatres.length} theatres`);
    console.log(`Created ${createdEvents} events`);
    
  } catch (error) {
    console.error('❌ Error in complete seed:', error.message);
  }
}

completeSeed();