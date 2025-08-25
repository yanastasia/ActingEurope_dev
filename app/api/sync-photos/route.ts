import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Helper function to check admin access
const hasAdminAccess = (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.substring(7);
  return token === 'super_admin' || token === 'admin';
};

export async function POST(request: NextRequest) {
  try {
    // Check admin access
    if (!hasAdminAccess(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting theatre photos synchronization...');
    
    // Get all theatres with their images
    const theatres = await prisma.theatre.findMany({
      include: {
        images: true
      }
    });
    
    console.log(`📊 Found ${theatres.length} theatres to process`);
    
    let updatedCount = 0;
    const results = [];
    
    for (const theatre of theatres) {
      // Extract image URLs from theatre_images
      const imageUrls = theatre.images.map(img => img.image_url);
      
      // Only update if there are images and photos array is different
      if (imageUrls.length > 0) {
        const currentPhotos = theatre.photos || [];
        
        // Check if photos array needs updating
        const needsUpdate = 
          currentPhotos.length !== imageUrls.length ||
          !imageUrls.every(url => currentPhotos.includes(url));
        
        if (needsUpdate) {
          await prisma.theatre.update({
            where: { id: theatre.id },
            data: {
              photos: imageUrls
            }
          });
          
          console.log(`✅ Updated theatre "${theatre.name}" with ${imageUrls.length} photos`);
          updatedCount++;
          results.push({
            id: theatre.id,
            name: theatre.name,
            action: 'updated',
            photosCount: imageUrls.length
          });
        } else {
          console.log(`⏭️  Theatre "${theatre.name}" already has correct photos`);
          results.push({
            id: theatre.id,
            name: theatre.name,
            action: 'skipped',
            photosCount: imageUrls.length
          });
        }
      } else {
        console.log(`ℹ️  Theatre "${theatre.name}" has no images`);
        results.push({
          id: theatre.id,
          name: theatre.name,
          action: 'no_images',
          photosCount: 0
        });
      }
    }
    
    console.log(`\n🎉 Synchronization complete! Updated ${updatedCount} theatres.`);
    
    // Get summary
    const summary = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        photos: true,
        _count: {
          select: {
            images: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      message: `Synchronization complete! Updated ${updatedCount} theatres.`,
      updatedCount,
      totalTheatres: theatres.length,
      results,
      summary: summary.map(theatre => ({
        id: theatre.id,
        name: theatre.name,
        photosCount: theatre.photos?.length || 0,
        imagesCount: theatre._count.images
      }))
    });
    
  } catch (error) {
    console.error('❌ Error syncing theatre photos:', error);
    return NextResponse.json(
      { error: 'Failed to sync theatre photos', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin access
    if (!hasAdminAccess(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current status of photos vs images
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        photos: true,
        _count: {
          select: {
            images: true
          }
        }
      }
    });
    
    const status = theatres.map(theatre => ({
      id: theatre.id,
      name: theatre.name,
      photosCount: theatre.photos?.length || 0,
      imagesCount: theatre._count.images,
      needsSync: (theatre.photos?.length || 0) !== theatre._count.images
    }));
    
    const needsSyncCount = status.filter(t => t.needsSync).length;
    
    return NextResponse.json({
      success: true,
      totalTheatres: theatres.length,
      needsSyncCount,
      status
    });
    
  } catch (error) {
    console.error('❌ Error checking sync status:', error);
    return NextResponse.json(
      { error: 'Failed to check sync status', details: error.message },
      { status: 500 }
    );
  }
}