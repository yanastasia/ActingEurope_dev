const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSingleEvents() {
  try {
    console.log('🧹 Deleting all events and creating 6 single events directly...');
    
    // Delete ALL events first
    console.log('Deleting all existing events...');
    await prisma.event.deleteMany({});
    console.log('✅ All events deleted');
    
    // Get theatre mapping
    const theatres = await prisma.theatre.findMany();
    const theatreMap = {};
    theatres.forEach(t => {
      theatreMap[t.name] = t.id;
    });
    
    console.log('\nTheatre mapping:');
    Object.entries(theatreMap).forEach(([name, id]) => {
      console.log(`- ${name}: ${id}`);
    });
    
    console.log('\n🎪 Creating 6 single events using direct Prisma operations...');
    
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
    
    for (const event of eventsToCreate) {
      const theatreId = theatreMap[event.theatreName];
      
      if (!theatreId) {
        console.warn(`⚠️ Theatre not found for ${event.theatreName}, skipping event ${event.title}`);
        continue;
      }
      
      try {
        console.log(`Creating single event: ${event.title} for theatre ${event.theatreName} (ID: ${theatreId})`);
        
        const createdEvent = await prisma.event.create({
          data: {
            title: event.title,
            description: event.synopsis,
            event_type: 'performance',
            event_date: new Date(event.date),
            event_time: new Date(`1970-01-01T${event.time}:00.000Z`),
            theatre_id: theatreId,
            price: 25,
            image_url: event.imageUrl,
            poster_url: event.posterUrl,
            language: event.language,
            content_language: 'en',
            genre: event.genre,
            company: [event.theatreName],
            director: event.director,
            cast: ['Actor 1', 'Actor 2'],
            synopsis: event.synopsis,
            duration: event.duration,
            is_featured: false
          }
        });
        
        createdEvents++;
        console.log(`✅ Created event: ${createdEvent.title} (ID: ${createdEvent.id})`);
        
      } catch (error) {
        console.error(`❌ Error creating event ${event.title}:`, error.message);
      }
    }
    
    console.log('\n✅ Direct events creation completed!');
    console.log(`Created ${createdEvents} events`);
    
    // Verify the results
    const finalEventCount = await prisma.event.count();
    const finalTheatreCount = await prisma.theatre.count();
    
    console.log(`\n📊 Final database state:`);
    console.log(`- Theatres: ${finalTheatreCount}`);
    console.log(`- Events: ${finalEventCount}`);
    
  } catch (error) {
    console.error('❌ Error in direct events creation:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSingleEvents();