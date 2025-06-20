'use server';

import fs from 'fs';
import path from 'path';
// WARNING: Storing passwords in plain text is a severe security risk and should NEVER be done in a production environment.
// This is for demonstration purposes only because bcryptjs could not be installed.

const DB_FILE = path.resolve(process.cwd(), 'data', 'users.json');

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
}

interface User {
  id: string;
  email: string;
  password: string; // WARNING: Storing plain text passwords
  role: 'super_admin' | 'admin' | 'seller' | 'client';
  createdAt: string;
}

interface DbData {
  users: User[];
  newsArticles: NewsArticle[];
}

const initializeDb = (): DbData => {
  if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], newsArticles: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const writeDb = (data: DbData) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export const db = {
  getUsers: (): User[] => {
    const data = initializeDb();
    return data.users;
  },

  getUserByEmail: (email: string, password?: string): User | undefined => {
    const data = initializeDb();
    const user = data.users.find(u => u.email === email);
    if (user && password && user.password !== password) {
      return undefined; // Password does not match
    }
    return user;
  },

  createUser: async (email: string, password: string, role: 'admin' | 'seller' | 'client'): Promise<User> => {
    const data = initializeDb();
    const existingUser = data.users.find(user => user.email === email);
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
    data.users.push(newUser);
    writeDb(data);
    return newUser;
  },

  updateUserRole: (id: string, newRole: 'admin' | 'seller' | 'client'): User | undefined => {
    const data = initializeDb();
    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      data.users[userIndex].role = newRole;
      writeDb(data);
      return data.users[userIndex];
    }
    return undefined;
  },

  deleteUser: (id: string): boolean => {
    const data = initializeDb();
    const initialLength = data.users.length;
    data.users = data.users.filter(user => user.id !== id);
    writeDb(data);
    return data.users.length < initialLength;
  },

  // For super_admin initialization only
  getNewsArticles: (): NewsArticle[] => {
    const data = initializeDb();
    return data.newsArticles;
  },

  createNewsArticle: (title: string, excerpt: string, imageUrl: string, date: string, category: string): NewsArticle => {
    const data = initializeDb();
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title,
      excerpt,
      imageUrl,
      date,
      category,
    };
    data.newsArticles.push(newArticle);
    writeDb(data);
    return newArticle;
  },

  updateNewsArticle: (id: string, updatedFields: Partial<NewsArticle>): NewsArticle | undefined => {
    const data = initializeDb();
    const articleIndex = data.newsArticles.findIndex(article => article.id === id);
    if (articleIndex > -1) {
      data.newsArticles[articleIndex] = { ...data.newsArticles[articleIndex], ...updatedFields };
      writeDb(data);
      return data.newsArticles[articleIndex];
    }
    return undefined;
  },

  deleteNewsArticle: (id: string): boolean => {
    const data = initializeDb();
    const initialLength = data.newsArticles.length;
    data.newsArticles = data.newsArticles.filter(article => article.id !== id);
    writeDb(data);
    return data.newsArticles.length < initialLength;
  },

  // For super_admin initialization only
  createSuperAdmin: async (email: string, password: string): Promise<User> => {
    const data = initializeDb();
    const existingSuperAdmin = data.users.find(user => user.role === 'super_admin');
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
    data.users.push(newSuperAdmin);
    writeDb(data);
    return newSuperAdmin;
  },
};