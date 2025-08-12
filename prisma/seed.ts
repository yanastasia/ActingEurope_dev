import { theatres, venues, news } from '../lib/database'
import { performances } from '../lib/performance-data'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Starting database seed...')

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

  // Seed Users
  console.log('👥 Seeding users...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@actingeurope.com',
      password_hash: '$2a$10$example.hash.for.admin.user', // In production, use proper bcrypt hash
      first_name: 'Admin',
      last_name: 'User',
      phone: '+1234567890',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  // Add Anastasia admin user
  const anastasiaUser = await prisma.user.create({
    data: {
      email: 'anastasia@actingeurope.eu',
      password_hash: '$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG', // bcrypt hash for ActingEurope2025!
      first_name: 'Anastasia',
      last_name: 'Admin',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  // Add Toni admin user
  const toniUser = await prisma.user.create({
    data: {
      email: 'toni@actingeurope.eu',
      password_hash: '$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG', // bcrypt hash for ActingEurope2025!
      first_name: 'Toni',
      last_name: 'Admin',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  // Seed Theatres
  console.log('🎭 Seeding theatres...')
  const theatreMap = new Map()
  for (const theatre of theatres) {
    const createdTheatre = await prisma.theatre.create({
      data: {
        name: theatre.name,
        city: theatre.city,
        country: theatre.country,
        description: theatre.description,
        history: theatre.history,
        website: theatre.website,
        founded_year: theatre.foundedYear,
      },
    })
    theatreMap.set(theatre.name, createdTheatre.id)

    // Add theatre images
    for (const image of theatre.images) {
      await prisma.theatreImage.create({
        data: {
          theatre_id: createdTheatre.id,
          image_url: image.imageUrl,
          caption: image.caption,
          is_primary: image.isPrimary,
        },
      })
    }

    // Add theatre tags
    for (const tag of theatre.tags) {
      await prisma.theatreTag.create({
        data: {
          theatre_id: createdTheatre.id,
          tag_name: tag,
        },
      })
    }
  }

  // Seed Venues
  console.log('🏛️ Seeding venues...')
  const venueMap = new Map()
  for (const venue of venues) {
    const createdVenue = await prisma.venue.create({
      data: {
        name: venue.name,
        description: venue.description,
        capacity: venue.capacity,
      },
    })
    venueMap.set(venue.name, createdVenue.id)

    // Add venue sections and seats
    for (const section of venue.sections) {
      const createdSection = await prisma.venueSection.create({
        data: {
          venue_id: createdVenue.id,
          section_name: section.sectionName,
          section_type: section.sectionType,
        },
      })

      // Add seats for this section
      for (const seat of section.seats) {
        await prisma.seat.create({
          data: {
            venue_section_id: createdSection.id,
            row_number: seat.rowNumber,
            seat_number: seat.seatNumber,
            is_available: seat.isAvailable,
          },
        })
      }
    }
  }

  // Seed Performances (Events)
  console.log('🎪 Seeding performances...')
  for (const performance of performances) {
    // Find matching theatre ID (use first company for theatre lookup)
    const primaryCompany = performance.company[0]
    const theatreId = theatreMap.get(primaryCompany)
    const venueId = venueMap.get(performance.venue)

    if (!theatreId) {
      console.warn(`Skipping performance ${performance.title}: theatre not found (${primaryCompany})`)
      continue
    }
    
    if (!venueId) {
      console.warn(`Creating performance ${performance.title} without venue (${performance.venue} not found)`)
    }

    await prisma.event.create({
      data: {
        title: performance.title,
        theatre_id: theatreId,
        venue_id: venueId || null, // Allow null venue_id
        event_type: 'performance',
        event_date: new Date(performance.date.split('-').reverse().join('-')), // Convert DD-MM-YYYY to YYYY-MM-DD
        event_time: new Date(`1970-01-01T${performance.time}:00.000Z`),
        description: performance.synopsis || '',
        price: 0, // Default price
        image_url: performance.imageUrl,
        language: performance.language || 'Bulgarian', // Use performance language
        genre: performance.genre || 'Drama', // Use performance genre
        is_featured: false,
        company: performance.company,
        director: performance.director,
        cast: performance.cast,
        poster_url: performance.posterUrl,
        synopsis: performance.synopsis,
        subtitles: performance.subtitles,
        duration: performance.duration,
      },
    })
  }

  // Seed News Articles
  console.log('📰 Seeding news articles...')
  for (const article of news) {
    await prisma.newsArticle.create({
      data: {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        author: article.author,
        published_at: article.publishedDate,
        image_url: article.imageUrl,
        is_published: article.isFeatured,
        category: article.category,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${theatres.length} theatres`)
  console.log(`Created ${venues.length} venues`)
  console.log(`Created ${performances.length} performances`)
  console.log(`Created ${news.length} news articles`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })