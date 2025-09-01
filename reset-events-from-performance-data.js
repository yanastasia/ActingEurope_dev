const { prisma } = require('./lib/prisma');
const { performances } = require('./lib/performance-data.js');
const { v4: uuidv4 } = require('uuid');

// Theatre mappings by language (using actual database IDs)
const theatreMap = {
  'Macedonian National Theatre': {
    en: 187, // Macedonian National Theatre [EN]
    mk: 187, // Macedonian National Theatre [EN] (using same ID for all languages)
    bg: 187, // Macedonian National Theatre [EN] (using same ID for all languages)
    sr: 187  // Macedonian National Theatre [EN] (using same ID for all languages)
  },
  'National Theatre in Niš': {
    en: 188, // National Theatre in Niš [EN]
    mk: 188, // National Theatre in Niš [EN] (using same ID for all languages)
    bg: 188, // National Theatre in Niš [EN] (using same ID for all languages)
    sr: 188  // National Theatre in Niš [EN] (using same ID for all languages)
  },
  '"Ivan Vazov" National Theatre': {
    en: 186,  // "Ivan Vazov" National Theatre [EN]
    mk: 186, // "Ivan Vazov" National Theatre [EN] (using same ID for all languages)
    bg: 186, // "Ivan Vazov" National Theatre [EN] (using same ID for all languages)
    sr: 186  // "Ivan Vazov" National Theatre [EN] (using same ID for all languages)
  },
  'OSAIK "36 Monkeys"': {
  en: 189, // OSAIK "36 Monkeys" [EN]
  mk: 189, // OSAIK "36 Monkeys" [EN] (using same ID for all languages)
  bg: 189, // OSAIK "36 Monkeys" [EN] (using same ID for all languages)
  sr: 189  // OSAIK "36 Monkeys" [EN] (using same ID for all languages)
},
  'Intimate Theatre Bitola': {
    en: 190, // Intimate Theatre Bitola [EN]
    mk: 190, // Intimate Theatre Bitola [EN] (using same ID for all languages)
    bg: 190, // Intimate Theatre Bitola [EN] (using same ID for all languages)
    sr: 190  // Intimate Theatre Bitola [EN] (using same ID for all languages)
  },
  'Drama Theatre "Krum Kyulyavkov"': {
    en: 185, // Drama Theatre Kyustendil [EN]
    mk: 185, // Drama Theatre Kyustendil [EN] (using same ID for all languages)
    bg: 185, // Drama Theatre Kyustendil [EN] (using same ID for all languages)
    sr: 185  // Drama Theatre Kyustendil [EN] (using same ID for all languages)
  }
};

// Translation mappings for titles
const titleTranslations = {
  "No Man's Land": {
    en: "No Man's Land",
    mk: "Ничија земја",
    bg: "Ничия земя",
    sr: "Ничија земља"
  },
  "Don Juan": {
    en: "Don Juan",
    mk: "Дон Жуан",
    bg: "Дон Жуан",
    sr: "Дон Жуан"
  },
  "Oh My God": {
    en: "Oh My God",
    mk: "О, мој Боже",
    bg: "О, Боже мой",
    sr: "О, Боже мој"
  },
  "Aivar or Lutenitsa": {
    en: "Aivar or Lutenitsa",
    mk: "Ајвар или лутеница",
    bg: "Айвар или лютеница",
    sr: "Ајвар или лутеница"
  },
  "Artists in waiting": {
    en: "Artists in waiting",
    mk: "Уметници во чекање",
    bg: "Артисти в очакване",
    sr: "Уметници у чекању"
  },
  "In the Dark": {
    en: "In the Dark",
    mk: "Во темнина",
    bg: "В тъмнината",
    sr: "У мраку"
  }
};

// Translation mappings for synopsis
const synopsisTranslations = {
  1: {
    en: "A psychological drama exploring themes of memory, identity, and the blurred lines between reality and illusion.",
    mk: "Психолошка драма која ги истражува темите на меморијата, идентитетот и замаглените граници меѓу реалноста и илузијата.",
    bg: "Психологическа драма, изследваща темите за паметта, идентичността и размитите граници между реалността и илюзията.",
    sr: "Психолошка драма која истражује теме памћења, идентитета и замагљене границе између стварности и илузије."
  },
  2: {
    en: "A timeless tale of seduction, betrayal, and the consequences of unchecked desire.",
    mk: "Безвременска приказна за заведување, предавство и последиците од неконтролираната желба.",
    bg: "Вечна история за съблазън, предателство и последствията от неконтролираното желание.",
    sr: "Безвремена прича о завођењу, издаји и последицама неконтролисане жеље."
  },
  3: {
    en: "A contemporary comedy that examines faith, doubt, and the search for meaning in modern life.",
    mk: "Современа комедија која ги испитува верата, сомнежот и потрагата по смисла во современиот живот.",
    bg: "Съвременна комедия, която изследва вярата, съмнението и търсенето на смисъл в съвременния живот.",
    sr: "Савремена комедија која испитује веру, сумњу и потрагу за смислом у савременом животу."
  },
  4: {
    en: "A cultural exploration of Balkan traditions through the lens of food and family.",
    mk: "Културно истражување на балканските традиции низ призмата на храната и семејството.",
    bg: "Културно изследване на балканските традиции през призмата на храната и семейството.",
    sr: "Културно истраживање балканских традиција кроз призму хране и породице."
  },
  5: {
    en: "An intimate look at the struggles and aspirations of emerging artists in contemporary society.",
    mk: "Интимен поглед на борбите и аспирациите на младите уметници во современото општество.",
    bg: "Интимен поглед към борбите и стремежите на начинаещите артисти в съвременното общество.",
    sr: "Интиман поглед на борбе и тежње младих уметника у савременом друштву."
  },
  6: {
    en: "A haunting exploration of isolation, fear, and the human condition when stripped of all pretense.",
    mk: "Опседнувачко истражување на изолацијата, стравот и човечката состојба кога е лишена од сите претенции.",
    bg: "Преследващо изследване на изолацията, страха и човешкото състояние, когато е лишено от всякакви претенции.",
    sr: "Узнемирујуће истраживање изолације, страха и људског стања када је лишено свих претензија."
  }
};

// Function to get theatre ID based on performance company and language
function getTheatreId(company, language) {
  // Use the first company name to determine theatre
  const companyName = Array.isArray(company) ? company[0] : company;
  
  // Map company names to theatre keys
  const companyToTheatreMap = {
    'Macedonian National Theatre': 'Macedonian National Theatre',
    'National Theatre in Niš': 'National Theatre in Niš',
    '"Ivan Vazov" National Theatre': '"Ivan Vazov" National Theatre',
    'OSAIK "36 Monkeys"': 'OSAIK "36 Monkeys"',
    'Intimate Theatre Bitola': 'Intimate Theatre Bitola',
    'Drama Theatre "Krum Kyulyavkov"': 'Drama Theatre "Krum Kyulyavkov"'
  };
  
  const theatreKey = companyToTheatreMap[companyName] || 'Macedonian National Theatre';
  return theatreMap[theatreKey]?.[language] || theatreMap['Macedonian National Theatre'][language];
}

// Function to get company names based on performance and language
function getCompanyNames(performance, language) {
  if (performance.company && performance.company.length > 0) {
    // For performances, return the original company names
    return performance.company;
  }
  return ['ActingEurope']; // Default for workshops/discussions
}

// Add venue mapping after theatreMap
const venueMap = {
  'Main Stage': 10,
  'Chamber Stage': 11
};

// Function to get venue ID from venue name
function getVenueId(venueName) {
  return venueMap[venueName] || 8; // Default to Main Stage if not found
}

async function resetEventsFromPerformanceData() {
  try {
    console.log('🔄 Resetting events from performance data...');
    
    // Clear existing events
    console.log('🗑️  Clearing existing events...');
    await prisma.event.deleteMany({});
    console.log('✅ Existing events cleared');
    
    // Process each performance
    for (const performance of performances) {
      console.log(`\n📝 Processing: ${performance.title}`);
      
      // Generate a single translation group ID for this performance
      const translationGroupId = uuidv4();
      console.log(`🔗 Translation Group: ${translationGroupId}`);
      
      // Create events for each language
      const languages = [
        { code: 'en', name: 'English' },
        { code: 'mk', name: 'Macedonian' },
        { code: 'bg', name: 'Bulgarian' },
        { code: 'sr', name: 'Serbian' }
      ];
      
      for (const { code: langCode, name: language } of languages) {
        // Get translated title
        const translatedTitle = titleTranslations[performance.title]?.[langCode] || performance.title;
        
        // Get theatre ID for this language
        const theatreId = getTheatreId(performance.company, langCode);
        
        // Get company names
        const companyNames = getCompanyNames(performance, langCode);
        
        // Get translated synopsis
        const translatedSynopsis = synopsisTranslations[performance.id]?.[langCode] || performance.synopsis;
        
        // Parse date and time
        const [day, month, year] = performance.date.split('-');
        const eventDate = new Date(`${year}-${month}-${day}`);
        
        const [hours, minutes] = performance.time.split(':');
        const eventTime = new Date();
        eventTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const eventData = {
          title: translatedTitle,
          company: companyNames,
          director: performance.director,
          cast: performance.cast,
          event_date: eventDate,
          event_time: eventTime,
          venue_id: getVenueId(performance.venue), // Use proper venue mapping
          price: 25.00,
          image_url: performance.imageUrl,
          poster_url: performance.posterUrl,
          genre: performance.genre,
          content_language: langCode,
          duration: performance.duration,
          synopsis: translatedSynopsis,
          subtitles: performance.subtitles,
          theatre_id: theatreId,
          translation_group: translationGroupId,
          event_type: 'performance'
        };
        
        console.log(`  Creating ${language} version (${langCode}) - Theatre ID: ${theatreId}, Venue ID: ${getVenueId(performance.venue)}`);
        
        await prisma.event.create({
          data: eventData
        });
      }
    }
    
    // Verify the results
    console.log('\n🔍 Verifying results...');
    const totalEvents = await prisma.event.count();
    const translationGroups = await prisma.event.groupBy({
      by: ['translation_group'],
      _count: {
        id: true
      }
    });
    
    console.log(`✅ Total events created: ${totalEvents}`);
    console.log(`✅ Translation groups: ${translationGroups.length}`);
    console.log('✅ Events per group:');
    translationGroups.forEach(group => {
      console.log(`   ${group.translation_group}: ${group._count.id} events`);
    });
    
  } catch (error) {
    console.error('❌ Error resetting events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetEventsFromPerformanceData();