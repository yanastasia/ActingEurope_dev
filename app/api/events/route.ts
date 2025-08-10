import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        theatre: true,
        venue: true,
      },
      orderBy: {
        event_date: 'asc',
      },
    })

    // Transform the data to match the expected format
    const transformedEvents = events.map((event) => ({
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
    }))

    return NextResponse.json(transformedEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}