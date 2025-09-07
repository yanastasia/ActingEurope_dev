// Performance data now comes from Supabase database
import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

// Multilingual theatre data
const multilingualTheatres = [
  {
    name: 'Drama Theatre Kyustendil',
    city: 'Kyustendil',
    country: 'Bulgaria',
    foundedYear: 1952,
    website: 'https://dramatheatre-kyustendil.bg',
    translations: {
      en: {
        description: 'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
        history: 'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. Over the decades, it has maintained its reputation for artistic excellence and community engagement.'
      },
      bg: {
        description: 'Известен регионален театър, познат с иновативните си постановки и отдадеността към българското драматично изкуство.',
        history: 'Основан в средата на 20-ти век, театърът е културен краеъгълен камък на Кюстендил, представящ както класически, така и съвременни произведения, докато отглежда местни таланти. През десетилетията той запазва репутацията си за артистично съвършенство и обществена ангажираност.'
      },
      mk: {
        description: 'Истакнат регионален театар познат по своите иновативни продукции и посветеност на бугарската драмска уметност.',
        history: 'Основан во средината на 20-тиот век, театарот е културен краеугаолен камен на Кјустендил, презентирајќи и класични и современи дела додека негува локални таленти. Низ децениите тој ја одржува својата репутација за уметничко совршенство и општествена ангажираност.'
      },
      sr: {
        description: 'Истакнути регионални позориште познато по својим иновативним продукцијама и посвећености бугарској драмској уметности.',
        history: 'Основано средином 20. века, позориште је културни камен темељац Кјустендила, представљајући и класична и савремена дела док негује локалне таленте. Кроз деценије је задржало своју репутацију за уметничко савршенство и друштвену ангажованост.'
      }
    },
    images: [
      { imageUrl: '/kyustendil.jpg', caption: 'Theatre exterior', isPrimary: true },
      { imageUrl: '/placeholder.svg?height=300&width=400&text=Theatre+Interior', caption: 'Main auditorium', isPrimary: false }
    ],
    tags: ['Regional Theatre', 'Bulgarian Drama', 'Contemporary Works', 'Community Theatre']
  },
  {
    name: '"Ivan Vazov" National Theatre',
    city: 'Sofia',
    country: 'Bulgaria',
    foundedYear: 1904,
    website: 'https://nationaltheatre.bg',
    translations: {
      en: {
        description: "Bulgaria's oldest and most prestigious theatre, serving as the national stage for dramatic arts.",
        history: 'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity.'
      },
      bg: {
        description: 'Най-старият и най-престижен театър в България, служещ като национална сцена за драматично изкуство.',
        history: 'Основан през 1904 г., Народният театър "Иван Вазов" е наименуван на българския национален поет Иван Вазов. Той е водещата сцена за български театър, домакин на легендарни представления и международни сътрудничества. Самата театрална сграда е архитектурен шедьовър и символ на българската културна идентичност.'
      },
      mk: {
        description: 'Најстариот и најпрестижен театар во Бугарија, служејќи како национална сцена за драмска уметност.',
        history: 'Основан во 1904 година, Народниот театар "Иван Вазов" е именуван по бугарскиот национален поет Иван Вазов. Тој е водечката сцена за бугарски театар, домаќин на легендарни претстави и меѓународни соработки. Самата театарска зграда е архитектонско ремек-дело и симбол на бугарскиот културен идентитет.'
      },
      sr: {
        description: 'Најстарије и најпрестижније позориште у Бугарској, које служи као национална сцена за драмску уметност.',
        history: 'Основано 1904. године, Народно позориште "Иван Вазов" названо је по бугарском националном песнику Ивану Вазову. То је водећа сцена за бугарско позориште, домаћин легендарних представа и међународних сарадњи. Сама позоришна зграда је архитектонско ремек-дело и симбол бугарског културног идентитета.'
      }
    },
    images: [
      { imageUrl: '/sofija.jpg', caption: 'Theatre exterior', isPrimary: true },
      { imageUrl: '/placeholder.svg?height=300&width=400&text=Grand+Hall', caption: 'Grand auditorium', isPrimary: false }
    ],
    tags: ['National Theatre', 'Classical Drama', 'Bulgarian Heritage', 'Historic Venue']
  },
  {
    name: 'Macedonian National Theatre',
    city: 'Skopje',
    country: 'North Macedonia',
    foundedYear: 1947,
    website: 'https://mnt.mk',
    translations: {
      en: {
        description: 'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
        history: 'Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.'
      },
      bg: {
        description: 'Водещата театрална институция на Северна Македония, представяща богатото културно наследство на региона.',
        history: 'Основан през 1947 г. като водещ театър на Северна Македония, той е играл ключова роля в развитието и запазването на македонските театрални традиции, като същевременно приема международни сътрудничества. Театърът е символ на македонската културна идентичност и артистично постижение.'
      },
      mk: {
        description: 'Водечката театарска институција на Северна Македонија, прикажувајќи го богатото културно наследство на регионот.',
        history: 'Основан во 1947 година како премиерски театар на Северна Македонија, тој беше инструментален во развивањето и зачувувањето на македонските театарски традиции додека ги прифаќа меѓународните соработки. Театарот е симбол на македонскиот културен идентитет и уметничко достигнување.'
      },
      sr: {
        description: 'Водећа позоришна институција Северне Македоније, која приказује богато културно наслеђе региона.',
        history: 'Основано 1947. године као премијерно позориште Северне Македоније, било је кључно у развоју и очувању македонских позоришних традиција док прихвата међународне сарадње. Позориште је симбол македонског културног идентитета и уметничког достигнућа.'
      }
    },
    images: [
      { imageUrl: '/skopje.jpg', caption: 'Theatre exterior', isPrimary: true },
      { imageUrl: '/placeholder.svg?height=300&width=400&text=Cultural+Performance', caption: 'Cultural performance', isPrimary: false }
    ],
    tags: ['National Theatre', 'Macedonian Culture', 'International Collaborations', 'Cultural Identity']
  },
  {
    name: 'National Theatre in Niš',
    city: 'Niš',
    country: 'Serbia',
    foundedYear: 1887,
    website: 'https://narodnopozoriste-nis.rs',
    translations: {
      en: {
        description: 'A prominent Serbian theatre known for its diverse repertoire and significant contribution to the cultural life of Niš.',
        history: 'Founded in 1887, the National Theatre in Niš has a rich history of theatrical excellence, presenting a wide range of plays from classical to contemporary. It has been a vital cultural institution for the city and the region, fostering artistic talent and engaging with the community.'
      },
      bg: {
        description: 'Известен сръбски театър, познат с разнообразния си репертоар и значителния принос към културния живот на Ниш.',
        history: 'Основан през 1887 г., Народният театър в Ниш има богата история на театрално съвършенство, представяйки широк спектър от пиеси от класически до съвременни. Той е жизненоважна културна институция за града и региона, насърчавайки артистичните таланти и ангажирайки се с общността.'
      },
      mk: {
        description: 'Истакнат српски театар познат по својот разновиден репертоар и значителен придонес кон културниот живот на Ниш.',
        history: 'Основан во 1887 година, Народниот театар во Ниш има богата историја на театарско совршенство, презентирајќи широк спектар на драми од класични до современи. Тој е витална културна институција за градот и регионот, негувајќи уметнички таленти и ангажирајќи се со заедницата.'
      },
      sr: {
        description: 'Истакнуто српско позориште познато по свом разноврсном репертоару и значајном доприносу културном животу Ниша.',
        history: 'Основано 1887. године, Народно позориште у Нишу има богату историју позоришне изузетности, представљајући широк спектар драма од класичних до савремених. То је витална културна институција за град и регион, неговање уметничких таленат и ангажовање са заједницом.'
      }
    },
    images: [
      { imageUrl: '/nish.jpg', caption: 'Theatre exterior', isPrimary: true },
      { imageUrl: '/placeholder.svg?height=300&width=400&text=Theatre+Interior+Niš', caption: 'Theatre interior', isPrimary: false }
    ],
    tags: ['Serbian Theatre', 'Regional Theatre', 'Classical Drama', 'Contemporary Plays']
  },
  {
    name: 'OSAIK "36 Monkeys"',
    city: 'Sofia',
    country: 'Bulgaria',
    foundedYear: 2010,
    website: 'https://36monkeys.bg',
    translations: {
      en: {
        description: 'An innovative independent theatre collective known for experimental and contemporary performances.',
        history: 'OSAIK "36 Monkeys" is a dynamic theatre group that has been pushing the boundaries of contemporary theatre in Sofia. Known for their creative approach to storytelling and experimental performances, they have gained recognition for bringing fresh perspectives to the Bulgarian theatre scene.'
      },
      bg: {
        description: 'Иновативен независим театрален колектив, известен с експериментални и съвременни представления.',
        history: 'ОСАИК "36 Маймуни" е динамична театрална група, която разширява границите на съвременния театър в София. Известни със своя творчески подход към разказването и експерименталните представления, те спечелиха признание за внасянето на свежи перспективи в българската театрална сцена.'
      },
      mk: {
        description: 'Иновативен независен театарски колектив познат по експериментални и современи претстави.',
        history: 'ОСАИК "36 Мајмуни" е динамична театарска група која ги поместува границите на современиот театар во Софија. Познати по својот креативен пристап кон раскажувањето и експерименталните претстави, тие добија признание за донесување свежи перспективи на бугарската театарска сцена.'
      },
      sr: {
        description: 'Иновативан независан позоришни колектив познат по експерименталним и савременим представама.',
        history: 'ОСАИК "36 Мајмуна" је динамична позоришна група која помера границе савременог позоришта у Софији. Познати по свом креативном приступу приповедању и експерименталним представама, стекли су признање за доношење свежих перспектива на бугарску позоришну сцену.'
      }
    },
    images: [
      { imageUrl: '/36monkeys.jpg', caption: 'Theatre space', isPrimary: true },
      { imageUrl: '/placeholder.svg?height=300&width=400&text=Experimental+Performance', caption: 'Experimental performance', isPrimary: false }
    ],
    tags: ['Independent Theatre', 'Experimental', 'Contemporary', 'Bulgarian Theatre']
  }
]

// createMultilingualEvents function removed - events now managed through Supabase

// Translation helper functions
function getTranslatedTitle(title: string, lang: string): string {
  const translations: { [key: string]: { [key: string]: string } } = {
    'Don Juan': {
      en: 'Don Juan',
      bg: 'Дон Жуан',
      mk: 'Дон Хуан',
      sr: 'Дон Жуан'
    },
    'Hamlet': {
      en: 'Hamlet',
      bg: 'Хамлет',
      mk: 'Хамлет',
      sr: 'Хамлет'
    },
    'The Seagull': {
      en: 'The Seagull',
      bg: 'Чайката',
      mk: 'Чајката',
      sr: 'Галеб'
    }
  }
  
  return translations[title]?.[lang] || title
}

function getTranslatedDescription(description: string, lang: string): string {
  const baseDescriptions: { [key: string]: string } = {
    en: 'A captivating theatrical performance that explores the depths of human emotion and storytelling.',
    bg: 'Завладяващо театрално представление, което изследва дълбините на човешките емоции и разказването.',
    mk: 'Запленувачка театарска претстава која ги истражува длабочините на човечките емоции и раскажувањето.',
    sr: 'Задивљујућа позоришна представа која истражује дубине људских емоција и приповедања.'
  }
  
  return baseDescriptions[lang] || description
}

function getTranslatedGenre(genre: string, lang: string): string {
  const genreTranslations: { [key: string]: { [key: string]: string } } = {
    'Drama': {
      en: 'Drama',
      bg: 'Драма',
      mk: 'Драма',
      sr: 'Драма'
    },
    'Comedy': {
      en: 'Comedy',
      bg: 'Комедия',
      mk: 'Комедија',
      sr: 'Комедија'
    },
    'Tragedy': {
      en: 'Tragedy',
      bg: 'Трагедия',
      mk: 'Трагедија',
      sr: 'Трагедија'
    }
  }
  
  return genreTranslations[genre]?.[lang] || genre
}

async function main() {
  console.log('🌱 Starting multilingual database seed...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.bookedSeat.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.seat.deleteMany()
  await prisma.venueSection.deleteMany()
  await prisma.event.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.theatreTag.deleteMany()
  await prisma.theatreImage.deleteMany()
  await prisma.theatre.deleteMany()
  await prisma.newsArticle.deleteMany()
  await prisma.user.deleteMany()

  // Seed Users
  console.log('👥 Seeding users...')
  await prisma.user.create({
    data: {
      email: 'admin@actingeurope.com',
      password_hash: '$2a$10$example.hash.for.admin.user',
      first_name: 'Admin',
      last_name: 'User',
      phone: '+1234567890',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  await prisma.user.create({
    data: {
      email: 'anastasia@actingeurope.eu',
      password_hash: '$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG',
      first_name: 'Anastasia',
      last_name: 'Admin',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  await prisma.user.create({
    data: {
      email: 'toni@actingeurope.eu',
      password_hash: '$2b$12$Ej3ti9MpuMgHRZgIxmwpCumP2QTZMcpzisMpvRw37W/x5SpROknvG',
      first_name: 'Toni',
      last_name: 'Admin',
      is_admin: true,
      email_notifications: true,
      marketing_preferences: false,
    },
  })

  // Seed Multilingual Theatres
  console.log('🎭 Seeding multilingual theatres...')
  const theatreMap = new Map()
  const languages = ['en', 'bg', 'mk', 'sr']

  for (const theatre of multilingualTheatres) {
    const translationGroupId = uuidv4()
    
    for (const lang of languages) {
      const createdTheatre = await prisma.theatre.create({
        data: {
          name: theatre.name,
          city: theatre.city,
          country: theatre.country,
          description: theatre.translations[lang as keyof typeof theatre.translations].description,
          history: theatre.translations[lang as keyof typeof theatre.translations].history,
          website: theatre.website,
          founded_year: theatre.foundedYear,
          content_language: lang,
          translation_group: translationGroupId,
        },
      })
      
      // Store theatre ID for the first language (English) to use for relationships
      if (lang === 'en') {
        theatreMap.set(theatre.name, createdTheatre.id)
      }

      // Add theatre images (only for English version to avoid duplicates)
      if (lang === 'en') {
        for (const image of theatre.images) {
          await prisma.theatreImage.create({
            data: {
              theatre_id: createdTheatre.id,
              image_url: image.imageUrl,
              caption: image.caption,
              is_primary: image.isPrimary,
            },
          })
        }

        // Add theatre tags
        for (const tag of theatre.tags) {
          await prisma.theatreTag.create({
            data: {
              theatre_id: createdTheatre.id,
              tag_name: tag,
            },
          })
        }
      }
    }
  }

  // Seed Venues
  console.log('🏛️ Seeding venues...')
  const venue = await prisma.venue.create({
    data: {
      name: 'Main Stage',
      description: 'Main performance venue with regular and balcony seating',
      capacity: 500,
    },
  })

  // Events are now managed through the Supabase database
  console.log('🎪 Events are managed through Supabase database')

  console.log('✅ Multilingual database seeded successfully!')
  console.log(`Created ${multilingualTheatres.length * languages.length} theatre entries`)
  console.log('Events are managed through Supabase database')
  console.log(`Languages supported: ${languages.join(', ')}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })