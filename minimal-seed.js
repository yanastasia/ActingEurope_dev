const { PrismaClient } = require('@prisma/client')

// Hardcoded performance data to avoid TypeScript import issues
const performances = [
  {
    id: "1",
    title: "No Man's Land",
    company: ["Macedonian National Theatre"],
    director: "Aleksandar Morfov",
    cast: ["Saško Kocev", "Toni Mihajlovski"],
    date: "20-09-2025",
    time: "19:00",
    venue: "Main Stage",
    imageUrl: "/nizhija_zemja1.jpg",
    posterUrl: "/nichija_zemja.jpg",
    genre: "Drama",
    language: "Macedonian",
    duration: "120 minutes",
    synopsis: "A powerful drama about human relationships"
  },
  {
    id: "2",
    title: "Don Juan",
    company: ["National Theatre in Niš"],
    director: "Marko Petrović",
    cast: ["Stefan Milenković", "Ana Jovanović"],
    date: "21-09-2025",
    time: "20:00",
    venue: "Main Stage",
    imageUrl: "/don_zhuan1.jpg",
    posterUrl: "/don_zhuan.jpg",
    genre: "Comedy",
    language: "Serbian",
    duration: "110 minutes",
    synopsis: "Classic tale of the legendary seducer"
  },
  {
    id: "3",
    title: "Aivar or Lutenitsa",
    company: ["OSAIK '39 Monkeys'"],
    director: "Ivan Petrov",
    cast: ["Maria Dimitrova", "Georgi Stoyanov"],
    date: "22-09-2025",
    time: "19:30",
    venue: "Main Stage",
    imageUrl: "/a_ili_lj1.JPG",
    posterUrl: "/a_ili_lj.png",
    genre: "Comedy",
    language: "Bulgarian",
    duration: "90 minutes",
    synopsis: "A humorous take on Bulgarian traditions"
  }
]

async function main() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🌱 Starting minimal database seed...')
    
    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await prisma.bookedSeat.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.seat.deleteMany()
    await prisma.venueSection.deleteMany()
    await prisma.event.deleteMany()
    await prisma.venue.deleteMany()
    await prisma.theatreTag.deleteMany()
    await prisma.theatreImage.deleteMany()
    await prisma.theatre.deleteMany()
    await prisma.newsArticle.deleteMany()
    await prisma.user.deleteMany()
    
    // Create admin users
    console.log('👥 Creating admin users...')
    await prisma.user.create({
      data: {
        email: 'admin@actingeurope.com',
        password_hash: '$2a$10$example.hash.for.admin.user',
        first_name: 'Admin',
        last_name: 'User',
        phone: '+1234567890',
        is_admin: true,
        email_notifications: true,
        marketing_preferences: false,
      },
    })
    
    // Create theatres with correct IDs
    console.log('🎭 Creating theatres...')
    const theatres = [
      { id: 121, name: 'Macedonian National Theatre', city: 'Skopje', country: 'North Macedonia' },
      { id: 123, name: 'National Theatre in Niš', city: 'Niš', country: 'Serbia' },
      { id: 124, name: 'OSAIK \'39 Monkeys\'', city: 'Sofia', country: 'Bulgaria' },
    ]
    
    for (const theatre of theatres) {
      await prisma.theatre.create({
        data: {
          id: theatre.id,
          name: theatre.name,
          city: theatre.city,
          country: theatre.country,
          description: `${theatre.name} description`,
          content_language: 'en'
        },
      })
    }
    
    // Create a simple venue without seats
    console.log('🏛️ Creating venue...')
    const venue = await prisma.venue.create({
      data: {
        name: 'Main Stage',
        description: 'Main performance venue',
        capacity: 500,
      },
    })
    
    // Create events with proper theatre associations
    console.log('🎪 Creating events...')
    const theatreMapping = {
      'National Theatre in Niš': 123,
      'OSAIK \'39 Monkeys\'': 124,
      'Macedonian National Theatre': 121
    }
    
    for (const performance of performances) {
      const primaryCompany = performance.company[0]
      let theatreId = theatreMapping[primaryCompany]
      
      // Default to first theatre if not found
      if (!theatreId) {
        theatreId = 121
      }
      
      await prisma.event.create({
        data: {
          title: performance.title,
          theatre_id: theatreId,
          venue_id: venue.id,
          event_type: 'performance',
          event_date: new Date(performance.date.split('-').reverse().join('-')),
          event_time: new Date(`1970-01-01T${performance.time}:00.000Z`),
          description: performance.synopsis || '',
          price: 0,
          image_url: performance.imageUrl,
          poster_url: performance.posterUrl,
          language: performance.language || 'Bulgarian',
          content_language: 'en', // Set content_language explicitly
          genre: performance.genre || 'Drama',
          company: performance.company,
          director: performance.director,
          cast: performance.cast,
          synopsis: performance.synopsis,
          subtitles: performance.subtitles,
          duration: performance.duration,
          is_featured: false,
        },
      })
    }
    
    console.log('✅ Minimal database seed completed!')
    console.log(`Created ${theatres.length} theatres`)
    console.log(`Created 1 venue`)
    console.log(`Created ${performances.length} events`)
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch(console.error)