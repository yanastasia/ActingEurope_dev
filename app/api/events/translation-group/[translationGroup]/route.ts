import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getEventTranslationGroup } from '@/lib/database-operations'

export async function GET(request: Request, { params }: { params: { translationGroup: string } }) {
  try {
    const { translationGroup } = params
    
    if (!translationGroup) {
      return NextResponse.json({ error: 'Translation group is required' }, { status: 400 })
    }

    const events = await prisma.event.findMany({
      where: {
        translation_group: translationGroup
      },
      include: {
        theatre: true,
        venue: true
      },
      orderBy: {
        content_language: 'asc'
      }
    });

    if (!events || events.length === 0) {
      return NextResponse.json({ error: 'No events found for this translation group' }, { status: 404 })
    }

    // Transform the data to match the expected format
    const transformedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      company: event.company,
      director: event.director,
      cast: event.cast,
      eventDate: event.event_date?.toISOString() || null,
      eventTime: event.event_time?.toISOString() || null,
      venue: event.venue?.name || 'TBA',
      price: event.price,
      imageUrl: event.image_url,
      posterUrl: event.poster_url,
      genre: event.genre,
      language: event.language,
      contentLanguage: event.content_language,
      duration: event.duration,

      subtitles: event.subtitles,
      theatreName: event.theatre?.name || 'Unknown Theatre',
      theatreCity: event.theatre?.city || '',
      theatreCountry: event.theatre?.country || '',
      translationGroup: event.translation_group
    }));

    return NextResponse.json(transformedEvents)
  } catch (error) {
    console.error('Error fetching translation group events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}