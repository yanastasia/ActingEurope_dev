import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// Helper function to check if the request is from an admin
const hasAdminAccess = (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return false;
  }
  const userRole = authHeader.replace('Bearer ', '');
  return userRole === 'super_admin' || userRole === 'admin';
};

// GET /api/theatres/[id] - Get single theatre
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const theatreId = parseInt(params.id);
    
    if (isNaN(theatreId)) {
      return NextResponse.json(
        { error: 'Invalid theatre ID' },
        { status: 400 }
      );
    }

    const theatre = await prisma.theatre.findUnique({
      where: {
        id: theatreId
      },
      include: {
        images: true,
        tags: true,
        events: {
          select: {
            id: true,
            title: true,
            event_date: true,
            event_type: true
          }
        }
      }
    });

    if (!theatre) {
      return NextResponse.json(
        { error: 'Theatre not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(theatre);
  } catch (error) {
    console.error('Error fetching theatre:', error);
    return NextResponse.json(
      { error: 'Failed to fetch theatre' },
      { status: 500 }
    );
  }
}

// PUT /api/theatres/[id] - Update theatre (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authorization
    if (!hasAdminAccess(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const theatreId = parseInt(params.id);
    
    if (isNaN(theatreId)) {
      return NextResponse.json(
        { error: 'Invalid theatre ID' },
        { status: 400 }
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
      content_language,
      translation_group,
      images = [],
      tags = []
    } = body;

    // Check if theatre exists
    const existingTheatre = await prisma.theatre.findUnique({
      where: { id: theatreId }
    });

    if (!existingTheatre) {
      return NextResponse.json(
        { error: 'Theatre not found' },
        { status: 404 }
      );
    }

    // Update theatre with transaction to handle related data
    const updatedTheatre = await prisma.$transaction(async (tx) => {
      // Delete existing images and tags
      await tx.theatreImage.deleteMany({
        where: { theatre_id: theatreId }
      });
      
      await tx.theatreTag.deleteMany({
        where: { theatre_id: theatreId }
      });

      // Update theatre with new data
      return await tx.theatre.update({
        where: { id: theatreId },
        data: {
          name,
          city,
          country,
          description,
          history,
          website,
          founded_year: founded_year ? parseInt(founded_year) : null,
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
            create: tags.map((tag: string) => ({
              tag_name: tag
            }))
          }
        },
        include: {
          images: true,
          tags: true
        }
      });
    });

    return NextResponse.json(updatedTheatre);
  } catch (error) {
    console.error('Error updating theatre:', error);
    return NextResponse.json(
      { error: 'Failed to update theatre' },
      { status: 500 }
    );
  }
}

// DELETE /api/theatres/[id] - Delete theatre (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authorization
    if (!hasAdminAccess(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const theatreId = parseInt(params.id);
    
    if (isNaN(theatreId)) {
      return NextResponse.json(
        { error: 'Invalid theatre ID' },
        { status: 400 }
      );
    }

    // Check if theatre exists
    const existingTheatre = await prisma.theatre.findUnique({
      where: { id: theatreId },
      include: {
        events: true
      }
    });

    if (!existingTheatre) {
      return NextResponse.json(
        { error: 'Theatre not found' },
        { status: 404 }
      );
    }

    // Check if theatre has associated events
    if (existingTheatre.events.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete theatre with associated events. Please delete or reassign events first.' },
        { status: 400 }
      );
    }

    // Delete theatre (cascade will handle images and tags)
    await prisma.theatre.delete({
      where: { id: theatreId }
    });

    return NextResponse.json(
      { message: 'Theatre deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting theatre:', error);
    return NextResponse.json(
      { error: 'Failed to delete theatre' },
      { status: 500 }
    );
  }
}