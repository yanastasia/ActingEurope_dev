import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { performances } from '@/lib/performance-data'
import { getEventTranslationGroup, updateEvent, deleteEventWithTranslations, getTheatreByIdAndLanguage } from '@/lib/database-operations'
import { translations } from '@/lib/translations'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const { id } = resolvedParams
    const { searchParams } = new URL(request.url)
    const requestedLanguage = searchParams.get('language') || 'en'
    
    // First, try to find the event by ID
    let event = await prisma.event.findUnique({
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

    // If the event's content language doesn't match the requested language,
    // try to find the translation in the requested language
    if (event.content_language !== requestedLanguage && event.translation_group) {
      const translatedEvent = await prisma.event.findFirst({
        where: {
          translation_group: event.translation_group,
          content_language: requestedLanguage,
        },
        include: {
          theatre: true,
          venue: true,
        },
      })
      
      // Use the translated event if found, otherwise keep the original
      if (translatedEvent) {
        event = translatedEvent
      }
    }

    // Get theatre name in the requested language instead of event's content language
    const theatre = await getTheatreByIdAndLanguage(event.theatre_id, requestedLanguage);

    // Handle multiple theatre names from company field
    let theatreNames = theatre?.name || event.theatre.name;
    if (event.company && event.company.length > 0) {
      // Filter out non-theatre companies like 'ActingEurope'
      const theatreCompanies = event.company.filter(company => company !== 'ActingEurope');
      if (theatreCompanies.length > 0) {
        theatreNames = theatreCompanies.join(' & ');
      }
    }

    // Translate company names based on the requested language
    const translatedCompany = event.company ? event.company.map((comp: string) => {
      const langTranslations = translations[requestedLanguage as keyof typeof translations] || translations.en;
      // Safely access the translation using bracket notation
      const translation = langTranslations && typeof langTranslations === 'object' ? (langTranslations as Record<string, string>)[comp] : undefined;
      return translation || comp;
    }) : [];

    // Transform the data to match the expected format
    const transformedEvent = {
      id: event.id.toString(),
      title: event.title,
      company: translatedCompany,
      date: event.event_date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-'),
      time: new Date(event.event_time).toLocaleTimeString('en-GB', {
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
      description: event.description,
      director: event.director,
      cast: event.cast,
      price: event.price ? `€${event.price}` : 'Free',
      eventType: event.event_type,
      isFeatured: event.is_featured,
      theatreName: theatreNames,
      theatreCity: theatre?.city || event.theatre.city,
      theatreCountry: theatre?.country || event.theatre.country,
      contentLanguage: event.content_language,
      translationGroup: event.translation_group,
      theatreId: event.theatre_id,
      venueId: event.venue_id,
      subtitles: event.subtitles
    }

    return NextResponse.json(transformedEvent)
  } catch (error) {
    console.error('Error fetching event:', error)
    
    // If database is unavailable (connection limit reached), return fallback data
    if (error instanceof Error && 
        (error.message.includes('Request Unit limit') || 
         error.message.includes('database connections opened') ||
         error.name === 'PrismaClientInitializationError')) {
      
      console.log('Database unavailable, searching fallback performance data for event ID:', resolvedParams.id)
      
      // Find the specific performance by ID
      const performance = performances.find(p => p.id === resolvedParams.id)
      
      if (performance) {
        // Transform performance data to match expected event format
        const fallbackEvent = {
          id: performance.id,
          title: performance.title,
          company: performance.company,
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  console.log('🎯 PUT request received for event ID:', resolvedParams.id);
  try {
    const eventId = parseInt(resolvedParams.id)
    
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
    }

    const body = await request.json()
    const {
      title,
      description,
      eventType,
      date,
      time,
      eventDate,
      eventTime,
      theatreId,
      venueId,
      price,
      imageUrl,
      posterUrl,
      language,
      genre,
      company,
      director,
      cast,
      subtitles,
      duration,
      isFeatured,
      performanceLanguage,
      subtitleLanguage
    } = body

    // Handle both formats: admin page sends eventDate/eventTime, API might send date/time
    let finalEventDate: Date | undefined
    let finalEventTime: Date | undefined
    
    if (eventDate) {
      finalEventDate = new Date(eventDate)
    } else if (date) {
      finalEventDate = new Date(date)
    }
    
    if (eventTime) {
      if (typeof eventTime === 'string' && eventTime.match(/^\d{1,2}:\d{2}$/)) {
        // Handle time format like "19:30"
        const [hours, minutes] = eventTime.split(':')
        finalEventTime = new Date()
        finalEventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      } else {
        // Handle full date string
        finalEventTime = new Date(eventTime)
      }
    } else if (time) {
      const [hours, minutes] = time.split(':')
      finalEventTime = new Date()
      finalEventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    }

    // Handle theatreId - admin page sends array, but database expects single value
    let finalTheatreId: number | undefined
    if (Array.isArray(theatreId) && theatreId.length > 0) {
      finalTheatreId = theatreId[0] // Take first theatre for now
    } else if (typeof theatreId === 'number') {
      finalTheatreId = theatreId
    } else if (typeof theatreId === 'string') {
      finalTheatreId = parseInt(theatreId)
    }

    // Handle venue - use provided venueId directly
    const finalVenueId: number | undefined = venueId ? parseInt(venueId) : undefined

    console.log('🚀 About to call updateEvent with eventId:', eventId)
    console.log('🔍 updateEvent function type:', typeof updateEvent);
    console.log('📝 updateEvent function:', updateEvent.toString().substring(0, 200));
    const updatedEvent = await updateEvent(eventId, {
      title,
      description,
      eventType,
      eventDate: finalEventDate,
      eventTime: finalEventTime,
      theatreId: finalTheatreId,
      venueId: finalVenueId,
      price: price ? parseFloat(price) : undefined,
      imageUrl,
      posterUrl,
      language,
      genre,
      company: Array.isArray(company) ? company : (company ? [company] : undefined),
      director,
      cast: Array.isArray(cast) ? cast : (cast ? [cast] : undefined),

      subtitles,
      duration,
      isFeatured,
      performanceLanguage: Array.isArray(performanceLanguage) ? performanceLanguage : (performanceLanguage ? [performanceLanguage] : undefined),
      subtitleLanguage: Array.isArray(subtitleLanguage) ? subtitleLanguage : (subtitleLanguage ? [subtitleLanguage] : undefined)
    })
    console.log('updateEvent call completed, result:', updatedEvent)

    console.log('Updated event from database:', updatedEvent)
    const response = { success: true, event: updatedEvent }
    console.log('API response being sent:', response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.id)
    
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
    }

    await deleteEventWithTranslations(eventId)

    return NextResponse.json({ success: true, message: 'Event and all translations deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}