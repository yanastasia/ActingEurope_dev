import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createTheatreWithTranslations } from '../../../lib/database-operations';
import { getTheatres as getStaticTheatres } from '../../../lib/database';
import { createClient } from '@supabase/supabase-js'

// Helper function to check if the request is from an admin
const hasAdminAccess = (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return false;
  }
  const userRole = authHeader.replace('Bearer ', '');
  return userRole === 'super_admin' || userRole === 'admin';
};

// GET /api/theatres - Get all theatres
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    const admin = searchParams.get('admin') === 'true';
    
    if (admin) {
      // For admin interface, return all theatres with language info
      const theatres = await prisma.theatre.findMany({
        include: {
          images: true,
          tags: true,
          _count: {
            select: {
              events: true
            }
          }
        },
        orderBy: [
          { name: 'asc' },
          { content_language: 'asc' }
        ]
      });

      return NextResponse.json(theatres);
    } else {
      // For public interface, return only theatres for specific language (excluding Acting Europe)
      const theatres = await prisma.theatre.findMany({
        where: {
          content_language: language,
          NOT: {
            name: 'Acting Europe'
          }
        },
        include: {
          images: true,
          tags: true,
          _count: {
            select: {
              events: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      return NextResponse.json(theatres);
    }
  } catch (error) {
    console.error('Error fetching theatres:', error);
    // Fallback 1: Try Supabase if configured
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseAnonKey) {
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || 'en';
        const admin = searchParams.get('admin') === 'true';

        const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

        if (admin) {
          const { data, error: sbError } = await supabase
            .from('theatres')
            .select('*, images:theatre_images(*), tags:theatre_tags(*)')
            .order('name', { ascending: true })
            .order('content_language', { ascending: true })

          if (sbError) throw sbError

          const mapped = (data || []).map((th: any) => ({
            id: th.id,
            name: th.name,
            city: th.city,
            country: th.country,
            description: th.description,
            history: th.history,
            website: th.website,
            founded_year: th.founded_year,
            content_language: th.content_language,
            translation_group: th.translation_group,
            images: Array.isArray(th.images) ? th.images.map((img: any) => ({
              id: img.id,
              image_url: img.image_url,
              caption: img.caption,
              is_primary: !!img.is_primary,
            })) : [],
            tags: Array.isArray(th.tags) ? th.tags.map((tag: any) => ({
              id: tag.id,
              theatre_id: th.id,
              tag_name: tag.tag_name,
              created_at: tag.created_at,
            })) : [],
            _count: { events: 0 },
          }))

          return NextResponse.json(mapped, { status: 200 })
        } else {
          const { data, error: sbError } = await supabase
            .from('theatres')
            .select('*, images:theatre_images(*), tags:theatre_tags(*)')
            .eq('content_language', language)
            .neq('name', 'Acting Europe')
            .order('name', { ascending: true })

          if (sbError) throw sbError

          const mapped = (data || []).map((th: any) => ({
            id: th.id,
            name: th.name,
            city: th.city,
            country: th.country,
            description: th.description,
            history: th.history,
            website: th.website,
            founded_year: th.founded_year,
            content_language: th.content_language,
            translation_group: th.translation_group,
            images: Array.isArray(th.images) ? th.images.map((img: any) => ({
              id: img.id,
              image_url: img.image_url,
              caption: img.caption,
              is_primary: !!img.is_primary,
            })) : [],
            tags: Array.isArray(th.tags) ? th.tags.map((tag: any) => ({
              id: tag.id,
              theatre_id: th.id,
              tag_name: tag.tag_name,
              created_at: tag.created_at,
            })) : [],
            _count: { events: 0 },
          }))

          return NextResponse.json(mapped, { status: 200 })
        }
      }
    } catch (sbFallbackError) {
      console.error('Supabase theatres fallback failed:', sbFallbackError)
    }

    // Fallback 2: Static theatres as last resort
    try {
      const staticTheatres = await getStaticTheatres();
      const mapped = staticTheatres.map((th: any) => ({
        id: th.id,
        name: th.name,
        city: th.city,
        country: th.country,
        description: th.description,
        history: th.history,
        website: th.website,
        founded_year: th.foundedYear,
        images: Array.isArray(th.images)
          ? th.images.map((img: any) => ({
              id: img.id,
              image_url: img.imageUrl,
              caption: img.caption,
              is_primary: img.isPrimary,
            }))
          : [],
        tags: Array.isArray(th.tags)
          ? th.tags.map((tag: string, idx: number) => ({
              id: Number(`${th.id}${idx}`),
              theatre_id: th.id,
              tag_name: tag,
              created_at: new Date().toISOString(),
            }))
          : [],
        _count: { events: 0 },
      }));
      return NextResponse.json(mapped, { status: 200 });
    } catch (fallbackError) {
      console.error('Failed to provide static theatres fallback:', fallbackError);
      return NextResponse.json(
        { error: 'Failed to fetch theatres' },
        { status: 500 }
      );
    }
  }
}

// POST /api/theatres - Create new theatre (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    if (!hasAdminAccess(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      city,
      country,
      description,
      history,
      website,
      founded_year,
      content_language = 'en',
      translation_group,
      images = [],
      tags = []
    } = body;

    // Validate required fields
    if (!name || !city || !country) {
      return NextResponse.json(
        { error: 'Name, city, and country are required' },
        { status: 400 }
      );
    }

    // Check if this is a single language creation (from admin interface)
    if (content_language && translation_group) {
      // Create single theatre for specific language
      const theatre = await prisma.theatre.create({
        data: {
          name,
          city,
          country,
          description,
          history,
          website,
          founded_year: founded_year ? parseInt(founded_year) : undefined,
          content_language,
          translation_group,
          images: {
            create: images.map((img: any) => ({
              image_url: img.image_url,
              caption: img.caption,
              is_primary: img.is_primary || false
            }))
          },
          tags: {
            create: tags.map((tag: any) => ({
              tag_name: tag.tag_name
            }))
          }
        },
        include: {
          images: true,
          tags: true,
          _count: {
            select: {
              events: true
            }
          }
        }
      });

      return NextResponse.json(theatre, { status: 201 });
    } else {
      // Create theatre with translations in all languages (legacy behavior)
      const theatres = await createTheatreWithTranslations(
        name,
        city,
        country,
        description,
        history,
        website,
        founded_year ? parseInt(founded_year) : undefined,
        images,
        tags
      );

      return NextResponse.json(theatres, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating theatre:', error);
    return NextResponse.json(
      { error: 'Failed to create theatre' },
      { status: 500 }
    );
  }
}