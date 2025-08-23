const { prisma } = require('../lib/prisma');

// Performance translations data
const performanceTranslations = {
  en: {
    1: {
      title: "No Man's Land",
      synopsis: "The script No Man's Land by Danis Tanović is about the war that took place in the 1990s within the borders of the former Yugoslavia. The reason is similar to that of all wars that have occurred - the aggressive persistence and imposition of a kind of cultural identity (including religious affiliation) that is mixed with territorial, political and economic claims. What is interesting in this case is that the warring parties - the Bosniaks and the Bosnian Serbs - are very close in every sense. Hence the impression that the irreconcilable differences between them are inessential, and the conflict is unsustainable. They are at war, even unable to determine exactly why and how it all began - they ask themselves, but do not find an answer. But they continue to kill each other... If this text still manages to build on something a little different from the already widely developed military theme, it consists in the emergence of the terrible and endless inertia of destruction.",
      description: "A powerful drama about the Yugoslav wars of the 1990s, exploring the senseless nature of conflict between closely related peoples."
    },
    2: {
      title: "Don Juan",
      synopsis: "A person's life journey and the marks they leave on others, their constant pursuit of self-improvement, give them the opportunity to rise freely and destroy all the delusions that time brings. This is my Don Juan – the one who can transcend himself and no longer be Don Juan.",
      description: "A modern interpretation of the classic Don Juan story, focusing on personal transformation and self-transcendence."
    },
    3: {
      title: "Oh My God",
      synopsis: "A lonely man at a bar table turns to the other visitors. It turns out that the bar belongs to Judas and the man is Christ. Or so He claims. Why? What does He want to accomplish if it is really Him? The play 'Oh My God' is a call for humanity and love in times when God's word is misused and instead of being a source of life, it is used to justify destruction. The team of the show invites you to a warm, sincere conversation about the deepest topic that seeks answers in the heart and mind of every person. A conversation with a smile and a tear, with irony and compassion.",
      description: "A thought-provoking monodrama exploring faith, humanity, and the misuse of religious teachings in modern times."
    },
    4: {
      title: "Aivar or Lutenitsa",
      synopsis: "Denitsa is Bulgarian and Sofia is Macedonian. Two women competing on stage. Two women measure the similarities and differences between the two peoples and create their map of the Balkans with a lot of humor, music, self-irony and personal stories. The political disputes between two countries seen through the eyes of two women and their thoughts, dreams, problems, experiences and fantasies. Do common things divide us more than they unite us? Is the past really important for countries, and for women - the future?",
      description: "A humorous exploration of Bulgarian-Macedonian relations through the eyes of two women, examining what divides and unites us."
    },
    5: {
      title: "Artists in Waiting",
      synopsis: "'Waiting Artists' is a comedy that caricatures the lives of people in the world of theater. The action takes place in the summer of 1953. George and Charlotte Hay, failed Broadway stars, try to regain their former glory by playing in Buffalo, New York. The multi-layered characters of the characters and the constant dramatic twists skillfully written by the author Ken Ludwig guarantee laughter in the hall.",
      description: "A theatrical comedy about failed Broadway stars attempting to reclaim their former glory in 1950s Buffalo."
    },
    6: {
      title: "In the Dark",
      synopsis: "'You think I'm tellin' you 'bout things I've seen, but no. All of these are just miracles, this is all just ignorance and if we could see 'em, they'd transform into visions.' With a jar of jam and an old suitcase Gichka the Cuckoo, the adopted daughter of the village priest, is alone in the belfry of the church. Her stories are unbelievably funny and offer a passage to a small village and its absurd, but lost world. Her stories are also sad as the trusting nature of a child is incapable of seeing through the veil of evil, even if it is staring it in the face. This is a tale of loneliness for those who are different, of frantic living on the margins of sanity and unconditional love. A life filled with memories and wonder. All of them were kept in a tiny tinder box.",
      description: "A poignant monodrama about a village outcast, blending humor and sadness in tales of loneliness and unconditional love."
    }
  },
  bg: {
    1: {
      title: "Ничия земя",
      synopsis: "Сценарият 'Ничия земя' от Данис Танович разказва за войната, която се проведе през 90-те години в границите на бивша Югославия. Причината е подобна на тази на всички войни, които са се случили - агресивната настойчивост и налагане на вид културна идентичност (включително религиозна принадлежност), която се смесва с териториални, политически и икономически претенции. Интересното в този случай е, че воюващите страни - босняците и босненските сърби - са много близки във всяко отношение. Оттук и впечатлението, че непримиримите различия между тях са несъществени, а конфликтът е неустойчив. Те воюват, дори неспособни да определят точно защо и как всичко започна - питат се, но не намират отговор. Но продължават да се убиват взаимно...",
      description: "Мощна драма за югославските войни от 90-те години, изследваща безсмислената природа на конфликта между близки народи."
    },
    2: {
      title: "Дон Жуан",
      synopsis: "Жизненото пътуване на човека и следите, които оставя върху другите, постоянното му стремеж към самоусъвършенстване, му дават възможност да се издигне свободно и да разруши всички заблуди, които времето носи. Това е моят Дон Жуан - този, който може да се превъзмогне и вече да не бъде Дон Жуан.",
      description: "Модерна интерпретация на класическата история за Дон Жуан, фокусирана върху личностната трансформация и самопревъзмогването."
    },
    3: {
      title: "Боже мой",
      synopsis: "Самотен мъж на барова маса се обръща към другите посетители. Оказва се, че барът принадлежи на Юда, а мъжът е Христос. Или поне така твърди. Защо? Какво иска да постигне, ако наистина е Той? Пиесата 'Боже мой' е призив за човечност и любов във времена, когато Божието слово се злоупотребява и вместо да бъде източник на живот, се използва за оправдаване на разрушението.",
      description: "Провокативна монодрама, изследваща вярата, човечността и злоупотребата с религиозните учения в съвременността."
    },
    4: {
      title: "Айвар или лютеница",
      synopsis: "Деница е българка, а София е македонка. Две жени се състезават на сцената. Две жени измерват приликите и разликите между двата народа и създават своята карта на Балканите с много хумор, музика, самоирония и лични истории. Политическите спорове между две страни, видени през очите на две жени и техните мисли, мечти, проблеми, преживявания и фантазии.",
      description: "Хумористично изследване на българо-македонските отношения през очите на две жени, разглеждащо това, което ни разделя и обединява."
    },
    5: {
      title: "Артисти в очакване",
      synopsis: "'Артисти в очакване' е комедия, която карикатурира живота на хората в театралния свят. Действието се развива през лятото на 1953 г. Джордж и Шарлот Хей, неуспешни бродуейски звезди, се опитват да възвърнат былата си слава, играейки в Бъфало, Ню Йорк.",
      description: "Театрална комедия за неуспешни бродуейски звезди, опитващи се да възвърнат былата си слава в Бъфало от 50-те години."
    },
    6: {
      title: "В неведение",
      synopsis: "'Мислиш, че ти разказвам за неща, които съм видяла, но не. Всички тези са просто чудеса, това е просто неведение и ако можехме да ги видим, те щяха да се превърнат във видения.' С буркан сладко и стар куфар Гичка Кукувицата, осиновената дъщеря на селския свещеник, е сама в камбанарията на църквата.",
      description: "Трогателна монодрама за селски изгнаник, съчетаваща хумор и тъга в разказите за самота и безусловна любов."
    }
  },
  mk: {
    1: {
      title: "Ничија земја",
      synopsis: "Сценариото 'Ничија земја' од Данис Танович раскажува за војната што се одвиваше во 90-тите години во границите на поранешна Југославија. Причината е слична на таа на сите војни што се случиле - агресивната упорност и наметнување на вид културен идентитет (вклучувајќи религиозна припадност) што се меша со територијални, политички и економски барања.",
      description: "Моќна драма за југословенските војни од 90-тите години, истражувајќи ја бесмислената природа на конфликтот меѓу блиски народи."
    },
    2: {
      title: "Дон Жуан",
      synopsis: "Животното патување на човекот и траговите што ги оставаат врз другите, нивното постојано стремење кон самоусовршување, им даваат можност слободно да се издигнат и да ги уништат сите заблуди што времето ги носи. Ова е мојот Дон Жуан - оној што може да се надмине себеси и повеќе да не биде Дон Жуан.",
      description: "Модерна интерпретација на класичната приказна за Дон Жуан, фокусирана на личната трансформација и самонадминување."
    },
    3: {
      title: "Боже мој",
      synopsis: "Осамен маж на барска маса се обраќа кон другите посетители. Се покажува дека барот му припаѓа на Јуда, а мажот е Христос. Или барем така тврди. Зошто? Што сака да постигне ако навистина е Тој? Пиесата 'Боже мој' е повик за човечност и љубов во времиња кога Божјиот збор се злоупотребува.",
      description: "Провокативна монодрама што ја истражува верата, човечноста и злоупотребата на религиозните учења во современоста."
    },
    4: {
      title: "Ајвар или лутеница",
      synopsis: "Деница е Бугарка, а Софија е Македонка. Две жени се натпреваруваат на сцената. Две жени ги мерат сличностите и разликите меѓу двата народа и ја создаваат својата мапа на Балканот со многу хумор, музика, самоиронија и лични приказни.",
      description: "Хумористично истражување на бугарско-македонските односи низ очите на две жени, разгледувајќи го тоа што нѐ дели и обединува."
    },
    5: {
      title: "Артисти во чекање",
      synopsis: "'Артисти во чекање' е комедија што ги карикатуризира животите на луѓето во театарскиот свет. Дејството се одвива во летото на 1953 година. Џорџ и Шарлот Хеј, неуспешни бродвејски ѕвезди, се обидуваат да ја вратат својата поранешна слава.",
      description: "Театарска комедија за неуспешни бродвејски ѕвезди што се обидуваат да ја вратат својата поранешна слава во Бафало од 50-тите години."
    },
    6: {
      title: "Во неведение",
      synopsis: "'Мислиш дека ти раскажувам за работи што ги видов, но не. Сите овие се само чуда, ова е само неведение и ако можевме да ги видиме, тие ќе се претворат во визии.' Со тегла џем и стар куфер Гичка Кукавицата, посвоената ќерка на селскиот свештеник, е сама во ѕвонарата на црквата.",
      description: "Трогателна монодрама за селски изгнаник, комбинирајќи хумор и тага во приказните за самотија и безусловна љубов."
    }
  },
  sr: {
    1: {
      title: "Ничија земља",
      synopsis: "Сценарио 'Ничија земља' Даниса Тановића говори о рату који се одвијао деведесетих година у границама бивше Југославије. Разлог је сличан оном свих ратова који су се догодили - агресивно упорство и наметање врсте културног идентитета (укључујући религијску припадност) који се меша са територијалним, политичким и економским захтевима.",
      description: "Моћна драма о југословенским ратовима из деведесетих година, истражујући бесмислену природу сукоба између блиских народа."
    },
    2: {
      title: "Дон Жуан",
      synopsis: "Животно путовање човека и трагови које оставља на другима, њихово стално стремљење ка самоусавршавању, дају им прилику да се слободно уздигну и униште све заблуде које време доноси. Ово је мој Дон Жуан - онај који може да превазиђе себе и више не буде Дон Жуан.",
      description: "Модерна интерпретација класичне приче о Дон Жуану, фокусирана на личну трансформацију и самопревазилажење."
    },
    3: {
      title: "Боже мој",
      synopsis: "Усамљен човек за барским столом се обраћа другим посетиоцима. Испоставља се да бар припада Јуди, а човек је Христос. Или тако тврди. Зашто? Шта жели да постигне ако је заиста Он? Представа 'Боже мој' је позив на човечност и љубав у временима када се Божја реч злоупотребљава.",
      description: "Провокативна монодрама која истражује веру, човечност и злоупотребу религијских учења у савремености."
    },
    4: {
      title: "Ајвар или лутеница",
      synopsis: "Деница је Бугарка, а Софија је Македонка. Две жене се такмиче на сцени. Две жене мере сличности и разлике између два народа и стварају своју мапу Балкана са пуно хумора, музике, самоироније и личних прича.",
      description: "Хумористично истраживање бугарско-македонских односа кроз очи две жене, разматрајући оно што нас дели и уједињује."
    },
    5: {
      title: "Уметници у чекању",
      synopsis: "'Уметници у чекању' је комедија која карикатуризује животе људи у свету позоришта. Радња се одвија током лета 1953. године. Џорџ и Шарлот Хеј, неуспешне бродвејске звезде, покушавају да поврате своју некадашњу славу.",
      description: "Позоришна комедија о неуспешним бродвејским звездама које покушавају да поврате своју некадашњу славу у Бафалу педесетих година."
    },
    6: {
      title: "У незнању",
      synopsis: "'Мислиш да ти причам о стварима које сам видела, али не. Све ово су само чуда, ово је све само незнање и да смо могли да их видимо, претвориле би се у визије.' Са тегла џема и старим кофером Гичка Кукавица, усвојена ћерка сеоског свештеника, сама је у звонари цркве.",
      description: "Дирљива монодрама о сеоском изгнанику, комбинујући хумор и тугу у причама о самоћи и безусловној љубави."
    }
  }
};

async function createMultiLanguagePerformances() {
  try {
    console.log('Starting multilingual performance creation...');
    
    // Get all existing English events (performances)
    const englishEvents = await prisma.event.findMany({
      where: {
        content_language: 'en'
      },
      include: {
        theatre: true,
        venue: true
      }
    });

    console.log(`Found ${englishEvents.length} English events`);

    // Create translation groups and update English events
    for (const event of englishEvents) {
      const translationGroup = `event_${event.id}_group`;
      
      // Update the English event with translation group
      await prisma.event.update({
        where: { id: event.id },
        data: { translation_group: translationGroup }
      });

      console.log(`Updated English event ${event.id} with translation group`);

      // Create Bulgarian, Macedonian, and Serbian versions
      const languages = ['bg', 'mk', 'sr'];
      
      for (const lang of languages) {
        const translation = performanceTranslations[lang][event.id];
        
        if (translation) {
          // Create the event in the new language
          const newEvent = await prisma.event.create({
            data: {
              title: translation.title,
              theatre_id: event.theatre_id,
              venue_id: event.venue_id,
              event_type: event.event_type,
              event_date: event.event_date,
              event_time: event.event_time,
              description: translation.description,
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
              synopsis: translation.synopsis,
              subtitles: event.subtitles,
              duration: event.duration,
              is_featured: event.is_featured
            }
          });

          console.log(`Created ${lang} version of event ${event.id} with ID ${newEvent.id}`);
        }
      }
    }

    console.log('Multilingual performance creation completed successfully!');
  } catch (error) {
    console.error('Error creating multilingual performances:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createMultiLanguagePerformances();
}

module.exports = { createMultiLanguagePerformances };