import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}