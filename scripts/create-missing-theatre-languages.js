const { PrismaClient } = require('../lib/prisma-client');

const prisma = new PrismaClient();

// Theatre translations for different languages
const theatreTranslations = {
  bg: {
    'Drama Theatre Kyustendil': 'Драматичен театър Кюстендил',
    'Macedonian National Theatre': 'Македонски национален театър',
    'National Theatre in Niš': 'Национален театър в Ниш',
    'OSAIK "39 Monkeys"': 'ОСАИК "39 Маймуни"',
    'Intimate Theatre Bitola': 'Интимен театър Битоля',
    'Virtual Booking Theatre': 'Виртуален театър за резервации'
  },
  mk: {
    'Drama Theatre Kyustendil': 'Драмски театар Кјустендил',
    'Macedonian National Theatre': 'Македонски национален театар',
    'National Theatre in Niš': 'Национален театар во Ниш',
    'OSAIK "39 Monkeys"': 'ОСАИК "39 Мајмуни"',
    'Intimate Theatre Bitola': 'Интимен театар Битола',
    'Virtual Booking Theatre': 'Виртуелен театар за резервации'
  },
  sr: {
    'Drama Theatre Kyustendil': 'Драмски театар Кјустендил',
    'Macedonian National Theatre': 'Македонски национални театар',
    'National Theatre in Niš': 'Народно позориште у Нишу',
    'OSAIK "39 Monkeys"': 'ОСАИК "39 Мајмуна"',
    'Intimate Theatre Bitola': 'Интимни театар Битоља',
    'Virtual Booking Theatre': 'Виртуелни театар за резервације'
  }
};

const descriptionTranslations = {
  bg: {
    'Drama Theatre Kyustendil': 'Известен регионален театър, познат със своите иновативни постановки и ангажимент към българското драматично изкуство.',
    'Macedonian National Theatre': 'Водещият национален театър на Македония, представящ класически и съвременни произведения.',
    'National Theatre in Niš': 'Престижен театър в Сърбия, известен със своите драматични постановки.',
    'OSAIK "39 Monkeys"': 'Съвременна театрална трупа, специализираща се в експериментални представления.',
    'Intimate Theatre Bitola': 'Интимен театър в Битоля, фокусиран върху камерни постановки.',
    'Virtual Booking Theatre': 'Виртуален театър за демонстрация на системата за резервации.'
  },
  mk: {
    'Drama Theatre Kyustendil': 'Познат регионален театар, познат по своите иновативни постановки и посветеност на драмското искуство.',
    'Macedonian National Theatre': 'Водечкиот национален театар на Македонија, претставувајќи класични и современи дела.',
    'National Theatre in Niš': 'Престижен театар во Србија, познат по своите драмски постановки.',
    'OSAIK "39 Monkeys"': 'Современа театарска трупа, специјализирана за експериментални претстави.',
    'Intimate Theatre Bitola': 'Интимен театар во Битола, фокусиран на камерни постановки.',
    'Virtual Booking Theatre': 'Виртуелен театар за демонстрација на системот за резервации.'
  },
  sr: {
    'Drama Theatre Kyustendil': 'Познати регионални театар, познат по својим иновативним поставкама и посвећености драмској уметности.',
    'Macedonian National Theatre': 'Водећи национални театар Македоније, представљајући класична и савремена дела.',
    'National Theatre in Niš': 'Престижни театар у Србији, познат по својим драмским поставкама.',
    'OSAIK "39 Monkeys"': 'Савремена позоришна трупа, специјализована за експерименталне представе.',
    'Intimate Theatre Bitola': 'Интимни театар у Битољу, фокусиран на камерне поставке.',
    'Virtual Booking Theatre': 'Виртуелни театар за демонстрацију система резервација.'
  }
};

async function createMissingTheatreLanguages() {
  try {
    console.log('Creating missing theatre language versions...');
    
    // Get all theatres
    const allTheatres = await prisma.theatre.findMany({
      orderBy: { id: 'asc' }
    });

    // Group by translation group and identify orphaned theatres
    const groupedTheatres = {};
    const orphanedTheatres = [];
    
    allTheatres.forEach(theatre => {
      if (theatre.translation_group) {
        if (!groupedTheatres[theatre.translation_group]) {
          groupedTheatres[theatre.translation_group] = [];
        }
        groupedTheatres[theatre.translation_group].push(theatre);
      } else {
        orphanedTheatres.push(theatre);
      }
    });

    console.log(`Found ${orphanedTheatres.length} orphaned theatres`);
    console.log(`Found ${Object.keys(groupedTheatres).length} translation groups`);

    // Process orphaned theatres - create translation groups and language versions
    for (const theatre of orphanedTheatres) {
      console.log(`\nProcessing orphaned theatre: ${theatre.name} (ID: ${theatre.id})`);
      
      // Create translation group
      const translationGroup = `theatre_${theatre.id}_group`;
      
      // Update the original theatre with translation group
      await prisma.theatre.update({
        where: { id: theatre.id },
        data: { translation_group: translationGroup }
      });
      
      console.log(`  ✅ Updated original theatre with translation group: ${translationGroup}`);
      
      // Create language versions for bg, mk, sr (assuming original is en)
      const languages = ['bg', 'mk', 'sr'];
      
      for (const lang of languages) {
        const translatedName = theatreTranslations[lang][theatre.name] || theatre.name;
        const translatedDescription = descriptionTranslations[lang][theatre.name] || theatre.description;
        
        const newTheatre = await prisma.theatre.create({
          data: {
            name: translatedName,
            city: theatre.city,
            country: theatre.country,
            description: translatedDescription,
            history: theatre.history,
            website: theatre.website,
            founded_year: theatre.founded_year,
            content_language: lang,
            translation_group: translationGroup
          }
        });
        
        console.log(`  ✅ Created ${lang.toUpperCase()} version: ${translatedName} (ID: ${newTheatre.id})`);
      }
    }

    // Process incomplete translation groups
    for (const [groupName, theatres] of Object.entries(groupedTheatres)) {
      const existingLanguages = theatres.map(t => t.content_language);
      const supportedLanguages = ['en', 'bg', 'mk', 'sr'];
      const missingLanguages = supportedLanguages.filter(lang => !existingLanguages.includes(lang));
      
      if (missingLanguages.length > 0) {
        console.log(`\nProcessing incomplete group: ${groupName}`);
        console.log(`  Missing languages: ${missingLanguages.join(', ')}`);
        
        // Use English version as template (or first available)
        const templateTheatre = theatres.find(t => t.content_language === 'en') || theatres[0];
        
        for (const lang of missingLanguages) {
          const translatedName = theatreTranslations[lang][templateTheatre.name] || templateTheatre.name;
          const translatedDescription = descriptionTranslations[lang][templateTheatre.name] || templateTheatre.description;
          
          const newTheatre = await prisma.theatre.create({
            data: {
              name: translatedName,
              city: templateTheatre.city,
              country: templateTheatre.country,
              description: translatedDescription,
              history: templateTheatre.history,
              website: templateTheatre.website,
              founded_year: templateTheatre.founded_year,
              content_language: lang,
              translation_group: groupName
            }
          });
          
          console.log(`  ✅ Created ${lang.toUpperCase()} version: ${translatedName} (ID: ${newTheatre.id})`);
        }
      }
    }

    console.log('\n🎉 Successfully created all missing theatre language versions!');
    
  } catch (error) {
    console.error('Error creating missing theatre languages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createMissingTheatreLanguages();