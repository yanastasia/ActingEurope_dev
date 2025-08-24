import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
    161: {
      name: 'Drama Theatre Kyustendil',
      description: 'A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.',
      history: 'Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre has maintained its reputation for artistic excellence and community engagement.',
      tags: ['Regional Theatre', 'Bulgarian Drama', 'Contemporary Works', 'Community Theatre']
    },
    162: {
      name: '"Ivan Vazov" National Theatre',
      description: 'Bulgaria\'s oldest and most prestigious theatre, serving as the national stage for dramatic arts.',
      history: 'Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria\'s national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity. Throughout its history, it has been home to the most celebrated Bulgarian actors and directors.',
      tags: ['National Theatre', 'Classical Drama', 'Bulgarian Heritage', 'Historic Venue']
    },
    163: {
      name: 'Macedonian National Theatre',
      description: 'The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.',
      history: 'Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.',
      tags: ['National Theatre', 'Macedonian Culture', 'International Collaborations', 'Cultural Identity']
    },
    164: {
      name: 'National Theatre in Niš',
      description: 'A prominent Serbian theatre known for its diverse repertoire and significant contribution to the cultural life of Niš.',
      history: 'Founded in 1887, the National Theatre in Niš has a rich history of theatrical excellence, presenting a wide range of plays from classical to contemporary. It has been a vital cultural institution for the city and the region, fostering artistic talent and engaging with the community.',
      tags: ['Serbian Theatre', 'Regional Theatre', 'Classical Drama', 'Contemporary Plays']
    },
    165: {
      name: 'OSAIK "39 Monkeys"',
      description: 'An innovative independent theatre collective known for experimental and contemporary performances.',
      history: 'OSAIK \'39 Monkeys\' is a dynamic theatre group that has been pushing the boundaries of contemporary theatre in Sofia. Known for their creative approach to storytelling and experimental performances.',
      tags: ['Independent Theatre', 'Experimental', 'Contemporary', 'Bulgarian Theatre']
    },
    166: {
      name: 'Intimate Theatre Bitola',
      description: 'A cozy intimate theatre space dedicated to bringing audiences closer to the art of performance.',
      history: 'The Intimate Theater Bitola has been a cultural gem in the historic city of Bitola, providing an intimate setting for both local and international productions. The theatre focuses on creating meaningful connections between performers and audiences through its close-knit performance space.',
      tags: ['Intimate Theatre', 'Macedonian Culture', 'Local Productions', 'Community Theatre']
    }
  },
  bg: {
    161: {
      name: 'Драматичен театър "Крум Кюлявков"',
      description: 'Известен регионален театър, познат с иновативните си постановки и отдадеността към българското драматично изкуство.',
      history: 'Основан в средата на 20-ти век, театърът е културен краеъгълен камък на Кюстендил, представяйки както класически, така и съвременни произведения, докато отглежда местни таланти.',
      tags: ['Регионален театър', 'Българска драма', 'Съвременни произведения', 'Общностен театър']
    },
    162: {
      name: 'Народен театър "Иван Вазов"',
      description: 'Най-старият и престижен театър в България, служещ като национална сцена за драматично изкуство.',
      history: 'Основан през 1904 г., Народният театър "Иван Вазов" е наименуван на българския национален поет Иван Вазов. Той е водещото място за български театър, домакин на легендарни представления и международни сътрудничества.',
      tags: ['Национален театър', 'Класическа драма', 'Българско наследство', 'Историческо място']
    },
    163: {
      name: 'Македонски национален театър',
      description: 'Водещата театрална институция на Северна Македония, показваща богатото културно наследство на региона.',
      history: 'Основан през 1947 г. като основен театър на Северна Македония, той е бил инструментален в развитието и запазването на македонските театрални традиции.',
      tags: ['Национален театър', 'Македонска култура', 'Международни сътрудничества', 'Културна идентичност']
    },
    164: {
      name: 'Национален театър в Ниш',
      description: 'Известен сръбски театър, познат с разнообразния си репертоар и значителния принос към културния живот на Ниш.',
      history: 'Основан през 1887 г., Националният театър в Ниш има богата история на театрално съвършенство, представяйки широк спектър от пиеси от класически до съвременни.',
      tags: ['Сръбски театър', 'Регионален театър', 'Класическа драма', 'Съвременни пиеси']
    },
    165: {
      name: 'ОСАИК "39 Маймуни"',
      description: 'Иновативен независим театрален колектив, известен с експериментални и съвременни представления.',
      history: 'ОСАИК "39 Маймуни" е динамична театрална група, която раздвижва границите на съвременния театър в София. Известни са с творческия си подход към разказването и експерименталните представления.',
      tags: ['Независим театър', 'Експериментален', 'Съвременен', 'Български театър']
    },
    166: {
      name: 'Интимен театър Битоля',
      description: 'Уютно интимно театрално пространство, посветено на приближаването на публиката до изкуството на представлението.',
      history: 'Интимният театър Битоля е културно бижу в историческия град Битоля, предоставяйки интимна обстановка за местни и международни постановки.',
      tags: ['Интимен театър', 'Македонска култура', 'Местни постановки', 'Общностен театър']
    }
  },
  mk: {
    161: {
      name: 'Драмски театар "Крум Кјуљавков"',
      description: 'Истакнат регионален театар познат по своите иновативни продукции и посветеност на бугарската драмска уметност.',
      history: 'Основан во средината на 20-тиот век, театарот бил културен краеуголен камен на Кјустендил, презентирајќи и класични и современи дела.',
      tags: ['Регионален театар', 'Бугарска драма', 'Современи дела', 'Заедничка театар']
    },
    162: {
      name: 'Народен театар "Иван Вазов"',
      description: 'Најстариот и најпрестижен театар во Бугарија, служејќи како национална сцена за драмска уметност.',
      history: 'Основан во 1904 година, Народниот театар "Иван Вазов" е именуван по бугарскиот национален поет Иван Вазов. Тој бил водечкото место за бугарски театар.',
      tags: ['Национален театар', 'Класична драма', 'Бугарско наследство', 'Историско место']
    },
    163: {
      name: 'Македонски национален театар',
      description: 'Водечката театарска институција на Северна Македонија, прикажувајќи го богатото културно наследство на регионот.',
      history: 'Основан во 1947 година како премиер театар на Северна Македонија, тој бил инструментален во развивањето и зачувувањето на македонските театарски традиции.',
      tags: ['Национален театар', 'Македонска култура', 'Меѓународни соработки', 'Културен идентитет']
    },
    164: {
      name: 'Национален театар во Ниш',
      description: 'Истакнат српски театар познат по својот разновиден репертоар и значителен придонес кон културниот живот на Ниш.',
      history: 'Основан во 1887 година, Националниот театар во Ниш има богата историја на театарско совршенство, презентирајќи широк спектар на пиеси.',
      tags: ['Српски театар', 'Регионален театар', 'Класична драма', 'Современи пиеси']
    },
    165: {
      name: 'ОСАИК "39 Мајмуни"',
      description: 'Иновативен независен театарски колектив познат по експериментални и современи претстави.',
      history: 'ОСАИК "39 Мајмуни" е динамична театарска група која ги поместува границите на современиот театар во Софија.',
      tags: ['Независен театар', 'Експериментален', 'Современ', 'Бугарски театар']
    },
    166: {
      name: 'Интимен театар Битола',
      description: 'Удобен интимен театарски простор посветен на приближувањето на публиката до уметноста на претставата.',
      history: 'Интимниот театар Битола е културен скапоцен камен во историскиот град Битола, обезбедувајќи интимна поставка за локални и меѓународни продукции.',
      tags: ['Интимен театар', 'Македонска култура', 'Локални продукции', 'Заедничка театар']
    }
  },
  sr: {
    161: {
      name: 'Драмски театар "Крум Кјуљавков"',
      description: 'Истакнути регионални театар познат по својим иновативним продукцијама и посвећености бугарској драмској уметности.',
      history: 'Основан средином 20. века, театар је био културни камен темељац Кјустендила, представљајући и класична и савремена дела док негује локалне таленте.',
      tags: ['Регионални театар', 'Бугарска драма', 'Савремена дела', 'Заједнички театар']
    },
    162: {
      name: 'Народни театар "Иван Вазов"',
      description: 'Најстарији и најпрестижнији театар у Бугарској, који служи као национална сцена за драмску уметност.',
      history: 'Основан 1904. године, Народни театар "Иван Вазов" је назван по бугарском националном песнику Ивану Вазову. Био је водеће место за бугарски театар.',
      tags: ['Национални театар', 'Класична драма', 'Бугарско наслеђе', 'Историјско место']
    },
    163: {
      name: 'Македонски национални театар',
      description: 'Водећа позоришна институција Северне Македоније, приказујући богато културно наслеђе региона.',
      history: 'Основан 1947. године као премијерни театар Северне Македоније, био је инструменталан у развоју и очувању македонских позоришних традиција.',
      tags: ['Национални театар', 'Македонска култура', 'Међународне сарадње', 'Културни идентитет']
    },
    164: {
      name: 'Народно позориште у Нишу',
      description: 'Истакнуто српско позориште познато по свом разноврсном репертоару и значајном доприносу културном животу Ниша.',
      history: 'Основано 1887. године, Народно позориште у Нишу има богату историју позоришне изврсности, представљајући широк спектар представа од класичних до савремених.',
      tags: ['Српско позориште', 'Регионално позориште', 'Класична драма', 'Савремене представе']
    },
    165: {
      name: 'ОСАИК "39 Мајмуна"',
      description: 'Иновативни независни позоришни колектив познат по експерименталним и савременим представама.',
      history: 'ОСАИК "39 Мајмуна" је динамична позоришна група која помера границе савременог позоришта у Софији.',
      tags: ['Независно позориште', 'Експериментално', 'Савремено', 'Бугарско позориште']
    },
    166: {
      name: 'Интимни театар Битоља',
      description: 'Удобан интимни позоришни простор посвећен приближавању публике уметности представе.',
      history: 'Интимни театар Битоља је културни драгуљ у историјском граду Битољи, пружајући интимно окружење за локалне и међународне продукције.',
      tags: ['Интимни театар', 'Македонска култура', 'Локалне продукције', 'Заједнички театар']
    }
  }
};

// Base theatre data - only active theatre IDs used in events
const baseTheatres = [
  {
    id: 161,
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
    id: 162,
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
    id: 163,
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
    id: 164,
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
    id: 165,
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
    id: 166,
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

export const getTheatreByIdAndLanguage = async (theatreId: number, language: string = 'en'): Promise<Theatre | null> => {
  try {
    // First try to find theatre with exact ID and language
    let theatre = await prisma.theatre.findFirst({
      where: {
        id: theatreId,
        content_language: language
      },
      include: {
        images: true,
        tags: true
      }
    });
    
    // If not found, try to find theatre with same translation group and language
    if (!theatre) {
      const originalTheatre = await prisma.theatre.findUnique({
        where: { id: theatreId }
      });
      
      if (originalTheatre?.translation_group) {
        theatre = await prisma.theatre.findFirst({
          where: {
            translation_group: originalTheatre.translation_group,
            content_language: language
          },
          include: {
            images: true,
            tags: true
          }
        });
      }
    }
    
    // If still not found, fallback to English
    if (!theatre && language !== 'en') {
      return await getTheatreByIdAndLanguage(theatreId, 'en');
    }
    
    if (!theatre) {
      return null;
    }
    
    return {
      id: theatre.id,
      name: theatre.name,
      city: theatre.city,
      country: theatre.country,
      description: theatre.description || '',
      history: theatre.history || '',
      website: theatre.website ?? undefined,
      foundedYear: theatre.founded_year || 0,
      images: theatre.images.map(img => ({
        id: img.id,
        imageUrl: img.image_url,
        caption: img.caption ?? undefined,
        isPrimary: img.is_primary
      })),
      tags: theatre.tags.map(tag => tag.tag_name)
    };
  } catch (error) {
    console.error('Error fetching theatre:', error);
    return null;
  }
};

export const getTheatreNamesByIds = async (theatreIds: number[], language: string = 'en'): Promise<string[]> => {
  try {
    const theatreNames: string[] = [];
    
    for (const theatreId of theatreIds) {
      const theatre = await getTheatreByIdAndLanguage(theatreId, language);
      if (theatre) {
        theatreNames.push(theatre.name);
      } else {
        theatreNames.push(`Theatre ${theatreId}`);
      }
    }
    
    return theatreNames;
  } catch (error) {
    console.error('Error fetching theatre names:', error);
    return theatreIds.map(id => `Theatre ${id}`);
  }
};

// Event Management Functions
export interface Event {
  id: number;
  title: string;
  description: string | null;
  eventType: string;
  eventDate: Date;
  eventTime: Date;
  price: number;
  imageUrl: string | null;
  posterUrl: string | null;
  language: string | null;
  contentLanguage: string;
  translationGroup: string | null;
  performanceLanguage: string[] | null;
  subtitleLanguage: string[] | null;
  genre: string | null;
  company: string[];
  director: string | null;
  cast: string[];

  subtitles: string | null;
  duration: string | null;
  isFeatured: boolean;
  theatreId: number;
  venueId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getEventsByLanguage = async (language: string = 'en'): Promise<Event[]> => {
  const events = await prisma.event.findMany({
    where: {
      content_language: language
    },
    include: {
      theatre: true,
      venue: true
    },
    orderBy: [
      { event_date: 'asc' },
      { event_time: 'asc' }
    ]
  });

  return events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.event_type,
    eventDate: event.event_date,
    eventTime: event.event_time,
    price: Number(event.price),
    imageUrl: event.image_url,
    posterUrl: event.poster_url,
    language: event.language,
    contentLanguage: event.content_language,
    translationGroup: event.translation_group,
    genre: event.genre,
    company: event.company,
    director: event.director,
    cast: event.cast,

    subtitles: event.subtitles,
    duration: event.duration,
    isFeatured: event.is_featured,
    performanceLanguage: event.performance_language ? event.performance_language.split(',').map(lang => lang.trim()) : null,
    subtitleLanguage: event.subtitle_language ? event.subtitle_language.split(',').map(lang => lang.trim()) : null,
    theatreId: event.theatre_id,
    venueId: event.venue_id,
    createdAt: event.created_at,
    updatedAt: event.updated_at
  }));
};

export const getAllEvents = async (): Promise<Event[]> => {
  const events = await prisma.event.findMany({
    include: {
      theatre: true,
      venue: true
    },
    orderBy: [
      { event_date: 'asc' },
      { event_time: 'asc' }
    ]
  });

  return events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.event_type,
    eventDate: event.event_date,
    eventTime: event.event_time,
    price: Number(event.price),
    imageUrl: event.image_url,
    posterUrl: event.poster_url,
    language: event.language,
    contentLanguage: event.content_language,
    translationGroup: event.translation_group,
    genre: event.genre,
    company: event.company,
    director: event.director,
    cast: event.cast,

    subtitles: event.subtitles,
    duration: event.duration,
    isFeatured: event.is_featured,
    performanceLanguage: event.performance_language ? event.performance_language.split(',').map(lang => lang.trim()) : null,
    subtitleLanguage: event.subtitle_language ? event.subtitle_language.split(',').map(lang => lang.trim()) : null,
    theatreId: event.theatre_id,
    venueId: event.venue_id,
    createdAt: event.created_at,
    updatedAt: event.updated_at
  }));
};

export const createEventWithTranslations = async (
  title: string,
  description: string,
  eventType: string,
  eventDate: Date,
  eventTime: Date,
  theatreId: number,
  venueId?: number,
  price: number = 0,
  imageUrl?: string,
  posterUrl?: string,
  language?: string,
  genre?: string,
  company: string[] = [],
  director?: string,
  cast: string[] = [],

  subtitles?: string,
  duration?: string,
  isFeatured: boolean = false,
  performanceLanguage?: string,
  subtitleLanguage?: string
): Promise<Event[]> => {

  const translationGroup = uuidv4();
  const languages = ['en', 'bg', 'mk', 'sr'];
  
  const createdEvents: Event[] = [];
  
  for (const lang of languages) {
    let localizedTitle = title;
    let localizedDescription = description;
    // Add language indicators for non-English versions
    if (lang !== 'en') {
      const langSuffix = ` (${lang.toUpperCase()})`;
      localizedTitle = `${title}${langSuffix}`;
      if (localizedDescription) {
        localizedDescription = `${description}${langSuffix}`;
      }
    }
    
    const event = await prisma.event.create({
      data: {
        title: localizedTitle,
        description: localizedDescription,
        event_type: eventType as any,
        event_date: eventDate,
        event_time: eventTime,
        theatre_id: theatreId,
        venue_id: venueId,
        price: price,
        image_url: imageUrl,
        poster_url: posterUrl,
        language: language,
        content_language: lang,
        translation_group: translationGroup,
        genre: genre,
        company: company,
        director: director,
        cast: cast,
    
        subtitles: subtitles,
        duration: duration,
        is_featured: isFeatured,
        performance_language: performanceLanguage,
        subtitle_language: subtitleLanguage
      }
    });
    
    createdEvents.push({
      id: event.id,
      title: event.title,
      description: event.description,
      eventType: event.event_type,
      eventDate: event.event_date,
      eventTime: event.event_time,
      price: Number(event.price),
      imageUrl: event.image_url,
      posterUrl: event.poster_url,
      language: event.language,
      contentLanguage: event.content_language,
      translationGroup: event.translation_group,
      performanceLanguage: event.performance_language ? event.performance_language.split(',').map(lang => lang.trim()) : null,
      subtitleLanguage: event.subtitle_language ? event.subtitle_language.split(',').map(lang => lang.trim()) : null,
      genre: event.genre,
      company: event.company,
      director: event.director,
      cast: event.cast,

      subtitles: event.subtitles,
      duration: event.duration,
      isFeatured: event.is_featured,
      theatreId: event.theatre_id,
      venueId: event.venue_id,
      createdAt: event.created_at,
      updatedAt: event.updated_at
    });
  }
  
  return createdEvents;
};

export const getEventTranslationGroup = async (eventId: number): Promise<Event[]> => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });
  
  if (!event || !event.translation_group) {
    return [];
  }
  
  const events = await prisma.event.findMany({
    where: {
      translation_group: event.translation_group
    },
    include: {
      theatre: true,
      venue: true
    },
    orderBy: {
      content_language: 'asc'
    }
  });
  
  return events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    eventType: event.event_type,
    eventDate: event.event_date,
    eventTime: event.event_time,
    price: Number(event.price),
    imageUrl: event.image_url,
    posterUrl: event.poster_url,
    language: event.language,
    contentLanguage: event.content_language,
    translationGroup: event.translation_group,
    performanceLanguage: event.performance_language ? event.performance_language.split(',').map(lang => lang.trim()) : null,
    subtitleLanguage: event.subtitle_language ? event.subtitle_language.split(',').map(lang => lang.trim()) : null,
    genre: event.genre,
    company: event.company,
    director: event.director,
    cast: event.cast,
    
    subtitles: event.subtitles,
    duration: event.duration,
    isFeatured: event.is_featured,
    theatreId: event.theatre_id,
    venueId: event.venue_id,
    createdAt: event.created_at,
    updatedAt: event.updated_at
  }));
};

export const updateEvent = async (id: number, updatedFields: any): Promise<Event | null> => {
  console.log('🔥 UPDATEEVENT FUNCTION ENTRY POINT 🔥');
  console.log('=== UPDATE EVENT FUNCTION CALLED ===');
  console.log('ID:', id);
  console.log('Fields type:', typeof updatedFields);
  console.log('Fields keys:', Object.keys(updatedFields || {}));
  try {
    console.log('updateEvent called with id:', id, 'and fields:', updatedFields)
    // Build data object with only defined fields
    const updateData: any = {};
    
    if (updatedFields.title !== undefined) updateData.title = updatedFields.title;
    if (updatedFields.description !== undefined) updateData.description = updatedFields.description;
    if (updatedFields.eventType !== undefined) updateData.event_type = updatedFields.eventType;
    if (updatedFields.eventDate !== undefined) {
      updateData.event_date = updatedFields.eventDate instanceof Date ? updatedFields.eventDate : new Date(updatedFields.eventDate);
    }
    if (updatedFields.eventTime !== undefined) {
      if (updatedFields.eventTime instanceof Date) {
        updateData.event_time = updatedFields.eventTime;
      } else {
        // Handle time string like "19:30" by creating a date with today's date
        const timeString = updatedFields.eventTime.toString();
        if (timeString.match(/^\d{1,2}:\d{2}$/)) {
          // If it's a time format like "19:30", combine with today's date
          const today = new Date();
          const [hours, minutes] = timeString.split(':').map(Number);
          const timeDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
          updateData.event_time = timeDate;
        } else {
          // Try to parse as a full date string
          const parsedDate = new Date(updatedFields.eventTime);
          if (!isNaN(parsedDate.getTime())) {
            updateData.event_time = parsedDate;
          } else {
            console.error('Invalid eventTime format:', updatedFields.eventTime);
            // Skip this field if it's invalid
          }
        }
      }
    }
    if (updatedFields.theatreId !== undefined) updateData.theatre_id = updatedFields.theatreId;
    if (updatedFields.venueId !== undefined) updateData.venue_id = updatedFields.venueId;
    if (updatedFields.price !== undefined) updateData.price = updatedFields.price;
    if (updatedFields.imageUrl !== undefined) updateData.image_url = updatedFields.imageUrl;
    if (updatedFields.posterUrl !== undefined) updateData.poster_url = updatedFields.posterUrl;
    if (updatedFields.language !== undefined) updateData.language = updatedFields.language;
    if (updatedFields.contentLanguage !== undefined) updateData.content_language = updatedFields.contentLanguage;
    if (updatedFields.translationGroup !== undefined) updateData.translation_group = updatedFields.translationGroup;
    if (updatedFields.performanceLanguage !== undefined) updateData.performance_language = Array.isArray(updatedFields.performanceLanguage) ? updatedFields.performanceLanguage.join(',') : updatedFields.performanceLanguage;
    if (updatedFields.subtitleLanguage !== undefined) updateData.subtitle_language = Array.isArray(updatedFields.subtitleLanguage) ? updatedFields.subtitleLanguage.join(',') : updatedFields.subtitleLanguage;
    if (updatedFields.genre !== undefined) updateData.genre = updatedFields.genre;
    if (updatedFields.company !== undefined) updateData.company = Array.isArray(updatedFields.company) ? updatedFields.company : [updatedFields.company];
    if (updatedFields.director !== undefined) updateData.director = updatedFields.director;
    if (updatedFields.cast !== undefined) updateData.cast = Array.isArray(updatedFields.cast) ? updatedFields.cast.join(',') : updatedFields.cast;

    if (updatedFields.subtitles !== undefined) updateData.subtitles = updatedFields.subtitles;
     if (updatedFields.duration !== undefined) updateData.duration = updatedFields.duration;
     if (updatedFields.isFeatured !== undefined) updateData.is_featured = updatedFields.isFeatured;

     console.log('updateData being sent to prisma:', JSON.stringify(updateData, null, 2))
     
     // Log each date field specifically
     if (updateData.event_date) {
       console.log('event_date type:', typeof updateData.event_date);
       console.log('event_date value:', updateData.event_date);
       console.log('event_date toString:', updateData.event_date.toString());
       console.log('event_date isValid:', !isNaN(updateData.event_date.getTime()));
     }
     if (updateData.event_time) {
       console.log('event_time type:', typeof updateData.event_time);
       console.log('event_time value:', updateData.event_time);
       console.log('event_time toString:', updateData.event_time.toString());
       console.log('event_time isValid:', !isNaN(updateData.event_time.getTime()));
     }
     
     let event;
     try {
       event = await prisma.event.update({
         where: { id },
         data: updateData
       });
       console.log('Event returned from prisma:', event)
     } catch (prismaError: any) {
       console.error('🚨 DETAILED PRISMA UPDATE ERROR 🚨');
       console.error('Error code:', prismaError.code);
       console.error('Error message:', prismaError.message);
       console.error('Error meta:', prismaError.meta);
       console.error('Full error object:', JSON.stringify(prismaError, null, 2));
       return null; // Return null instead of throwing to avoid outer catch
     }
     
     const transformedEvent = {
       id: event.id,
       title: event.title,
       description: event.description,
       eventType: event.event_type,
       eventDate: event.event_date,
       eventTime: event.event_time,
       price: Number(event.price),
       imageUrl: event.image_url,
       posterUrl: event.poster_url,
       language: event.language,
       contentLanguage: event.content_language,
       translationGroup: event.translation_group,
       performanceLanguage: event.performance_language ? event.performance_language.split(',').map(lang => lang.trim()) : null,
       subtitleLanguage: event.subtitle_language ? event.subtitle_language.split(',').map(lang => lang.trim()) : null,
       genre: event.genre,
       company: Array.isArray(event.company) ? event.company : (event.company ? (event.company as string).split(',').map(comp => comp.trim()) : []),
       director: event.director,
       cast: event.cast,

       subtitles: event.subtitles,
       duration: event.duration,
       isFeatured: event.is_featured,
       theatreId: event.theatre_id,
       venueId: event.venue_id,
       createdAt: event.created_at,
       updatedAt: event.updated_at
     };
     console.log('Transformed event being returned:', transformedEvent)
     return transformedEvent;
   } catch (error) {
     console.error('Error updating event:', error);
     return null;
   }
};

export const deleteEventWithTranslations = async (id: number): Promise<boolean> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id }
    });
    
    if (!event) {
      return false;
    }
    
    if (event.translation_group) {
      // Delete all events in the translation group
      await prisma.event.deleteMany({
        where: {
          translation_group: event.translation_group
        }
      });
    } else {
      // Delete only this event
      await prisma.event.delete({
        where: { id }
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
};
