"use client";

import React, { useState, useEffect } from 'react';
// ... existing code ...
import { isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
}

const AdminNewsPage = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [newArticleData, setNewArticleData] = useState({
    title: '',
    excerpt: '',
    imageUrl: '',
    date: '',
    category: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/'); // Redirect if not admin
    } else {
      setUserIsAdmin(true);
      fetchNewsArticles();
    }
  }, [router]);

  const fetchNewsArticles = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNewsArticles(data);
    } catch (error) {
      console.error('Failed to fetch news articles:', error);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArticleData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddArticle = async () => {
    if (newArticleData.title && newArticleData.excerpt && newArticleData.imageUrl && newArticleData.date && newArticleData.category) {
      try {
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newArticleData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setNewArticleData({ title: '', excerpt: '', imageUrl: '', date: '', category: '' });
        fetchNewsArticles();
      } catch (error) {
        console.error('Failed to add news article:', error);
        alert('Failed to add news article.');
      }
    } else {
      alert('Please fill in all fields to add a news article.');
    }
  };


  const handleEditClick = (article: NewsArticle) => {
    setEditingArticle(article);
    setNewArticleData(article);
  };

  const handleUpdateArticle = async () => {
    if (editingArticle && newArticleData.title && newArticleData.excerpt && newArticleData.imageUrl && newArticleData.date && newArticleData.category) {
      try {
        const response = await fetch('/api/news', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editingArticle.id, ...newArticleData }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setEditingArticle(null);
        setNewArticleData({ title: '', excerpt: '', imageUrl: '', date: '', category: '' });
        fetchNewsArticles();
      } catch (error) {
        console.error('Failed to update news article:', error);
        alert('Failed to update news article.');
      }
    } else {
      alert('Please fill in all fields to update the news article.');
    }
  };


  const handleDeleteArticle = async (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      try {
        const response = await fetch('/api/news', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchNewsArticles();
      } catch (error) {
        console.error('Failed to delete news article:', error);
        alert('Failed to delete news article.');
      }
    }
  };


  if (!userIsAdmin) {
    return <div className="container mx-auto px-4 py-8">Access Denied. You must be an administrator to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Admin News Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingArticle ? 'Edit News Article' : 'Add New News Article'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="title"
              placeholder="Title"
              value={newArticleData.title}
              onChange={handleInputChange}
            />
            <Input
              name="excerpt"
              placeholder="Excerpt"
              value={newArticleData.excerpt}
              onChange={handleInputChange}
            />
            <Input
              name="imageUrl"
              placeholder="Image URL"
              value={newArticleData.imageUrl}
              onChange={handleInputChange}
            />
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={newArticleData.date}
              onChange={handleInputChange}
            />
            <Input
              name="category"
              placeholder="Category"
              value={newArticleData.category}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          {editingArticle ? (
            <div className="flex space-x-2">
              <Button onClick={handleUpdateArticle}>Update Article</Button>
              <Button variant="outline" onClick={() => {
                setEditingArticle(null);
                setNewArticleData({ title: '', excerpt: '', imageUrl: '', date: '', category: '' });
              }}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={handleAddArticle}>Add Article</Button>
          )}
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Existing News Articles</h2>
      <div className="grid grid-cols-1 gap-4">
        {newsArticles.length === 0 ? (
          <p>No news articles found.</p>
        ) : (
          newsArticles.map(article => (
            <Card key={article.id}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-gray-600 text-sm">{article.date} | {article.category}</p>
                <p className="mt-2">{article.excerpt}</p>
                <img src={article.imageUrl} alt={article.title} className="mt-4 w-full h-48 object-cover rounded-md" />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleEditClick(article)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteArticle(article.id)}>Delete</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNewsPage;