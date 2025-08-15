const { prisma } = require('../lib/prisma');

// Theatre translations based on the existing data structure
const theatreTranslations = {
  en: {
    1: {
      name: 'Drama Theatre "Krum Kyulyavkov"',
      description: 'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
      history: 'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre was named after Krum Kyulyavkov, a celebrated Bulgarian actor and director who significantly contributed to the development of Bulgarian theatre. Over the decades, it has maintained its reputation for artistic excellence and community engagement.'
    },
    2: {
      name: '"Ivan Vazov" National Theatre',
      description: 'Bulgaria\'s oldest and most prestigious theatre, serving as the national stage for dramatic arts.',
      history: 'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity. Throughout its history, it has been home to the most celebrated Bulgarian actors and directors.'
    },
    3: {
      name: 'Macedonian National Theatre',
      description: 'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
      history: 'Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.'
    },
    4: {
      name: 'National Theatre in Niš',
      description: 'A prominent Serbian theatre known for its diverse repertoire and significant contribution to the cultural life of Niš.',
      history: 'Founded in 1887, the National Theatre in Niš has a rich history of theatrical excellence, presenting a wide range of plays from classical to contemporary. It has been a vital cultural institution for the city and the region, fostering artistic talent and engaging with the community.'
    },
    5: {
      name: 'OSAIK "39 Monkeys"',
      description: 'An innovative independent theatre collective known for experimental and contemporary performances.',
      history: 'OSAIK \'39 Monkeys\' is a dynamic theatre group that has been pushing the boundaries of contemporary theatre in Sofia. Known for their creative approach to storytelling and experimental performances, they have gained recognition for bringing fresh perspectives to the Bulgarian theatre scene.'
    },
    6: {
      name: 'Intimate Theatre Bitola',
      description: 'A cozy intimate theatre space dedicated to bringing audiences closer to the art of performance.',
      history: 'The Intimate Theater Bitola has been a cultural gem in the historic city of Bitola, providing an intimate setting for both local and international productions. The theatre focuses on creating meaningful connections between performers and audiences through its close-knit performance space.'
    }
  },
  bg: {
    1: {
      name: 'Драматичен театър "Крум Кюлявков"',
      description: 'Изтъкнат регионален театър, известен със своите иновативни постановки и отдаденост на българското драматично изкуство.',
      history: 'Основан в средата на 20-ти век, театърът е бил културен краеугълен камък на Кюстендил, представяйки както класически, така и съвременни произведения, докато отглежда местни таланти. Театърът е наименуван на Крум Кюлявков, прославен български актьор и режисьор, който значително допринесе за развитието на българския театър.'
    },
    2: {
      name: 'Народен театър "Иван Вазов"',
      description: 'Най-старият и най-престижен театър в България, служещ като национална сцена за драматично изкуство.',
      history: 'Основан през 1904 г., Народният театър "Иван Вазов" е наименуван на българския национален поет Иван Вазов. Той е бил водещото място за български театър, домакин на легендарни представления и международни сътрудничества.'
    },
    3: {
      name: 'Македонски национален театър',
      description: 'Водещата театрална институция на Северна Македония, показваща богатото културно наследство на региона.',
      history: 'Основан през 1947 г. като водещ театър на Северна Македония, той е бил инструментален в развитието и запазването на македонските театрални традиции, като същевременно приема международни сътрудничества.'
    },
    4: {
      name: 'Национален театър в Ниш',
      description: 'Известен сръбски театър, познат с разнообразния си репертоар и значителния принос към културния живот на Ниш.',
      history: 'Основан през 1887 г., Националният театър в Ниш има богата история на театрално съвършенство, представяйки широк спектър от пиеси от класически до съвременни.'
    },
    5: {
      name: 'ОСАИК "39 Маймуни"',
      description: 'Иновативен независим театрален колектив, известен с експериментални и съвременни представления.',
      history: 'ОСАИК "39 Маймуни" е динамична театрална група, която бутва границите на съвременния театър в София.'
    },
    6: {
      name: 'Интимен театър Битоля',
      description: 'Уютно интимно театрално пространство, посветено на приближаването на публиката до изкуството на представлението.',
      history: 'Интимният театър Битоля е културен бисер в историческия град Битоля, предоставяйки интимна обстановка за местни и международни продукции.'
    }
  },
  mk: {
    1: {
      name: 'Драмски театар "Крум Кјуљавков"',
      description: 'Истакнат регионален театар познат по своите иновативни продукции и посветеност на бугарската драмска уметност.',
      history: 'Основан во средината на 20-тиот век, театарот бил културен краеугол камен на Ќустендил, презентирајќи и класични и современи дела додека негува локални таленти.'
    },
    2: {
      name: 'Народен театар "Иван Вазов"',
      description: 'Најстариот и најпрестижен театар во Бугарија, служејќи како национална сцена за драмска уметност.',
      history: 'Основан во 1904 година, Народниот театар "Иван Вазов" е наименуван по бугарскиот национален поет Иван Вазов.'
    },
    3: {
      name: 'Македонски национален театар',
      description: 'Водечката театарска институција на Северна Македонија, прикажувајќи го богатото културно наследство на регионот.',
      history: 'Основан во 1947 година како премиер театар на Северна Македонија, тој бил инструментален во развивањето и зачувувањето на македонските театарски традиции.'
    },
    4: {
      name: 'Национален театар во Ниш',
      description: 'Истакнат српски театар познат по својот разновиден репертоар и значителен придонес кон културниот живот на Ниш.',
      history: 'Основан во 1887 година, Националниот театар во Ниш има богата историја на театарско совршенство, презентирајќи широк спектар на пиеси.'
    },
    5: {
      name: 'ОСАИК "39 Мајмуни"',
      description: 'Иновативен независен театарски колектив познат по експериментални и современи претстави.',
      history: 'ОСАИК "39 Мајмуни" е динамична театарска група која ги поместува границите на современиот театар во Софија.'
    },
    6: {
      name: 'Интимен театар Битола',
      description: 'Удобен интимен театарски простор посветен на приближување на публиката до уметноста на претставата.',
      history: 'Интимниот театар Битола е културен бисер во историскиот град Битола, обезбедувајќи интимна средина за локални и меѓународни продукции.'
    }
  },
  sr: {
    1: {
      name: 'Драмски позориште "Крум Кјуљавков"',
      description: 'Истакнуто регионално позориште познато по својим иновативним продукцијама и посвећености бугарској драмској уметности.',
      history: 'Основано средином 20. века, позориште је било културни камен темељац Ћустендила, представљајући и класична и савремена дела док негује локалне таленте.'
    },
    2: {
      name: 'Народно позориште "Иван Вазов"',
      description: 'Најстарије и најпрестижније позориште у Бугарској, које служи као национална сцена за драмску уметност.',
      history: 'Основано 1904. године, Народно позориште "Иван Вазов" је названо по бугарском националном песнику Ивану Вазову.'
    },
    3: {
      name: 'Македонско национално позориште',
      description: 'Водећа позоришна институција Северне Македоније, приказујући богато културно наслеђе региона.',
      history: 'Основано 1947. године као премијер позориште Северне Македоније, било је инструментално у развоју и очувању македонских позоришних традиција.'
    },
    4: {
      name: 'Народно позориште у Нишу',
      description: 'Истакнуто српско позориште познато по свом разноврсном репертоару и значајном доприносу културном животу Ниша.',
      history: 'Основано 1887. године, Народно позориште у Нишу има богату историју позоришне изврсности, представљајући широк спектар представа од класичних до савремених.'
    },
    5: {
      name: 'ОСАИК "39 Мајмуна"',
      description: 'Иновативни независни позоришни колектив познат по експерименталним и савременим представама.',
      history: 'ОСАИК "39 Мајмуна" је динамична позоришна група која помера границе савременог позоришта у Софији.'
    },
    6: {
      name: 'Интимно позориште Битољ',
      description: 'Удобан интимни позоришни простор посвећен приближавању публике уметности представе.',
      history: 'Интимно позориште Битољ је културни бисер у историјском граду Битољу, пружајући интимно окружење за локалне и међународне продукције.'
    }
  }
};

async function createMultiLanguageTheatres() {
  try {
    console.log('Starting multilingual theatre creation...');
    
    // Get all existing English theatres
    const englishTheatres = await prisma.theatre.findMany({
      where: {
        content_language: 'en'
      },
      include: {
        images: true,
        tags: true
      }
    });

    console.log(`Found ${englishTheatres.length} English theatres`);

    // Create translation groups and update English theatres
    for (const theatre of englishTheatres) {
      const translationGroup = `theatre_${theatre.id}_group`;
      
      // Update the English theatre with translation group
      await prisma.theatre.update({
        where: { id: theatre.id },
        data: { translation_group: translationGroup }
      });

      console.log(`Updated English theatre ${theatre.id} with translation group`);

      // Create Bulgarian, Macedonian, and Serbian versions
      const languages = ['bg', 'mk', 'sr'];
      
      for (const lang of languages) {
        const translation = theatreTranslations[lang][theatre.id];
        
        if (translation) {
          // Create the theatre in the new language
          const newTheatre = await prisma.theatre.create({
            data: {
              name: translation.name,
              city: theatre.city,
              country: theatre.country,
              description: translation.description,
              history: translation.history,
              website: theatre.website,
              founded_year: theatre.founded_year,
              content_language: lang,
              translation_group: translationGroup
            }
          });

          console.log(`Created ${lang} version of theatre ${theatre.id} with ID ${newTheatre.id}`);

          // Copy images
          for (const image of theatre.images) {
            await prisma.theatreImage.create({
              data: {
                theatre_id: newTheatre.id,
                image_url: image.image_url,
                caption: image.caption,
                is_primary: image.is_primary
              }
            });
          }

          // Copy tags
          for (const tag of theatre.tags) {
            await prisma.theatreTag.create({
              data: {
                theatre_id: newTheatre.id,
                tag_name: tag.tag_name
              }
            });
          }

          console.log(`Copied ${theatre.images.length} images and ${theatre.tags.length} tags for ${lang} version`);
        }
      }
    }

    console.log('Multilingual theatre creation completed successfully!');
  } catch (error) {
    console.error('Error creating multilingual theatres:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createMultiLanguageTheatres();
}

module.exports = { createMultiLanguageTheatres };