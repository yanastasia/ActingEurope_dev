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
