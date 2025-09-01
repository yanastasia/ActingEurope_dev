const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

// Complete theatre translations for all languages
const theatreTranslations = {
  en: {
    161: {
      name: 'Drama Theatre Kyustendil',
      description: 'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
      history: 'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre has maintained its reputation for artistic excellence and community engagement.'
    },
    162: {
      name: '"Ivan Vazov" National Theatre',
      description: 'Bulgaria\'s oldest and most prestigious theatre, serving as the national stage for dramatic arts.',
      history: 'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations.'
    },
    163: {
      name: 'Macedonian National Theatre',
      description: 'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
      history: 'Founded in 1945, the Macedonian National Theatre has been the cornerstone of Macedonian dramatic arts, presenting works in Macedonian language and promoting national cultural identity.'
    },
    164: {
      name: 'National Theatre in Niš',
      description: 'A prestigious theatre in Serbia, known for its dramatic productions and cultural significance.',
      history: 'Established in 1951, the National Theatre in Niš has been a vital cultural institution in southern Serbia, known for its diverse repertoire and commitment to theatrical excellence.'
    },
    165: {
      name: 'OSAIK "36 Monkeys"',
      description: 'A contemporary theatre company specializing in experimental and innovative performances.',
      history: 'Founded as an independent artistic collective, OSAIK "36 Monkeys" has gained recognition for its avant-garde approach to theatre and commitment to pushing artistic boundaries.'
    },
    166: {
      name: 'Intimate Theatre Bitola',
      description: 'An intimate theatre in Bitola focused on chamber productions and experimental works.',
      history: 'Established to provide a platform for intimate theatrical experiences, the theatre has become known for its close audience-performer relationship and innovative staging.'
    }
  },
  bg: {
    161: {
      name: 'Драматичен театър Кюстендил',
      description: 'Известен регионален театър, познат със своите иновативни постановки и ангажимент към българското драматично изкуство.',
      history: 'Основан в средата на 20-ти век, театърът е културен краеъгълен камък на Кюстендил, представящ както класически, така и съвременни произведения, докато възпитава местни таланти. Театърът е запазил репутацията си за артистично съвършенство и обществена ангажираност.'
    },
    162: {
      name: 'Народен театър "Иван Вазов"',
      description: 'Най-старият и най-престижен театър в България, служещ като национална сцена за драматично изкуство.',
      history: 'Основан през 1904 г., Народният театър "Иван Вазов" е наименуван на българския национален поет Иван Вазов. Той е основното място за български театър, домакин на легендарни представления и международни сътрудничества.'
    },
    163: {
      name: 'Македонски национален театър',
      description: 'Водещата театрална институция на Северна Македония, показваща богатото културно наследство на региона.',
      history: 'Основан през 1945 г., Македонският национален театър е краеъгълният камък на македонското драматично изкуство, представящ произведения на македонски език и популяризиращ националната културна идентичност.'
    },
    164: {
      name: 'Национален театър в Ниш',
      description: 'Престижен театър в Сърбия, известен със своите драматични постановки и културно значение.',
      history: 'Основан през 1951 г., Националният театър в Ниш е жизненоважна културна институция в южна Сърбия, известна със своя разнообразен репертоар и ангажимент към театралното съвършенство.'
    },
    165: {
      name: 'ОСАИК "36 Маймуни"',
      description: 'Съвременна театрална трупа, специализираща се в експериментални и иновативни представления.',
      history: 'Основана като независим артистичен колектив, ОСАИК "36 Маймуни" е спечелила признание за своя авангарден подход към театъра и ангажимент към преодоляване на артистичните граници.'
    },
    166: {
      name: 'Интимен театър Битоля',
      description: 'Интимен театър в Битоля, фокусиран върху камерни постановки и експериментални произведения.',
      history: 'Основан, за да предостави платформа за интимни театрални преживявания, театърът е станал известен със своята близка връзка публика-изпълнител и иновативна сценография.'
    }
  },
  mk: {
    161: {
      name: 'Драмски театар Кјустендил',
      description: 'Познат регионален театар, познат по своите иновативни постановки и посветеност на бугарската драмска уметност.',
      history: 'Основан во средината на 20-тиот век, театарот е културен краеуголен камен на Кјустендил, презентирајќи и класични и современи дела додека негува локални таленти. Театарот ја задржал својата репутација за уметничко совршенство и општествена ангажираност.'
    },
    162: {
      name: 'Народен театар "Иван Вазов"',
      description: 'Најстариот и најпрестижен театар во Бугарија, служејќи како национална сцена за драмска уметност.',
      history: 'Основан во 1904 година, Народниот театар "Иван Вазов" е именуван по бугарскиот национален поет Иван Вазов. Тој е премиерното место за бугарски театар, домаќин на легендарни претстави и меѓународни соработки.'
    },
    163: {
      name: 'Македонски национален театар',
      description: 'Водечката театарска институција на Северна Македонија, прикажувајќи го богатото културно наследство на регионот.',
      history: 'Основан во 1945 година, Македонскиот национален театар е краеуголниот камен на македонската драмска уметност, презентирајќи дела на македонски јазик и промовирајќи го националниот културен идентитет.'
    },
    164: {
      name: 'Национален театар во Ниш',
      description: 'Престижен театар во Србија, познат по своите драмски постановки и културно значење.',
      history: 'Основан во 1951 година, Националниот театар во Ниш е витална културна институција во јужна Србија, позната по својот разновиден репертоар и посветеност на театарското совршенство.'
    },
    165: {
      name: 'ОСАИК "36 Мајмуни"',
      description: 'Современа театарска трупа специјализирана во експериментални и иновативни претстави.',
      history: 'Основана како независен уметнички колектив, ОСАИК "36 Мајмуни" стекна признание за својот авангарден пристап кон театарот и посветеност на поместување на уметничките граници.'
    },
    166: {
      name: 'Интимен театар Битола',
      description: 'Интимен театар во Битола фокусиран на камерни постановки и експериментални дела.',
      history: 'Основан за да обезбеди платформа за интимни театарски искуства, театарот стана познат по својата блиска врска публика-изведувач и иновативна сценографија.'
    }
  },
  sr: {
    161: {
      name: 'Драмски театар Кјустендил',
      description: 'Познат регионални театар, познат по својим иновативним постановкама и посвећености бугарској драмској уметности.',
      history: 'Основан средином 20. века, театар је културни темељни камен Кјустендила, представљајући и класична и савремена дела док негује локалне таленте. Театар је задржао своју репутацију за уметничко савршенство и друштвену ангажованост.'
    },
    162: {
      name: 'Народно позориште "Иван Вазов"',
      description: 'Најстарије и најпрестижније позориште у Бугарској, служећи као национална сцена за драмску уметност.',
      history: 'Основано 1904. године, Народно позориште "Иван Вазов" је названо по бугарском националном песнику Ивану Вазову. То је премијерно место за бугарско позориште, домаћин легендарних представа и међународних сарадњи.'
    },
    163: {
      name: 'Македонско национално позориште',
      description: 'Водећа позоришна институција Северне Македоније, приказујући богато културно наслеђе региона.',
      history: 'Основано 1945. године, Македонско национално позориште је темељни камен македонске драмске уметности, представљајући дела на македонском језику и промовишући национални културни идентитет.'
    },
    164: {
      name: 'Народно позориште у Нишу',
      description: 'Престижно позориште у Србији, познато по својим драмским постановкама и културном значају.',
      history: 'Основано 1951. године, Народно позориште у Нишу је витална културна институција у јужној Србији, позната по свом разноврсном репертоару и посвећености позоришном савршенству.'
    },
    165: {
      name: 'ОСАИК "36 Мајмуна"',
      description: 'Савремена позоришна трупа специјализована за експерименталне и иновативне представе.',
      history: 'Основана као независни уметнички колектив, ОСАИК "36 Мајмуна" је стекла признање за свој авангардни приступ позоришту и посвећеност померању уметничких граница.'
    },
    166: {
      name: 'Интимни театар Битоља',
      description: 'Интимно позориште у Битољу фокусирано на камерне постановке и експериментална дела.',
      history: 'Основано да пружи платформу за интимна позоришна искуства, позориште је постало познато по својој блиској вези публика-извођач и иновативној сценографији.'
    }
  }
};

async function createTheatreTranslations() {
  try {
    console.log('Starting theatre translation creation...');
    
    // First, update the existing English theatre name
    console.log('Updating existing English theatre name...');
    await prisma.theatre.update({
      where: { id: 161 },
      data: { name: 'Drama Theatre Kyustendil' }
    });
    console.log('Updated Drama Theatre name to "Drama Theatre Kyustendil"');
    
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

    // Create translation groups and translations for each theatre
    for (const theatre of englishTheatres) {
      const translationGroup = `theatre_${theatre.id}_group`;
      
      console.log(`\nProcessing theatre: ${theatre.name} (ID: ${theatre.id})`);
      
      // Update the English theatre with translation group
      await prisma.theatre.update({
        where: { id: theatre.id },
        data: { 
          translation_group: translationGroup,
          name: theatreTranslations.en[theatre.id]?.name || theatre.name,
          description: theatreTranslations.en[theatre.id]?.description || theatre.description,
          history: theatreTranslations.en[theatre.id]?.history || theatre.history
        }
      });

      console.log(`  Updated English theatre with translation group: ${translationGroup}`);

      // Create Bulgarian, Macedonian, and Serbian versions
      const languages = ['bg', 'mk', 'sr'];
      
      for (const lang of languages) {
        const translation = theatreTranslations[lang][theatre.id];
        
        if (translation) {
          // Check if translation already exists
          const existingTranslation = await prisma.theatre.findFirst({
            where: {
              translation_group: translationGroup,
              content_language: lang
            }
          });

          if (!existingTranslation) {
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

            console.log(`    Created ${lang.toUpperCase()} translation: ${translation.name} (ID: ${newTheatre.id})`);

            // Copy images if they exist
            if (theatre.images && theatre.images.length > 0) {
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
              console.log(`      Copied ${theatre.images.length} images`);
            }

            // Copy tags if they exist
            if (theatre.tags && theatre.tags.length > 0) {
              for (const tag of theatre.tags) {
                await prisma.theatreTag.create({
                  data: {
                    theatre_id: newTheatre.id,
                    tag_name: tag.tag_name
                  }
                });
              }
              console.log(`      Copied ${theatre.tags.length} tags`);
            }
          } else {
            console.log(`    ${lang.toUpperCase()} translation already exists (ID: ${existingTranslation.id})`);
          }
        } else {
          console.log(`    No translation data found for ${lang.toUpperCase()}`);
        }
      }
    }

    console.log('\n=== Theatre translation creation completed! ===');
    
    // Verify the results
    const allTheatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true,
        translation_group: true
      },
      orderBy: [
        { translation_group: 'asc' },
        { content_language: 'asc' }
      ]
    });

    console.log('\n=== VERIFICATION ===');
    const groupedResults = {};
    allTheatres.forEach(theatre => {
      if (theatre.translation_group) {
        if (!groupedResults[theatre.translation_group]) {
          groupedResults[theatre.translation_group] = [];
        }
        groupedResults[theatre.translation_group].push(theatre);
      }
    });

    Object.keys(groupedResults).forEach(group => {
      console.log(`\n${group}:`);
      groupedResults[group].forEach(theatre => {
        console.log(`  ${theatre.content_language}: ${theatre.name} (ID: ${theatre.id})`);
      });
    });

  } catch (error) {
    console.error('Error creating theatre translations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTheatreTranslations();