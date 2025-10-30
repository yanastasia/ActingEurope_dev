import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getEventsByLanguage, getAllEvents, createEventWithTranslations, getTheatreByIdAndLanguage } from '@/lib/database-operations'
import { translations } from '@/lib/translations'
import { formatEventTime } from '@/lib/utils'
import { createClient } from '@supabase/supabase-js'

// Helper function to fix company names
const fixCompanyName = (name: string): string => {
  return name
    .replace(/OSAIK "39 Monkeys"/g, 'OCAAC "36 Monkeys"')
    .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК „36 Маймуни"')
    .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАУК „36 Мајмуни"')
    .replace(/ОСАУК "39 мајмуна"/g, 'ОСАУК „36 мајмуна"')
}

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
      const timeString = formatEventTime(event.eventTime);
      
      // Get translated theatre information for primary theatre (for location info)
      const theatre = await getTheatreByIdAndLanguage(event.theatreId, event.contentLanguage || language || 'en');
      
      // Handle multiple theatre names from company field
      let theatreNames = 'Theatre Name';
      if (event.company && event.company.length > 0) {
        // Filter out non-theatre companies like 'ActingEurope'
        const theatreCompanies = event.company.filter(company => company !== 'ActingEurope');
        if (theatreCompanies.length > 0) {
          theatreNames = fixCompanyName(theatreCompanies.join(' & '));
        }
      }
      
      // Get venue information if venue_id exists
      let venueName = 'TBA';
      if (event.venueId) {
        try {
          const venue = await prisma.venue.findUnique({
            where: { id: event.venueId },
            select: { name: true }
          });
          if (venue) {
            // Apply translation to venue name
            const langTranslations = translations[language as keyof typeof translations] || translations.en;
            const translation = langTranslations && typeof langTranslations === 'object' ? (langTranslations as Record<string, string>)[venue.name] : undefined;
            venueName = translation || venue.name;
          }
        } catch (error) {
          console.error('Error fetching venue:', error);
        }
      }
      
      // Translate company names based on the requested language
      const translatedCompany = event.company ? event.company.map((comp: string) => {
        const langTranslations = translations[language as keyof typeof translations] || translations.en;
        // Safely access the translation using bracket notation
        const translation = langTranslations && typeof langTranslations === 'object' ? (langTranslations as Record<string, string>)[comp] : undefined;
        return fixCompanyName(translation || comp);
      }) : [];

      return {
        id: event.id.toString(),
        title: event.title,
        company: translatedCompany,
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
        theatreName: theatreNames,
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
    // Fallback 1: Try Supabase if configured
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (supabaseUrl && supabaseAnonKey) {
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language');
        const translationGroup = searchParams.get('translationGroup');

        const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

        let eventsData: any[] = []
        if (translationGroup) {
          const { data, error: sbError } = await supabase
            .from('events')
            .select('*, theatre:theatres(*), venue:venues(*)')
            .eq('translation_group', translationGroup)
            .order('content_language', { ascending: true })
          if (sbError) throw sbError
          eventsData = data || []
        } else if (language) {
          const { data, error: sbError } = await supabase
            .from('events')
            .select('*, theatre:theatres(*), venue:venues(*)')
            .eq('content_language', language)
            .order('event_date', { ascending: true })
            .order('event_time', { ascending: true })
          if (sbError) throw sbError
          eventsData = data || []
        } else {
          const { data, error: sbError } = await supabase
            .from('events')
            .select('*, theatre:theatres(*), venue:venues(*)')
            .order('event_date', { ascending: true })
            .order('event_time', { ascending: true })
          if (sbError) throw sbError
          eventsData = data || []
        }

        // Map to transformedEvents format
        const transformedEvents = eventsData.map((event: any) => {
          const eventDate = new Date(event.event_date)
          const timeString = formatEventTime(event.event_time)

          // Company names
          let theatreNames = 'Theatre Name'
          const companyArr = Array.isArray(event.company) ? event.company : (event.company ? [event.company] : [])
          const theatreCompanies = companyArr.filter((c: string) => c !== 'ActingEurope')
          if (theatreCompanies.length > 0) {
            theatreNames = fixCompanyName(theatreCompanies.join(' & '))
          }

          // Venue name with translation
          let venueName = 'TBA'
          if (event.venue) {
            const langTranslations = translations[(language as keyof typeof translations) || 'en'] || translations.en
            const translated = langTranslations && typeof langTranslations === 'object' ? (langTranslations as Record<string, string>)[event.venue.name] : undefined
            venueName = translated || event.venue.name
          }

          const translatedCompany = companyArr.map((comp: string) => {
            const langTranslations = translations[(language as keyof typeof translations) || 'en'] || translations.en
            const translation = langTranslations && typeof langTranslations === 'object' ? (langTranslations as Record<string, string>)[comp] : undefined
            return fixCompanyName(translation || comp)
          })

          return {
            id: String(event.id),
            title: event.title,
            company: translatedCompany,
            date: eventDate.toISOString().split('T')[0].split('-').reverse().join('-'),
            time: timeString,
            venue: venueName,
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
            theatreCity: event.theatre?.city || 'City',
            theatreCountry: event.theatre?.country || 'Country',
            contentLanguage: event.content_language,
            translationGroup: event.translation_group,
            performanceLanguage: event.performance_language,
            subtitleLanguage: event.subtitle_language
          }
        })

        return NextResponse.json(transformedEvents, { status: 200 })
      }
    } catch (sbFallbackError) {
      console.error('Supabase events fallback failed:', sbFallbackError)
    }

    // Fallback 2: return empty list so UI can render gracefully
    return NextResponse.json([], { status: 200 })
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

    // Convert arrays to comma-separated strings for database storage
    const performanceLanguageString = Array.isArray(performanceLanguage) ? performanceLanguage.join(', ') : performanceLanguage;
    const subtitleLanguageString = Array.isArray(subtitleLanguage) ? subtitleLanguage.join(', ') : subtitleLanguage;

    // Create the event with translations
    const events = await createEventWithTranslations(
      title,
      description || '',
      validEventType,
      eventDate,
      eventTime,
      (Array.isArray(theatreId) && theatreId.length > 0) ? theatreId[0] : 122, // Default theatre ID
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
      performanceLanguageString,
      subtitleLanguageString
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