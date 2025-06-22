'use server';



export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
}



type UserRole = 'super_admin' | 'admin' | 'seller' | 'client';

interface User {
  id: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'seller' | 'client';
  createdAt: string;
}

import { DatabaseStorage } from "./database-storage"

export async function getUsers() {
  const db = DatabaseStorage.getInstance()
  return db.getUsers()
}

export async function getUserByEmail(email: string) {
  const db = DatabaseStorage.getInstance()
  const users = await db.getUsers()
  const user = users.find((u: any) => u.email === email)
  return user
}

export const createUser = async (email: string, password: string, role: 'admin' | 'seller' | 'client'): Promise<User> => {

    const db = DatabaseStorage.getInstance();
    const existingUser = (await db.getUsers()).find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const _password = password; // WARNING: Storing plain text password
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    db.addUser(newUser);
    return newUser;
  }

export async function updateUserRole(userId: string, newRole: UserRole) {
  const db = DatabaseStorage.getInstance()
  const users = await db.getUsers()
  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex === -1) {
    throw new Error("User not found")
  }
  db.updateUser(userId, { ...users[userIndex], role: newRole });
  return { ...users[userIndex], role: newRole };
}

export async function deleteUser(userId: string): Promise<boolean> {
  const db = DatabaseStorage.getInstance()
  return db.deleteUser(userId)
}


  // For super_admin initialization only
export const getNewsArticles = async (): Promise<NewsArticle[]> => {
    const db = DatabaseStorage.getInstance();
    return db.getNews();
  }

export const createNewsArticle = async (title: string, excerpt: string, imageUrl: string, date: string, category: string): Promise<NewsArticle> => {
    const db = DatabaseStorage.getInstance();
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title,
      excerpt,
      imageUrl,
      date,
      category,
    };
    db.addNews(newArticle);
    return newArticle;
  }

export const updateNewsArticle = async (id: string, updatedFields: Partial<NewsArticle>): Promise<NewsArticle | undefined> => {
    const db = DatabaseStorage.getInstance();
    return db.updateNews(id, updatedFields);
  }

export const deleteNewsArticle = async (id: string): Promise<boolean> => {
    const db = DatabaseStorage.getInstance();
    return db.deleteNews(id);
  }

  // For super_admin initialization only
export const createSuperAdmin = async (email: string, password: string): Promise<User> => {
    const db = DatabaseStorage.getInstance();
    const existingSuperAdmin = (await db.getUsers()).find(user => user.role === 'super_admin');
    if (existingSuperAdmin) {
      throw new Error('Super admin already exists.');
    }

    const _password = password; // WARNING: Storing plain text password
    const newSuperAdmin: User = {
      id: Date.now().toString(),
      email,
      password,
      role: 'super_admin',
      createdAt: new Date().toISOString(),
    };
    db.addUser(newSuperAdmin);
    return newSuperAdmin;
  }
