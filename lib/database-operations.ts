import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  category: string | null;
  author: string | null;
  publishedAt: Date | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
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


export const getNewsArticles = async (): Promise<NewsArticle[]> => {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { created_at: 'desc' }
    });
    
    return articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    }));
  }

export const createNewsArticle = async (title: string, content: string, excerpt?: string, imageUrl?: string, category?: string, author?: string): Promise<NewsArticle> => {
    const article = await prisma.newsArticle.create({
      data: {
        title,
        content,
        excerpt,
        image_url: imageUrl,
        category,
        author,
        is_published: false
      }
    });
    
    return {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    };
  }

export const updateNewsArticle = async (id: number, updatedFields: Partial<NewsArticle>): Promise<NewsArticle | null> => {
    try {
      const article = await prisma.newsArticle.update({
        where: { id },
        data: {
          title: updatedFields.title,
          content: updatedFields.content,
          excerpt: updatedFields.excerpt,
          image_url: updatedFields.imageUrl,
          category: updatedFields.category,
          author: updatedFields.author,
          is_published: updatedFields.isPublished,
          published_at: updatedFields.publishedAt
        }
      });
      
      return {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.image_url,
        category: article.category,
        author: article.author,
        publishedAt: article.published_at,
        isPublished: article.is_published,
        createdAt: article.created_at,
        updatedAt: article.updated_at
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
