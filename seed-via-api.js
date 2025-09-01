const { default: fetch } = require('node-fetch');

async function main() {
  try {
    console.log('🌱 Starting database seed via API...');
    
    const baseUrl = 'http://localhost:3001/api';
    
    // Create theatres
    console.log('🎭 Creating theatres...');
    const theatres = [
      { name: 'Macedonian National Theatre', city: 'Skopje', country: 'North Macedonia', description: 'National theatre of North Macedonia' },
      { name: 'National Theatre in Niš', city: 'Niš', country: 'Serbia', description: 'Regional theatre in Serbia' },
      { name: 'OSAIK \'36 Monkeys\'', city: 'Kyustendil', country: 'Bulgaria', description: 'Independent theatre group' },
      { name: 'Intimate Theatre Bitola', city: 'Bitola', country: 'North Macedonia', description: 'Small intimate theatre' },
    ];
    
    const createdTheatres = [];
    for (const theatre of theatres) {
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
            website: `https://${theatre.name.toLowerCase().replace(/\s+/g, '')}.com`
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
    
    // Wait a bit for theatres to be created
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get theatre IDs
    const theatreResponse = await fetch(`${baseUrl}/theatres`);
    const theatreData = await theatreResponse.json();
    const theatreMap = {};
    theatreData.forEach(t => {
      theatreMap[t.name] = t.id;
    });
    
    // Create events
    console.log('🎪 Creating events...');
    const events = [
      {
        title: "No Man's Land",
        company: ["Macedonian National Theatre"],
        director: "Aleksandar Morfov",
        cast: ["Saško Kocev", "Toni Mihajlovski"],
        eventDate: "2025-09-20",
        eventTime: "19:00",
        imageUrl: "/nizhija_zemja1.jpg",
        posterUrl: "/nichija_zemja.jpg",
        genre: "Drama",
        language: "Macedonian",
        duration: "120 minutes",
        synopsis: "A powerful drama about human relationships"
      },
      {
        title: "Don Juan",
        company: ["National Theatre in Niš"],
        director: "Marko Petrović",
        cast: ["Stefan Milenković", "Ana Jovanović"],
        eventDate: "2025-09-21",
        eventTime: "20:00",
        imageUrl: "/don_zhuan1.jpg",
        posterUrl: "/don_zhuan.jpg",
        genre: "Comedy",
        language: "Serbian",
        duration: "110 minutes",
        synopsis: "Classic tale of the legendary seducer"
      },
      {
        title: "Aivar or Lutenitsa",
        company: ["OSAIK '36 Monkeys'"],
        director: "Ivan Petrov",
        cast: ["Maria Dimitrova", "Georgi Stoyanov"],
        eventDate: "2025-09-22",
        eventTime: "19:30",
        imageUrl: "/a_ili_lj1.JPG",
        posterUrl: "/a_ili_lj.png",
        genre: "Comedy",
        language: "Bulgarian",
        duration: "90 minutes",
        synopsis: "A humorous take on Bulgarian traditions"
      }
    ];
    
    let createdEvents = 0;
    for (const event of events) {
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
            date: event.eventDate, // API expects 'date' not 'eventDate'
            time: event.eventTime, // API expects 'time' not 'eventTime'
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
    
    console.log('✅ Database seed via API completed!');
    console.log(`Created ${createdTheatres.length} theatres`);
    console.log(`Created ${createdEvents} events`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
}

main()
  .catch(console.error);