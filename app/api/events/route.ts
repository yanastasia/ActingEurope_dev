import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { performances } from '@/lib/performance-data'
import { getEventsByLanguage, getAllEvents, createEventWithTranslations, getTheatreByIdAndLanguage } from '@/lib/database-operations'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    const translationGroup = searchParams.get('translationGroup');
    
    let events;
    if (translationGroup) {
      // Fetch events by translation group
      events = await prisma.event.findMany({
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
      
      // Transform to match the Event interface
      events = events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        eventType: event.event_type,
        eventDate: event.event_date,
        eventTime: event.event_time,
        price: Number(event.price),
        imageUrl: event.image_url,
        posterUrl: event.poster_url,
        language: event.language,
        contentLanguage: event.content_language,
        translationGroup: event.translation_group,
        performanceLanguage: event.performance_language,
        subtitleLanguage: event.subtitle_language,
        genre: event.genre,
        company: event.company,
        director: event.director,
        cast: event.cast,
        subtitles: event.subtitles,
        duration: event.duration,
        isFeatured: event.is_featured,
        theatreId: event.theatre_id,
        venueId: event.venue_id,
        createdAt: event.created_at,
        updatedAt: event.updated_at
      }));
    } else {
      events = language ? await getEventsByLanguage(language) : await getAllEvents();
    }

    // Transform the data to match the expected format with translated theatre names
    const transformedEvents = await Promise.all(events.map(async (event) => {
      // Ensure consistent date/time formatting across environments
      const eventDate = new Date(event.eventDate);
      
      // Handle time formatting more safely
      let timeString = '00:00';
      if (event.eventTime) {
        // eventTime is a DateTime, convert to time string
        const timeDate = new Date(event.eventTime);
        if (!isNaN(timeDate.getTime())) {
          timeString = timeDate.toTimeString().substring(0, 5);
        }
      }
      
      // Get translated theatre information
      const theatre = await getTheatreByIdAndLanguage(event.theatreId, event.contentLanguage || language || 'en');
      
      // Get venue information if venue_id exists
      let venueName = 'TBA';
      if (event.venueId) {
        try {
          const venue = await prisma.venue.findUnique({
            where: { id: event.venueId },
            select: { name: true }
          });
          if (venue) {
            venueName = venue.name;
          }
        } catch (error) {
          console.error('Error fetching venue:', error);
        }
      }
      
      return {
        id: event.id.toString(),
        title: event.title,
        company: event.company,
        date: eventDate.toISOString().split('T')[0].split('-').reverse().join('-'), // DD-MM-YYYY format for display
        time: timeString, // HH:MM format
        venue: venueName,
        imageUrl: event.imageUrl || '/placeholder.svg?height=1080&width=1920',
        posterUrl: event.posterUrl,
        genre: event.genre || 'Drama',
        language: event.language || 'Bulgarian',
        duration: event.duration || '120 min',
        description: event.description,
        director: event.director,
        cast: event.cast,
        price: event.price ? `€${event.price}` : 'Free',
        eventType: event.eventType,
        isFeatured: event.isFeatured,
        theatreName: theatre?.name || 'Theatre Name',
        theatreCity: theatre?.city || 'City',
        theatreCountry: theatre?.country || 'Country',
        contentLanguage: event.contentLanguage,
        translationGroup: event.translationGroup,
        performanceLanguage: event.performanceLanguage,
        subtitleLanguage: event.subtitleLanguage
      };
    }));

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
        company: performance.company,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        imageUrl: performance.imageUrl,
        posterUrl: performance.posterUrl,
        genre: performance.genre,
        language: performance.language,
        duration: performance.duration,
        description: performance.synopsis,
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
      eventDate: frontendEventDate,
      eventTime: frontendEventTime,
      venue,
      company,
      description,
      imageUrl,
      posterUrl,
      isFeatured,
      price,
      tags,
      theatreId,
      language,
      genre,
      director,
      cast,

      subtitles,
      duration,
      performanceLanguage,
      subtitleLanguage
    } = body

    // Parse date and time - handle both old and new parameter names
    let eventDate: Date;
    let eventTime: Date;
    
    if (frontendEventDate) {
      // New format from frontend
      eventDate = new Date(frontendEventDate);
      if (frontendEventTime) {
        // If frontendEventTime is a time string like "19:00", create a proper date
        if (typeof frontendEventTime === 'string' && frontendEventTime.includes(':')) {
          const [hours, minutes] = frontendEventTime.split(':');
          eventTime = new Date();
          eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        } else {
          eventTime = new Date(frontendEventTime);
        }
      } else {
        eventTime = new Date();
        eventTime.setHours(19, 0, 0, 0); // Default to 7 PM
      }
    } else if (date && time) {
      // Legacy format
      eventDate = new Date(date);
      const [hours, minutes] = time.split(':');
      eventTime = new Date();
      eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      throw new Error('Missing date/time information');
    }

    // Validate and map eventType to valid enum values
    const validEventTypes = ['performance', 'workshop', 'discussion'];
    let validEventType = eventType;
    
    // Map common aliases to valid types
    if (eventType === 'play' || eventType === 'theater' || eventType === 'theatre') {
      validEventType = 'performance';
    } else if (!validEventTypes.includes(eventType)) {
      validEventType = 'performance'; // Default fallback
    }

    // Find venue by name if provided
    let venueId: number | undefined;
    if (venue) {
      const venueRecord = await prisma.venue.findFirst({
        where: { name: venue }
      })
      if (venueRecord) {
        venueId = venueRecord.id;
      }
    }

    // Create the event with translations
    const events = await createEventWithTranslations(
      title,
      description || '',
      validEventType,
      eventDate,
      eventTime,
      theatreId || 121, // Default theatre ID
      venueId,
      parseFloat(price) || 0,
      imageUrl,
      posterUrl,
      language || 'Bulgarian',
      genre || tags?.join(', ') || 'Drama',
      Array.isArray(company) ? company : [company || ''],
      director,
      Array.isArray(cast) ? cast : (cast ? [cast] : []),
      subtitles,
      duration || '120 min',
      isFeatured || false,
      performanceLanguage,
      subtitleLanguage
    )

    return NextResponse.json({ 
      success: true, 
      events: events.map(event => ({ 
        id: event.id, 
        language: event.contentLanguage,
        translationGroup: event.translationGroup 
      }))
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}