const { prisma } = require('../lib/prisma')

async function fixDuplicateEvents() {
  console.log('Fixing duplicate events in translation groups...')
  
  try {
    // Get all events grouped by translation group and language
    const events = await prisma.event.findMany({
      where: {
        translation_group: {
          not: null
        }
      },
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' },
        { id: 'asc' }
      ]
    })
    
    console.log(`Found ${events.length} events with translation groups`)
    
    // Group events by translation group and language
    const groupedEvents = {}
    
    events.forEach(event => {
      const key = `${event.translation_group}_${event.content_language}`
      if (!groupedEvents[key]) {
        groupedEvents[key] = []
      }
      groupedEvents[key].push(event)
    })
    
    let deletedCount = 0
    
    // For each group-language combination, keep only the first event and delete duplicates
    for (const [key, eventList] of Object.entries(groupedEvents)) {
      if (eventList.length > 1) {
        console.log(`Found ${eventList.length} duplicates for ${key}`)
        
        // Keep the first event (usually the original), delete the rest
        const toDelete = eventList.slice(1)
        
        for (const event of toDelete) {
          console.log(`Deleting duplicate: ${event.title} (ID: ${event.id})`)
          await prisma.event.delete({
            where: { id: event.id }
          })
          deletedCount++
        }
      }
    }
    
    console.log(`\nDeleted ${deletedCount} duplicate events`)
    
    // Verify the cleanup
    const remainingEvents = await prisma.event.findMany({
      where: {
        translation_group: {
          not: null
        }
      },
      select: {
        id: true,
        title: true,
        content_language: true,
        translation_group: true
      },
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' }
      ]
    })
    
    console.log(`\nRemaining events: ${remainingEvents.length}`)
    
    // Group by translation group to verify
    const groups = {}
    remainingEvents.forEach(event => {
      if (!groups[event.translation_group]) {
        groups[event.translation_group] = []
      }
      groups[event.translation_group].push(event)
    })
    
    console.log(`\nVerification - Translation groups after cleanup:`)
    Object.entries(groups).forEach(([groupId, groupEvents]) => {
      console.log(`Group: ${groupId}`)
      groupEvents.forEach(event => {
        console.log(`  - ${event.content_language}: ${event.title} (ID: ${event.id})`)
      })
    })
    
  } catch (error) {
    console.error('Error fixing duplicate events:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixDuplicateEvents()