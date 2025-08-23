const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid')

const prisma = new PrismaClient()

/**
 * Migration script to add translation groups to existing events
 * and create language copies for multilingual support
 */
async function migrateEventsToMultilingual() {
  console.log('Starting events multilingual migration...')
  
  try {
    // Get all existing events that don't have translation groups
    const existingEvents = await prisma.event.findMany({
      where: {
        translation_group: null
      }
    })
    
    console.log(`Found ${existingEvents.length} events to migrate`)
    
    for (const event of existingEvents) {
      console.log(`Migrating event: ${event.title} (ID: ${event.id})`)
      
      // Generate a unique translation group ID
      const translationGroup = uuidv4()
      
      // Update the original event with translation group and set content language
      await prisma.event.update({
        where: { id: event.id },
        data: {
          translation_group: translationGroup,
          content_language: event.content_language || 'en' // Default to English if not set
        }
      })
      
      // Create language versions for other supported languages
      const supportedLanguages = ['bg', 'mk', 'sr']
      const originalLanguage = event.content_language || 'en'
      
      for (const lang of supportedLanguages) {
        if (lang !== originalLanguage) {
          // Create a copy of the event in the target language
          await prisma.event.create({
            data: {
              title: `${event.title} (${lang.toUpperCase()})`, // Temporary title, should be translated
              description: event.description,
              event_type: event.event_type,
              event_date: event.event_date,
              event_time: event.event_time,
              price: event.price,
              image_url: event.image_url,
              poster_url: event.poster_url,
              language: event.language,
              content_language: lang,
              translation_group: translationGroup,
              genre: event.genre,
              company: event.company,
              director: event.director,
              cast: event.cast,
              synopsis: event.synopsis,
              subtitles: event.subtitles,
              duration: event.duration,
              is_featured: event.is_featured,
              theatre_id: event.theatre_id,
              venue_id: event.venue_id
            }
          })
          
          console.log(`  Created ${lang} version`)
        }
      }
    }
    
    console.log('Migration completed successfully!')
    
    // Verify the migration
    const totalEvents = await prisma.event.count()
    const eventsWithTranslationGroups = await prisma.event.count({
      where: {
        translation_group: {
          not: null
        }
      }
    })
    
    console.log(`\nMigration Summary:`)
    console.log(`Total events: ${totalEvents}`)
    console.log(`Events with translation groups: ${eventsWithTranslationGroups}`)
    
    // Show translation groups
    const translationGroups = await prisma.event.groupBy({
      by: ['translation_group'],
      where: {
        translation_group: {
          not: null
        }
      },
      _count: {
        translation_group: true
      }
    })
    
    console.log(`\nTranslation groups created: ${translationGroups.length}`)
    translationGroups.forEach((group, index) => {
      console.log(`  Group ${index + 1}: ${group._count.translation_group} events`)
    })
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Rollback function to remove translation groups and language copies
 */
async function rollbackMigration() {
  console.log('Starting migration rollback...')
  
  try {
    // Delete all events that are language copies (not the original)
    const deletedEvents = await prisma.event.deleteMany({
      where: {
        AND: [
          { translation_group: { not: null } },
          { title: { contains: '(' } } // Assuming language copies have (LANG) in title
        ]
      }
    })
    
    console.log(`Deleted ${deletedEvents.count} language copy events`)
    
    // Remove translation groups from original events
    const updatedEvents = await prisma.event.updateMany({
      where: {
        translation_group: { not: null }
      },
      data: {
        translation_group: null
      }
    })
    
    console.log(`Removed translation groups from ${updatedEvents.count} events`)
    console.log('Rollback completed successfully!')
    
  } catch (error) {
    console.error('Rollback failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2]
  
  if (command === 'rollback') {
    rollbackMigration()
      .then(() => process.exit(0))
      .catch(() => process.exit(1))
  } else {
    migrateEventsToMultilingual()
      .then(() => process.exit(0))
      .catch(() => process.exit(1))
  }
}

module.exports = {
  migrateEventsToMultilingual,
  rollbackMigration
}