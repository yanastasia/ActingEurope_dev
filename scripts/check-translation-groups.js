const { prisma } = require('../lib/prisma')

async function checkTranslationGroups() {
  console.log('Checking translation groups in events...')
  
  try {
    // Get all events with their translation groups
    const events = await prisma.event.findMany({
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
    
    console.log(`\nTotal events: ${events.length}`)
    
    // Group by translation group
    const groups = {}
    const orphaned = []
    
    events.forEach(event => {
      if (event.translation_group) {
        if (!groups[event.translation_group]) {
          groups[event.translation_group] = []
        }
        groups[event.translation_group].push(event)
      } else {
        orphaned.push(event)
      }
    })
    
    console.log(`\nTranslation groups: ${Object.keys(groups).length}`)
    console.log(`Orphaned events: ${orphaned.length}`)
    
    // Show each translation group
    Object.entries(groups).forEach(([groupId, groupEvents]) => {
      console.log(`\nGroup: ${groupId}`)
      groupEvents.forEach(event => {
        console.log(`  - ${event.content_language}: ${event.title} (ID: ${event.id})`)
      })
    })
    
    // Show orphaned events
    if (orphaned.length > 0) {
      console.log('\nOrphaned events (no translation group):')
      orphaned.forEach(event => {
        console.log(`  - ${event.content_language}: ${event.title} (ID: ${event.id})`)
      })
    }
    
  } catch (error) {
    console.error('Error checking translation groups:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTranslationGroups()