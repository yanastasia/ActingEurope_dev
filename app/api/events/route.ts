import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { performances } from '@/lib/performance-data'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        theatre: true,
        venue: true,
      },
      orderBy: [
        {
          event_date: 'asc',
        },
        {
          event_time: 'asc',
        },
      ],
    })

    // Transform the data to match the expected format
    const transformedEvents = events.map((event) => {
      // Ensure consistent date/time formatting across environments
      const eventDate = new Date(event.event_date);
      
      // Handle time formatting more safely
      let timeString = '00:00';
      if (event.event_time) {
        if (typeof event.event_time === 'string') {
          // If it's already a string in HH:MM format
          timeString = event.event_time.substring(0, 5);
        } else {
          // If it's a Date object, extract time
          const timeDate = new Date(event.event_time);
          if (!isNaN(timeDate.getTime())) {
            timeString = timeDate.toTimeString().substring(0, 5);
          }
        }
      }
      
      return {
        id: event.id.toString(),
        title: event.title,
        company: event.company,
        date: eventDate.toISOString().split('T')[0].split('-').reverse().join('-'), // DD-MM-YYYY format
        time: timeString, // HH:MM format
        venue: event.venue?.name || 'TBA',
        imageUrl: event.image_url || '/placeholder.svg?height=1080&width=1920',
        posterUrl: event.poster_url,
        genre: event.genre || 'Drama',
        language: event.language || 'Bulgarian',
        duration: event.duration || '120 min',
        synopsis: event.description,
        director: event.director,
        cast: event.cast,
        price: event.price ? `€${event.price}` : 'Free',
        eventType: event.event_type,
        isFeatured: event.is_featured,
        theatreName: event.theatre.name,
        theatreCity: event.theatre.city,
        theatreCountry: event.theatre.country,
      };
    });

    return NextResponse.json(transformedEvents);
  } catch (error) {
    console.error('Error fetching events:', error)
    
    // If database is unavailable (connection limit reached), return fallback data
    if (error instanceof Error && 
        (error.message.includes('Request Unit limit') || 
         error.message.includes('database connections opened') ||
         error.name === 'PrismaClientInitializationError')) {
      
      console.log('Database unavailable, returning fallback performance data')
      
      // Transform performance data to match expected event format
      const fallbackEvents = performances.map((performance) => ({
        id: performance.id,
        title: performance.title,
        company: Array.isArray(performance.company) ? performance.company[0] : performance.company,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        imageUrl: performance.imageUrl,
        posterUrl: performance.posterUrl,
        genre: performance.genre,
        language: performance.language,
        duration: performance.duration,
        synopsis: performance.synopsis,
        director: performance.director,
        cast: performance.cast,
        price: 'TBA',
        eventType: 'performance',
        isFeatured: false,
        theatreName: 'Acting Europe Festival',
        theatreCity: 'Various',
        theatreCountry: 'Europe',
      }))
      
      return NextResponse.json(fallbackEvents)
    }
    
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      eventType,
      date,
      time,
      venue,
      company,
      description,
      imageUrl,
      isFeatured,
      price,
      tags
    } = body

    // Parse date and time (date comes in YYYY-MM-DD format from HTML date input)
    const eventDate = new Date(date)
    const [hours, minutes] = time.split(':')
    const eventTime = new Date()
    eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    // Find venue by name
    const venueRecord = await prisma.venue.findFirst({
      where: { name: venue }
    })

    if (!venueRecord) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 400 })
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title,
        event_type: eventType,
        event_date: eventDate,
        event_time: eventTime,
        venue_id: venueRecord.id,
        theatre_id: 1, // Default theatre ID
        company: Array.isArray(company) ? company : [company],
        description,
        image_url: imageUrl,
        is_featured: isFeatured,
        price: parseFloat(price) || 0,
        genre: tags?.join(', ') || 'Drama',
        language: 'Bulgarian',
        duration: '120 min'
      }
    })

    return NextResponse.json({ success: true, id: event.id })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}