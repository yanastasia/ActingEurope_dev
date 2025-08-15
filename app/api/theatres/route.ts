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

    // Create theatre with translations in all languages
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
  } catch (error) {
    console.error('Error creating theatre:', error);
    return NextResponse.json(
      { error: 'Failed to create theatre' },
      { status: 500 }
    );
  }
}