import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    const venue = await prisma.venue.findUnique({
      where: { id: parseInt(id) },
      include: {
        sections: {
          include: {
            seats: {
              orderBy: [
                { row_number: 'asc' },
                { seat_number: 'asc' }
              ]
            }
          },
          orderBy: {
            section_name: 'asc'
          }
        }
      }
    })

    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
    }

    // Transform the data to match the expected format
    const transformedVenue = {
      id: venue.id.toString(),
      name: venue.name,
      description: venue.description,
      capacity: venue.capacity,
      sections: venue.sections.map(section => ({
        id: section.id.toString(),
        sectionName: section.section_name,
        sectionType: section.section_type,
        rows: groupSeatsByRow(section.seats)
      }))
    }

    return NextResponse.json(transformedVenue)
  } catch (error) {
    console.error('Error fetching venue:', error)
    return NextResponse.json({ error: 'Failed to fetch venue' }, { status: 500 })
  }
}

// Helper function to group seats by row
interface SeatData {
  id: number;
  row_number: number;
  seat_number: number;
  is_accessible: boolean;
}

function groupSeatsByRow(seats: SeatData[]) {
  const rowMap = new Map()
  
  seats.forEach(seat => {
    if (!rowMap.has(seat.row_number)) {
      rowMap.set(seat.row_number, {
        rowNumber: seat.row_number,
        seats: []
      })
    }
    
    rowMap.get(seat.row_number).seats.push({
      id: seat.id,
      seatNumber: seat.seat_number,
      isAccessible: seat.is_accessible
    })
  })
  
  return Array.from(rowMap.values()).sort((a, b) => a.rowNumber - b.rowNumber)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let name, capacity, description, imageUrl, sections, rows
  
  try {
    const body = await request.json()
    console.log('PUT venue body:', JSON.stringify(body, null, 2))
    ;({
      name,
      capacity,
      description,
      imageUrl,
      sections,
      rows // backward compatibility
    } = body)

    // Update the venue
    const venue = await prisma.venue.update({
      where: { id: parseInt(id) },
      data: {
        name,
        capacity: parseInt(capacity) || 0,
        description,
        image_url: imageUrl
      }
    })

    // Handle sections update if provided
    if (sections && Array.isArray(sections) && sections.length > 0) {
      try {
        // Delete existing sections and seats for this venue
        await prisma.seat.deleteMany({
          where: {
            venueSection: {
              venue_id: parseInt(id)
            }
          }
        })
        
        await prisma.venueSection.deleteMany({
          where: { venue_id: parseInt(id) }
        })

        // Create new sections and seats
        for (const sectionData of sections) {
          if (!sectionData.sectionName || !sectionData.sectionType) {
            console.warn('Skipping section with missing name or type:', sectionData)
            continue
          }

          const section = await prisma.venueSection.create({
            data: {
              venue_id: parseInt(id),
              section_name: sectionData.sectionName,
              section_type: sectionData.sectionType
            }
          })

          // Create seats for each row in this section
          if (sectionData.rows && Array.isArray(sectionData.rows)) {
            for (const row of sectionData.rows) {
              if (row.seats && Array.isArray(row.seats)) {
                for (const seat of row.seats) {
                  await prisma.seat.create({
                    data: {
                      venue_section_id: section.id,
                      row_number: row.rowNumber,
                      seat_number: seat.seatNumber,
                      is_accessible: seat.isAccessible || false
                    }
                  })
                }
              }
            }
          }
        }
      } catch (sectionError) {
        console.error('Error updating venue sections:', sectionError)
        throw new Error('Failed to update venue sections')
      }
    }

    return NextResponse.json({ success: true, id: venue.id })
  } catch (error) {
    console.error('Error updating venue:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      venueId: id,
      requestBody: { name, capacity, description, imageUrl, sections, rows }
    })
    return NextResponse.json({ 
      error: 'Failed to update venue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Delete the venue
    await prisma.venue.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting venue:', error)
    return NextResponse.json({ error: 'Failed to delete venue' }, { status: 500 })
  }
}