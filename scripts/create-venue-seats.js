const { PrismaClient } = require('../lib/prisma-client');

const prisma = new PrismaClient();

async function createVenueSeats() {
  try {
    console.log('Creating venue sections and seats...');
    
    // Get existing venues
    const venues = await prisma.venue.findMany();
    console.log(`Found ${venues.length} venues`);
    
    for (const venue of venues) {
      console.log(`\nProcessing venue: ${venue.name} (ID: ${venue.id})`);
      
      // Clear existing sections and seats for this venue
      console.log(`  Clearing existing sections for ${venue.name}...`);
      await prisma.seat.deleteMany({
        where: {
          venueSection: {
            venue_id: venue.id
          }
        }
      });
      await prisma.venueSection.deleteMany({
        where: {
          venue_id: venue.id
        }
      });
      
      // Create sections for each venue based on venue type
      let sections = [];
      
      if (venue.name === 'Main Stage') {
        sections = [
          {
            section_name: 'Regular',
            section_type: 'regular',
            rows: 15,
            seatsPerRow: 20
          },
          {
            section_name: 'Balcony',
            section_type: 'balcony',
            rows: 8,
            seatsPerRow: 16
          }
        ];
      } else if (venue.name === 'Chamber Stage') {
        sections = [
          {
            section_name: 'Regular',
            section_type: 'regular',
            rows: 10,
            seatsPerRow: 10
          }
        ];
      }
      
      for (const sectionData of sections) {
        console.log(`  Creating section: ${sectionData.section_name}`);
        
        // Create the section
        const section = await prisma.venueSection.create({
          data: {
            venue_id: venue.id,
            section_name: sectionData.section_name,
            section_type: sectionData.section_type
          }
        });
        
        console.log(`    Section created with ID: ${section.id}`);
        
        // Create seats for this section
        const seats = [];
        for (let row = 1; row <= sectionData.rows; row++) {
          for (let seat = 1; seat <= sectionData.seatsPerRow; seat++) {
            seats.push({
              venue_section_id: section.id,
              row_number: row,
              seat_number: seat,
              is_available: true,
              is_accessible: row === 1 && seat <= 2 // First 2 seats in row 1 are accessible
            });
          }
        }
        
        // Batch create seats
        await prisma.seat.createMany({
          data: seats
        });
        
        console.log(`    Created ${seats.length} seats (${sectionData.rows} rows x ${sectionData.seatsPerRow} seats)`);
      }
    }
    
    console.log('\nVenue sections and seats created successfully!');
    
    // Verify the creation
    const venuesWithSeats = await prisma.venue.findMany({
      include: {
        sections: {
          include: {
            seats: true
          }
        }
      }
    });
    
    console.log('\nVerification:');
    for (const venue of venuesWithSeats) {
      console.log(`${venue.name}: ${venue.sections.length} sections`);
      for (const section of venue.sections) {
        console.log(`  ${section.section_name}: ${section.seats.length} seats`);
      }
    }
    
  } catch (error) {
    console.error('Error creating venue seats:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createVenueSeats();