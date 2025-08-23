import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createTheatreWithTranslations } from '../../../lib/database-operations';

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
      // For public interface, return only theatres for specific language
      const theatres = await prisma.theatre.findMany({
        where: {
          content_language: language
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
    return NextResponse.json(
      { error: 'Failed to fetch theatres' },
      { status: 500 }
    );
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