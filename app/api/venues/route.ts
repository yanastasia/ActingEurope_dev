import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getVenues } from '@/lib/database'

export async function GET() {
  try {
    const venues = await prisma.venue.findMany({
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
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Transform the data to match the expected format
    const transformedVenues = venues.map((venue: any) => ({
      id: venue.id.toString(),
      name: venue.name,
      description: venue.description,
      capacity: venue.capacity,
      sections: venue.sections.map((section: any) => ({
        id: section.id.toString(),
        sectionName: section.section_name,
        sectionType: section.section_type,
        rows: groupSeatsByRow(section.seats)
      }))
    }))

    return NextResponse.json(transformedVenues)
  } catch (error) {
    console.error('Error fetching venues from database:', error)
    
    // Check if it's a database connection error
    if (error instanceof Error && 
        (error.message.includes('Request Unit limit') || 
         error.message.includes('database connections opened') ||
         error.name === 'PrismaClientInitializationError')) {
      
      console.log('Database unavailable, using static venue data as fallback');
      
      // Fallback: return static venue data
      try {
        const staticVenues = await getVenues();
        
        // Transform static venues to match the expected API format
        const transformedVenues = staticVenues.map((venue: any) => ({
          id: venue.id.toString(),
          name: venue.name,
          description: venue.description,
          capacity: venue.capacity,
          sections: venue.sections.map((section: any) => ({
            id: section.id.toString(),
            sectionName: section.sectionName,
            sectionType: section.sectionType,
            rows: groupSeatsByRows(section.seats)
          }))
        }));
        
        return NextResponse.json(transformedVenues);
      } catch (fallbackError) {
        console.error('Error with static venue fallback:', fallbackError);
        return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 })
  }
}

// Helper function to group seats by row (for database data)
function groupSeatsByRow(seats: any[]) {
  const rowMap = new Map<number, { rowNumber: number; seats: any[] }>()
  
  seats.forEach((seat: any) => {
    if (!rowMap.has(seat.row_number)) {
      rowMap.set(seat.row_number, {
        rowNumber: seat.row_number,
        seats: []
      })
    }
    
    rowMap.get(seat.row_number)!.seats.push({
      seatNumber: seat.seat_number,
      isAccessible: seat.is_accessible
    })
  })
  
  return Array.from(rowMap.values()).sort((a, b) => a.rowNumber - b.rowNumber)
}

// Helper function to group seats by rows (for static data)
function groupSeatsByRows(seats: any[]) {
  const rowMap = new Map<number, { rowNumber: number; seats: any[] }>()
  
  seats.forEach((seat: any) => {
    if (!rowMap.has(seat.rowNumber)) {
      rowMap.set(seat.rowNumber, {
        rowNumber: seat.rowNumber,
        seats: []
      })
    }
    
    rowMap.get(seat.rowNumber)!.seats.push({
      seatNumber: seat.seatNumber,
      isAccessible: false // Static data doesn't have accessibility info
    })
  })
  
  return Array.from(rowMap.values()).sort((a, b) => a.rowNumber - b.rowNumber)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      capacity,
      description,
      imageUrl,
      sections,
      rows // backward compatibility
    } = body

    // Check for duplicate venue names
    const existingVenue = await prisma.venue.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })

    if (existingVenue) {
      return NextResponse.json(
        { error: 'A venue with this name already exists' },
        { status: 400 }
      )
    }

    // Create the venue
    const venue = await prisma.venue.create({
      data: {
        name,
        capacity: parseInt(capacity) || 0,
        description,
        image_url: imageUrl
      }
    })

    // Handle sections structure (new format)
    if (sections && Array.isArray(sections)) {
      for (const sectionData of sections) {
        const section = await prisma.venueSection.create({
          data: {
            venue_id: venue.id,
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
    }
    // Handle old rows structure (backward compatibility)
    else if (rows && Array.isArray(rows)) {
      // Create a default section for this venue
      const section = await prisma.venueSection.create({
        data: {
          venue_id: venue.id,
          section_name: 'Main',
          section_type: 'regular'
        }
      })

      // Create seats for each row
      for (const row of rows) {
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

    return NextResponse.json({ success: true, id: venue.id })
  } catch (error) {
    console.error('Error creating venue:', error)
    return NextResponse.json({ error: 'Failed to create venue' }, { status: 500 })
  }
}