import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { performances } from '@/lib/performance-data'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        theatre: true,
        venue: true,
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Transform the data to match the expected format
    const transformedEvent = {
      id: event.id.toString(),
      title: event.title,
      company: event.company,
      date: event.event_date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-'),
      time: event.event_time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
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
    }

    return NextResponse.json(transformedEvent)
  } catch (error) {
    console.error('Error fetching event:', error)
    
    // If database is unavailable (connection limit reached), return fallback data
    if (error instanceof Error && 
        (error.message.includes('Request Unit limit') || 
         error.message.includes('database connections opened') ||
         error.name === 'PrismaClientInitializationError')) {
      
      console.log('Database unavailable, searching fallback performance data for event ID:', params.id)
      
      // Find the specific performance by ID
      const performance = performances.find(p => p.id === params.id)
      
      if (performance) {
        // Transform performance data to match expected event format
        const fallbackEvent = {
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
        }
        
        return NextResponse.json(fallbackEvent)
      } else {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
      }
    }
    
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}