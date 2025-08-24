const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkEventsTable() {
  try {
    console.log('🔍 Checking events table...');
    
    // Count total events
    const eventCount = await prisma.event.count();
    console.log(`📊 Total events in database: ${eventCount}`);
    
    if (eventCount > 0) {
      // Get first few events
      const sampleEvents = await prisma.event.findMany({
        take: 5,
        include: {
          theatre: {
            select: {
              name: true,
              city: true
            }
          }
        }
      });
      
      console.log('\n📋 Sample events:');
      sampleEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title} at ${event.theatre?.name || 'Unknown Theatre'} (${event.theatre?.city || 'Unknown City'})`);
        console.log(`   Date: ${event.date}, Language: ${event.language}`);
      });
    } else {
      console.log('❌ Events table is empty!');
      
      // Check if we have any performance data files
      const fs = require('fs');
      const path = require('path');
      
      const performanceDataPath = path.join(__dirname, 'lib', 'performance-data.js');
      const eventsJsonPath = path.join(__dirname, 'events.json');
      
      console.log('\n🔍 Checking for backup data files...');
      
      if (fs.existsSync(performanceDataPath)) {
        console.log('✅ Found performance-data.js file');
      } else {
        console.log('❌ No performance-data.js file found');
      }
      
      if (fs.existsSync(eventsJsonPath)) {
        console.log('✅ Found events.json file');
        const eventsData = JSON.parse(fs.readFileSync(eventsJsonPath, 'utf8'));
        console.log(`📊 Events in JSON file: ${eventsData.length}`);
      } else {
        console.log('❌ No events.json file found');
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking events table:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkEventsTable();