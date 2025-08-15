import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string | null;
  author: string | null;
  publishedAt: Date | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  contentLanguage: string;
  translationGroup: string | null;
}

type UserRole = 'admin' | 'seller' | 'client';

interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  isAdmin: boolean;
  emailNotifications: boolean;
  marketingPreferences: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export const createUser = async (email: string, password: string, firstName: string, lastName: string, role: 'admin' | 'seller' | 'client' = 'client') => {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const isAdmin = role === 'admin';
    
    return await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        is_admin: isAdmin,
        email_notifications: true,
        marketing_preferences: false
      }
    });
  }

export async function updateUserRole(userId: number, newRole: UserRole) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    throw new Error("User not found");
  }
  
  const isAdmin = newRole === 'admin';
  
  return await prisma.user.update({
    where: { id: userId },
    data: { is_admin: isAdmin }
  });
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    await prisma.user.delete({
      where: { id: userId }
    });
    return true;
  } catch (error) {
    return false;
  }
}


export const getNewsArticles = async (language: string = 'en'): Promise<NewsArticle[]> => {
    const articles = await prisma.newsArticle.findMany({
      where: {
        content_language: language,
        is_published: true
      },
      orderBy: { created_at: 'desc' }
    });
    
    return articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      contentLanguage: article.content_language,
      translationGroup: article.translation_group
    }));
  }

export const createNewsArticle = async (
  title: string,
  content: string,
  imageUrl?: string,
  category?: string,
  author?: string,
  contentLanguage: string = 'en',
  translationGroup?: string
): Promise<NewsArticle> => {
  const articleData = {
    title,
    content,
    image_url: imageUrl,
    category,
    author,
    is_published: true,
    content_language: contentLanguage,
    translation_group: translationGroup
  };
  
  const article = await prisma.newsArticle.create({
    data: articleData
  });
  
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    imageUrl: article.image_url,
    category: article.category,
    author: article.author,
    publishedAt: article.published_at,
    isPublished: article.is_published,
    createdAt: article.created_at,
    updatedAt: article.updated_at,
    contentLanguage: article.content_language,
    translationGroup: article.translation_group
  };
}

export const createNewsArticleWithTranslations = async (title: string, content: string, imageUrl?: string, category?: string, author?: string): Promise<NewsArticle[]> => {
    const languages = ['en', 'bg', 'mk', 'sr'];
    const translationGroup = `news_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const articles: NewsArticle[] = [];
    
    for (const language of languages) {
      const article = await createNewsArticle(
        title,
        content,
        imageUrl,
        category,
        author,
        language,
        translationGroup
      );
      articles.push(article);
    }
    
    return articles;
  }

export const updateNewsArticle = async (id: number, updatedFields: Partial<NewsArticle>): Promise<NewsArticle | null> => {
    try {
      const article = await prisma.newsArticle.update({
        where: { id },
        data: {
          title: updatedFields.title,
          content: updatedFields.content,
          image_url: updatedFields.imageUrl,
          category: updatedFields.category,
          author: updatedFields.author,
          is_published: updatedFields.isPublished,
          published_at: updatedFields.publishedAt,
          content_language: updatedFields.contentLanguage,
          translation_group: updatedFields.translationGroup
        }
      });
      
      return {
        id: article.id,
        title: article.title,
        content: article.content,
        imageUrl: article.image_url,
        category: article.category,
        author: article.author,
        publishedAt: article.published_at,
        isPublished: article.is_published,
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        contentLanguage: article.content_language,
        translationGroup: article.translation_group
      };
    } catch (error) {
      return null;
    }
  }

// Theatre operations
export const createTheatre = async (
  name: string,
  city: string,
  country: string,
  description?: string,
  history?: string,
  website?: string,
  foundedYear?: number,
  contentLanguage: string = 'en',
  translationGroup?: string,
  images: any[] = [],
  tags: string[] = []
) => {
  const theatre = await prisma.theatre.create({
    data: {
      name,
      city,
      country,
      description,
      history,
      website,
      founded_year: foundedYear,
      content_language: contentLanguage,
      translation_group: translationGroup,
      images: {
        create: images.map((img: any) => ({
          image_url: img.image_url,
          caption: img.caption,
          is_primary: img.is_primary || false
        }))
      },
      tags: {
        create: tags.map((tag: string) => ({
          tag_name: tag
        }))
      }
    },
    include: {
      images: true,
      tags: true,
      _count: {
        select: {
          events: true
        }
      }
    }
  });
  
  return theatre;
}

export const createTheatreWithTranslations = async (
  name: string,
  city: string,
  country: string,
  description?: string,
  history?: string,
  website?: string,
  foundedYear?: number,
  images: any[] = [],
  tags: string[] = []
) => {
  const languages = ['en', 'bg', 'mk', 'sr'];
  const translationGroup = `theatre_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const theatres = [];
  
  for (const language of languages) {
    const theatre = await createTheatre(
      name,
      city,
      country,
      description,
      history,
      website,
      foundedYear,
      language,
      translationGroup,
      images,
      tags
    );
    theatres.push(theatre);
  }
  
  return theatres;
}

export const deleteNewsArticle = async (id: number): Promise<boolean> => {
    try {
      await prisma.newsArticle.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

export const deleteNewsArticleWithTranslations = async (id: number): Promise<boolean> => {
  try {
    // First get the article to find its translation group
    const article = await prisma.newsArticle.findUnique({
      where: { id }
    });

    if (!article) {
      return false;
    }

    // If it has a translation group, delete all articles in that group
    if (article.translation_group) {
      await prisma.newsArticle.deleteMany({
        where: {
          translation_group: article.translation_group
        }
      });
    } else {
      // If no translation group, just delete the single article
      await prisma.newsArticle.delete({
        where: { id }
      });
    }

    return true;
  } catch (error) {
    console.error('Error deleting news article with translations:', error);
    return false;
  }
}

export const getNewsArticlesByTranslationGroup = async (translationGroup: string): Promise<NewsArticle[]> => {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: {
        translation_group: translationGroup,
        is_published: true
      },
      orderBy: {
        content_language: 'asc'
      }
    });

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      contentLanguage: article.content_language,
      translationGroup: article.translation_group
    }));
  } catch (error) {
    console.error('Error fetching articles by translation group:', error);
    return [];
  }
}

export const getNewsArticleById = async (id: number, language: string = 'en'): Promise<NewsArticle | null> => {
  try {
    // First get the original article to find its translation group
    const originalArticle = await prisma.newsArticle.findUnique({
      where: { id: id }
    });

    if (!originalArticle) {
      return null;
    }

    let article = null;

    // If the article has a translation group, try to find the article in the requested language
    if (originalArticle.translation_group) {
      article = await prisma.newsArticle.findFirst({
        where: {
          translation_group: originalArticle.translation_group,
          content_language: language,
          is_published: true
        }
      });

      // If not found in requested language, fallback to English
      if (!article) {
        article = await prisma.newsArticle.findFirst({
          where: {
            translation_group: originalArticle.translation_group,
            content_language: 'en',
            is_published: true
          }
        });
      }
    } else {
      // If no translation group, check if the original article matches the requested language
      if (originalArticle.content_language === language && originalArticle.is_published) {
        article = originalArticle;
      } else if (originalArticle.content_language === 'en' && originalArticle.is_published) {
        // Fallback to English if it's the original article
        article = originalArticle;
      }
    }

    if (!article) {
      return null;
    }

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      contentLanguage: article.content_language,
      translationGroup: article.translation_group
    };
  } catch (error) {
    console.error('Error fetching news article by ID:', error);
    return null;
  }
}

export const createSuperAdmin = async (email: string, password: string, firstName: string, lastName: string) => {
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { is_admin: true }
    });
    
    if (existingSuperAdmin) {
      throw new Error('Super admin already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    return await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        is_admin: true,
        email_notifications: true,
        marketing_preferences: false
      }
    });
  }

// About Page interfaces and operations
export interface AboutPage {
  id: number;
  title: string;
  content: string;
  contentLanguage: string;
  translationGroup: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getAboutPage = async (language: string = 'en'): Promise<AboutPage | null> => {
  try {
    const aboutPage = await prisma.aboutPage.findFirst({
      where: {
        content_language: language
      }
    });
    
    if (!aboutPage && language !== 'en') {
      // Fallback to English
      return await getAboutPage('en');
    }
    
    if (!aboutPage) return null;
    
    return {
      id: aboutPage.id,
      title: aboutPage.title,
      content: aboutPage.content,
      contentLanguage: aboutPage.content_language,
      translationGroup: aboutPage.translation_group,
      createdAt: aboutPage.created_at,
      updatedAt: aboutPage.updated_at
    };
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export const createAboutPage = async (title: string, content: string, contentLanguage: string = 'en', translationGroup?: string): Promise<AboutPage> => {
  const aboutPage = await prisma.aboutPage.create({
    data: {
      title,
      content,
      content_language: contentLanguage,
      translation_group: translationGroup
    }
  });
  
  return {
    id: aboutPage.id,
    title: aboutPage.title,
    content: aboutPage.content,
    contentLanguage: aboutPage.content_language,
    translationGroup: aboutPage.translation_group,
    createdAt: aboutPage.created_at,
    updatedAt: aboutPage.updated_at
  };
}

export const updateAboutPage = async (id: number, updatedFields: Partial<AboutPage>): Promise<AboutPage | null> => {
  try {
    const aboutPage = await prisma.aboutPage.update({
      where: { id },
      data: {
        title: updatedFields.title,
        content: updatedFields.content,
        content_language: updatedFields.contentLanguage,
        translation_group: updatedFields.translationGroup
      }
    });
    
    return {
      id: aboutPage.id,
      title: aboutPage.title,
      content: aboutPage.content,
      contentLanguage: aboutPage.content_language,
      translationGroup: aboutPage.translation_group,
      createdAt: aboutPage.created_at,
      updatedAt: aboutPage.updated_at
    };
  } catch (error) {
    return null;
  }
}

// Contact Page interfaces and operations
export interface ContactPage {
  id: number;
  title: string;
  content: string;
  contentLanguage: string;
  translationGroup: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getContactPage = async (language: string = 'en'): Promise<ContactPage | null> => {
  try {
    const contactPage = await prisma.contactPage.findFirst({
      where: {
        content_language: language
      }
    });
    
    if (!contactPage && language !== 'en') {
      // Fallback to English
      return await getContactPage('en');
    }
    
    if (!contactPage) return null;
    
    return {
      id: contactPage.id,
      title: contactPage.title,
      content: contactPage.content,
      contentLanguage: contactPage.content_language,
      translationGroup: contactPage.translation_group,
      createdAt: contactPage.created_at,
      updatedAt: contactPage.updated_at
    };
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}

export const createContactPage = async (title: string, content: string, contentLanguage: string = 'en', translationGroup?: string): Promise<ContactPage> => {
  const contactPage = await prisma.contactPage.create({
    data: {
      title,
      content,
      content_language: contentLanguage,
      translation_group: translationGroup
    }
  });
  
  return {
    id: contactPage.id,
    title: contactPage.title,
    content: contactPage.content,
    contentLanguage: contactPage.content_language,
    translationGroup: contactPage.translation_group,
    createdAt: contactPage.created_at,
    updatedAt: contactPage.updated_at
  };
}

export const updateContactPage = async (id: number, updatedFields: Partial<ContactPage>): Promise<ContactPage | null> => {
  try {
    const contactPage = await prisma.contactPage.update({
      where: { id },
      data: {
        title: updatedFields.title,
        content: updatedFields.content,
        content_language: updatedFields.contentLanguage,
        translation_group: updatedFields.translationGroup
      }
    });
    
    return {
      id: contactPage.id,
      title: contactPage.title,
      content: contactPage.content,
      contentLanguage: contactPage.content_language,
      translationGroup: contactPage.translation_group,
      createdAt: contactPage.created_at,
      updatedAt: contactPage.updated_at
    };
  } catch (error) {
    return null;
  }
}

// Theatre interfaces and operations
export interface Theatre {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
  history: string;
  website?: string;
  foundedYear: number;
  images: TheatreImage[];
  tags: string[];
}

export interface TheatreImage {
  id: number;
  imageUrl: string;
  caption?: string;
  isPrimary: boolean;
}

// Static theatre data with language support
const theatreTranslations = {
  en: {
    1: {
      name: 'Drama Theatre "Krum Kyulyavkov"',
      description: 'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
      history: 'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre was named after Krum Kyulyavkov, a celebrated Bulgarian actor and director who significantly contributed to the development of Bulgarian theatre. Over the decades, it has maintained its reputation for artistic excellence and community engagement.',
      tags: ['Regional Theatre', 'Bulgarian Drama', 'Contemporary Works', 'Community Theatre']
    },
    2: {
      name: '"Ivan Vazov" National Theatre',
      description: 'Bulgaria\'s oldest and most prestigious theatre, serving as the national stage for dramatic arts.',
      history: 'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity. Throughout its history, it has been home to the most celebrated Bulgarian actors and directors.',
      tags: ['National Theatre', 'Classical Drama', 'Bulgarian Heritage', 'Historic Venue']
    },
    6: {
      name: 'Macedonian National Theatre',
      description: 'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
      history: 'Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.',
      tags: ['National Theatre', 'Macedonian Culture', 'International Collaborations', 'Cultural Identity']
    },
    7: {
      name: 'National Theatre in Niš',
      description: 'A prominent Serbian theatre known for its diverse repertoire and significant contribution to the cultural life of Niš.',
      history: 'Founded in 1887, the National Theatre in Niš has a rich history of theatrical excellence, presenting a wide range of plays from classical to contemporary. It has been a vital cultural institution for the city and the region, fostering artistic talent and engaging with the community.',
      tags: ['Serbian Theatre', 'Regional Theatre', 'Classical Drama', 'Contemporary Plays']
    },
    8: {
      name: 'OSAIK "39 Monkeys"',
      description: 'An innovative independent theatre collective known for experimental and contemporary performances.',
      history: 'OSAIK \'39 Monkeys\' is a dynamic theatre group that has been pushing the boundaries of contemporary theatre in Sofia. Known for their creative approach to storytelling and experimental performances, they have gained recognition for bringing fresh perspectives to the Bulgarian theatre scene.',
      tags: ['Independent Theatre', 'Experimental', 'Contemporary', 'Bulgarian Theatre']
    },
    9: {
      name: 'Intimate Theatre Bitola',
      description: 'A cozy intimate theatre space dedicated to bringing audiences closer to the art of performance.',
      history: 'The Intimate Theater Bitola has been a cultural gem in the historic city of Bitola, providing an intimate setting for both local and international productions. The theatre focuses on creating meaningful connections between performers and audiences through its close-knit performance space.',
      tags: ['Intimate Theatre', 'Macedonian Culture', 'Local Productions', 'Community Theatre']
    }
  },
  bg: {
    1: {
      name: 'Драматичен театър "Крум Кюлявков"',
      description: 'Известен регионален театър, познат с иновативните си постановки и отдадеността към българското драматично изкуство.',
      history: 'Основан в средата на 20-ти век, театърът е културен краеъгълен камък на Кюстендил, представящ както класически, така и съвременни произведения, докато отглежда местни таланти. Театърът е наименуван на Крум Кюлявков, прославен български актьор и режисьор, който значително допринесе за развитието на българския театър.',
      tags: ['Регионален театър', 'Българска драма', 'Съвременни произведения', 'Общностен театър']
    },
    2: {
      name: 'Народен театър "Иван Вазов"',
      description: 'Най-старият и престижен театър в България, служещ като национална сцена за драматично изкуство.',
      history: 'Основан през 1904 г., Народният театър "Иван Вазов" е наименуван на българския национален поет Иван Вазов. Той е водещото място за български театър, домакин на легендарни представления и международни сътрудничества.',
      tags: ['Национален театър', 'Класическа драма', 'Българско наследство', 'Историческо място']
    },
    6: {
      name: 'Македонски национален театър',
      description: 'Водещата театрална институция на Северна Македония, показваща богатото културно наследство на региона.',
      history: 'Основан през 1947 г. като водещ театър на Северна Македония, той е бил инструментален в развитието и запазването на македонските театрални традиции, като същевременно приема международни сътрудничества.',
      tags: ['Национален театър', 'Македонска култура', 'Международни сътрудничества', 'Културна идентичност']
    },
    7: {
      name: 'Национален театър в Ниш',
      description: 'Известен сръбски театър, познат с разнообразния си репертоар и значителния принос към културния живот на Ниш.',
      history: 'Основан през 1887 г., Националният театър в Ниш има богата история на театрално съвършенство, представяйки широк спектър от пиеси от класически до съвременни.',
      tags: ['Сръбски театър', 'Регионален театър', 'Класическа драма', 'Съвременни пиеси']
    },
    8: {
      name: 'ОСАИК "39 Маймуни"',
      description: 'Иновативен независим театрален колектив, известен с експериментални и съвременни представления.',
      history: 'ОСАИК "39 Маймуни" е динамична театрална група, която раздвижва границите на съвременния театър в София. Известни са с творческия си подход към разказването и експерименталните представления.',
      tags: ['Независим театър', 'Експериментален', 'Съвременен', 'Български театър']
    },
    9: {
      name: 'Интимен театър Битоля',
      description: 'Уютно интимно театрално пространство, посветено на приближаването на публиката до изкуството на представлението.',
      history: 'Интимният театър Битоля е културно бижу в историческия град Битоля, предоставяйки интимна обстановка за местни и международни продукции.',
      tags: ['Интимен театър', 'Македонска култура', 'Местни продукции', 'Общностен театър']
    }
  },
  mk: {
    1: {
      name: 'Драмски театар "Крум Кјуљавков"',
      description: 'Истакнат регионален театар познат по своите иновативни продукции и посветеност на бугарската драмска уметност.',
      history: 'Основан во средината на 20-тиот век, театарот бил културен краеугол камен на Ќустендил, презентирајќи и класични и современи дела додека негува локални таленти.',
      tags: ['Регионален театар', 'Бугарска драма', 'Современи дела', 'Заедничка театар']
    },
    2: {
      name: 'Народен театар "Иван Вазов"',
      description: 'Најстариот и најпрестижен театар во Бугарија, служејќи како национална сцена за драмска уметност.',
      history: 'Основан во 1904 година, Народниот театар "Иван Вазов" е именуван по бугарскиот национален поет Иван Вазов. Тој бил водечкото место за бугарски театар.',
      tags: ['Национален театар', 'Класична драма', 'Бугарско наследство', 'Историско место']
    },
    6: {
      name: 'Македонски национален театар',
      description: 'Водечката театарска институција на Северна Македонија, прикажувајќи го богатото културно наследство на регионот.',
      history: 'Основан во 1947 година како водечки театар на Северна Македонија, тој бил инструментален во развивањето и зачувувањето на македонските театарски традиции.',
      tags: ['Национален театар', 'Македонска култура', 'Меѓународни соработки', 'Културен идентитет']
    },
    7: {
      name: 'Национален театар во Ниш',
      description: 'Истакнат српски театар познат по својот разновиден репертоар и значителен придонес кон културниот живот на Ниш.',
      history: 'Основан во 1887 година, Националниот театар во Ниш има богата историја на театарско совршенство, презентирајќи широк спектар на пиеси.',
      tags: ['Српски театар', 'Регионален театар', 'Класична драма', 'Современи пиеси']
    },
    8: {
      name: 'ОСАИК "39 Мајмуни"',
      description: 'Иновативен независен театарски колектив познат по експериментални и современи претстави.',
      history: 'ОСАИК "39 Мајмуни" е динамична театарска група која ги поместува границите на современиот театар во Софија.',
      tags: ['Независен театар', 'Експериментален', 'Современ', 'Бугарски театар']
    },
    9: {
      name: 'Интимен театар Битола',
      description: 'Удобен интимен театарски простор посветен на приближување на публиката до уметноста на претставата.',
      history: 'Интимниот театар Битола е културен бисер во историскиот град Битола, обезбедувајќи интимна поставка за локални и меѓународни продукции.',
      tags: ['Интимен театар', 'Македонска култура', 'Локални продукции', 'Заедничка театар']
    }
  },
  sr: {
    1: {
      name: 'Драмски театар "Крум Кјуљавков"',
      description: 'Истакнути регионални театар познат по својим иновативним продукцијама и посвећености бугарској драмској уметности.',
      history: 'Основан средином 20. века, театар је био културни камен темељац Ћустендила, представљајући и класична и савремена дела док негује локалне таленте.',
      tags: ['Регионални театар', 'Бугарска драма', 'Савремена дела', 'Заједнички театар']
    },
    2: {
      name: 'Народни театар "Иван Вазов"',
      description: 'Најстарији и најпрестижнији театар у Бугарској, који служи као национална сцена за драмску уметност.',
      history: 'Основан 1904. године, Народни театар "Иван Вазов" је назван по бугарском националном песнику Ивану Вазову. Био је водеће место за бугарски театар.',
      tags: ['Национални театар', 'Класична драма', 'Бугарско наслеђе', 'Историјско место']
    },
    6: {
      name: 'Македонски национални театар',
      description: 'Водећа театарска институција Северне Македоније, приказујући богато културно наслеђе региона.',
      history: 'Основан 1947. године као водећи театар Северне Македоније, био је инструменталан у развијању и очувању македонских театарских традиција.',
      tags: ['Национални театар', 'Македонска култура', 'Међународне сарадње', 'Културни идентитет']
    },
    7: {
      name: 'Народно позориште у Нишу',
      description: 'Истакнуто српско позориште познато по свом разноврсном репертоару и значајном доприносу културном животу Ниша.',
      history: 'Основано 1887. године, Народно позориште у Нишу има богату историју позоришне изврсности, представљајући широк спектар представа од класичних до савремених.',
      tags: ['Српско позориште', 'Регионално позориште', 'Класична драма', 'Савремене представе']
    },
    8: {
      name: 'ОСАИК "39 Мајмуна"',
      description: 'Иновативни независни позоришни колектив познат по експерименталним и савременим представама.',
      history: 'ОСАИК "39 Мајмуна" је динамична позоришна група која помера границе савременог позоришта у Софији.',
      tags: ['Независно позориште', 'Експериментално', 'Савремено', 'Бугарско позориште']
    },
    9: {
      name: 'Интимно позориште Битољ',
      description: 'Удобан интимни позоришни простор посвећен приближавању публике уметности представе.',
      history: 'Интимно позориште Битољ је културни бисер у историјском граду Битољу, пружајући интимно окружење за локалне и међународне продукције.',
      tags: ['Интимно позориште', 'Македонска култура', 'Локалне продукције', 'Заједничко позориште']
    }
  }
};

// Base theatre data
const baseTheatres = [
  {
    id: 1,
    city: 'Kyustendil',
    country: 'Bulgaria',
    website: undefined,
    foundedYear: 1952,
    images: [
      { id: 1, imageUrl: '/kyustendil.jpg', caption: 'Theatre exterior', isPrimary: true },
      { id: 2, imageUrl: '/placeholder.svg?height=300&width=400&text=Theatre+Interior', caption: 'Main auditorium', isPrimary: false },
      { id: 3, imageUrl: '/placeholder.svg?height=300&width=400&text=Stage+Performance', caption: 'Recent performance', isPrimary: false }
    ]
  },
  {
    id: 2,
    city: 'Sofia',
    country: 'Bulgaria',
    website: undefined,
    foundedYear: 1904,
    images: [
      { id: 4, imageUrl: '/sofija.jpg', caption: 'Theatre exterior', isPrimary: true },
      { id: 5, imageUrl: '/placeholder.svg?height=300&width=400&text=Grand+Hall', caption: 'Grand auditorium', isPrimary: false },
      { id: 6, imageUrl: '/placeholder.svg?height=300&width=400&text=Classical+Performance', caption: 'Classical drama performance', isPrimary: false }
    ]
  },
  {
    id: 6,
    city: 'Skopje',
    country: 'North Macedonia',
    website: undefined,
    foundedYear: 1947,
    images: [
      { id: 13, imageUrl: '/skopje.jpg', caption: 'Theatre exterior', isPrimary: true },
      { id: 14, imageUrl: '/placeholder.svg?height=300&width=400&text=Cultural+Performance', caption: 'Cultural performance', isPrimary: false }
    ]
  },
  {
    id: 7,
    city: 'Niš',
    country: 'Serbia',
    website: undefined,
    foundedYear: 1887,
    images: [
      { id: 15, imageUrl: '/nish.jpg', caption: 'Theatre exterior', isPrimary: true },
      { id: 16, imageUrl: '/placeholder.svg?height=300&width=400&text=Theatre+Interior+Niš', caption: 'Theatre interior', isPrimary: false }
    ]
  },
  {
    id: 8,
    city: 'Sofia',
    country: 'Bulgaria',
    website: undefined,
    foundedYear: 2010,
    images: [
      { id: 17, imageUrl: '/36monkeys.jpg', caption: 'Theatre space', isPrimary: true },
      { id: 18, imageUrl: '/placeholder.svg?height=300&width=400&text=Experimental+Performance', caption: 'Experimental performance', isPrimary: false }
    ]
  },
  {
    id: 9,
    city: 'Bitola',
    country: 'North Macedonia',
    website: undefined,
    foundedYear: 1995,
    images: [
      { id: 19, imageUrl: '/bitolatheatre.jpg', caption: 'Theatre exterior', isPrimary: true },
      { id: 20, imageUrl: '/placeholder.svg?height=300&width=400&text=Intimate+Performance+Space', caption: 'Intimate performance space', isPrimary: false }
    ]
  }
];

export const getTheatresWithLanguage = async (language: string = 'en'): Promise<Theatre[]> => {
  // Get translations for the specified language, fallback to English
  const translations = theatreTranslations[language as keyof typeof theatreTranslations] || theatreTranslations.en;
  
  return baseTheatres.map(theatre => {
    const translation = translations[theatre.id as keyof typeof translations];
    return {
      ...theatre,
      name: translation?.name || `Theatre ${theatre.id}`,
      description: translation?.description || '',
      history: translation?.history || '',
      tags: translation?.tags || []
    };
  });
};
