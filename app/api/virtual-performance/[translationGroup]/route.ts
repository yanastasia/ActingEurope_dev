import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Get virtual performance (primary event) for a translation group
export async function GET(
  request: NextRequest,
  { params }: { params: { translationGroup: string } }
) {
  try {
    const { translationGroup } = params;

    if (!translationGroup) {
      return NextResponse.json(
        { error: 'Translation group is required' },
        { status: 400 }
      );
    }

    // Find all events in the translation group
    const events = await prisma.event.findMany({
      where: {
        translation_group: translationGroup
      },
      include: {
        theatre: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true
          }
        },
        venue: {
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
            city: true,
            capacity: true
          }
        }
      },
      orderBy: [
        { content_language: 'asc' }, // English first
        { created_at: 'asc' }
      ]
    });

    if (events.length === 0) {
      return NextResponse.json(
        { error: 'No events found for this translation group' },
        { status: 404 }
      );
    }

    // Select the primary event (English version if available, otherwise first one)
    const primaryEvent = events.find((event: any) => event.content_language === 'en') || events[0];

    // Get all language variants for reference
    const languageVariants = events.map((event: any) => ({
      id: event.id,
      language: event.content_language,
      title: event.title
    }));

    // Format the virtual performance response
    const virtualPerformance = {
      id: primaryEvent.id,
      translationGroup: translationGroup,
      title: primaryEvent.title,
      description: primaryEvent.description,
      eventType: primaryEvent.event_type,
      eventDate: primaryEvent.event_date,
      eventTime: primaryEvent.event_time,
      price: primaryEvent.price,
      imageUrl: primaryEvent.image_url,
      posterUrl: primaryEvent.poster_url,
      genre: primaryEvent.genre,
      company: primaryEvent.company,
      director: primaryEvent.director,
      cast: primaryEvent.cast,
      subtitles: primaryEvent.subtitles,
      duration: primaryEvent.duration,
      isFeatured: primaryEvent.is_featured,
      theatre: primaryEvent.theatre,
      venue: primaryEvent.venue,
      venueId: primaryEvent.venue_id,
      languageVariants: languageVariants,
      primaryLanguage: primaryEvent.content_language,
      createdAt: primaryEvent.created_at,
      updatedAt: primaryEvent.updated_at
    };

    return NextResponse.json(virtualPerformance);
  } catch (error) {
    console.error('Error fetching virtual performance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch virtual performance' },
      { status: 500 }
    );
  }
}