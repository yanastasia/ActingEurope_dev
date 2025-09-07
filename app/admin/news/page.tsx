"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { isAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface NewsArticle {
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

const AdminNewsPage = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [newArticleData, setNewArticleData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '',
    author: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
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
      // Fetch all articles from all languages
      const languages = ['en', 'bg', 'mk', 'sr'];
      const allArticles: NewsArticle[] = [];
      
      for (const lang of languages) {
        const response = await fetch(`/api/news?language=${lang}`);
        if (response.ok) {
          const data = await response.json();
          allArticles.push(...data);
        }
      }
      
      setNewsArticles(allArticles);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArticleData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.url;
  };

  const handleAddArticle = async () => {
    if (newArticleData.title && newArticleData.content && newArticleData.category) {
      try {
        setIsUploading(true);
        let imageUrl = newArticleData.imageUrl;
        
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }
        
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newArticleData,
            imageUrl
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setNewArticleData({ title: '', content: '', imageUrl: '', category: '', author: '' });
        setImageFile(null);
        setImagePreview('');
        fetchNewsArticles();
        alert('News article created successfully for all languages!');
      } catch (error) {
        console.error('Failed to add news article:', error);
        alert('Failed to add news article.');
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please fill in title, content, and category to add a news article.');
    }
  };

  const handleEditClick = (article: NewsArticle) => {
    setEditingArticle(article);
    setNewArticleData({
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl || '',
      category: article.category || '',
      author: article.author || '',
    });
    setImagePreview(article.imageUrl || '');
  };

  const handleUpdateArticle = async () => {
    if (editingArticle && newArticleData.title && newArticleData.content && newArticleData.category) {
      try {
        setIsUploading(true);
        let imageUrl = newArticleData.imageUrl;
        
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }
        
        const response = await fetch('/api/news', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            id: editingArticle.id, 
            title: newArticleData.title,
            content: newArticleData.content,
            imageUrl,
            date: editingArticle.publishedAt || editingArticle.createdAt, // Required by API
            category: newArticleData.category,
            contentLanguage: editingArticle.contentLanguage, // Required by API
            translationGroup: editingArticle.translationGroup // Required by API
          }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setEditingArticle(null);
        setNewArticleData({ title: '', content: '', imageUrl: '', category: '', author: '' });
        setImageFile(null);
        setImagePreview('');
        fetchNewsArticles();
      } catch (error) {
        console.error('Failed to update news article:', error);
        alert('Failed to update news article.');
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please fill in title, content, and category to update the news article.');
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (confirm('Are you sure you want to delete this news article? This will delete all language versions.')) {
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setNewArticleData(prev => ({ ...prev, imageUrl: '' }));
  };

  if (!userIsAdmin) {
    return <div className="container mx-auto px-4 py-8">Access Denied. You must be an administrator to view this page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Admin News Management</h1>
      <p className="text-gray-600 mb-6">Creating a news article will automatically generate versions in all supported languages (English, Bulgarian, Macedonian, Serbian).</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingArticle ? 'Edit News Article' : 'Add New News Article'}</CardTitle>
          {editingArticle && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-800">Editing Language:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                   {(() => {
                     const langNames = {
                       en: 'English',
                       bg: 'Bulgarian', 
                       mk: 'Macedonian',
                       sr: 'Serbian'
                     };
                     return langNames[editingArticle.contentLanguage as keyof typeof langNames] || editingArticle.contentLanguage.toUpperCase();
                   })()}
                 </span>
              </div>
              <p className="text-xs text-blue-600 mt-1">You are currently editing the {editingArticle.contentLanguage.toUpperCase()} version of this article.</p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Article title"
                value={newArticleData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Full article content"
                value={newArticleData.content}
                onChange={handleInputChange}
                rows={8}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Article category"
                  value={newArticleData.category}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author name (optional)"
                  value={newArticleData.author}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <Label>Image</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="mt-2">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="text-sm text-gray-600">Upload an image or </span>
                          <span className="text-sm text-blue-600 hover:text-blue-500">browse</span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-2">
                <Label htmlFor="imageUrl">Or enter image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={newArticleData.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {editingArticle ? (
            <div className="flex space-x-2">
              <Button onClick={handleUpdateArticle} disabled={isUploading}>
                {isUploading ? 'Updating...' : 'Update Article'}
              </Button>
              <Button variant="outline" onClick={() => {
                setEditingArticle(null);
                setNewArticleData({ title: '', content: '', imageUrl: '', category: '', author: '' });
                setImageFile(null);
                setImagePreview('');
              }}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={handleAddArticle} disabled={isUploading}>
              {isUploading ? 'Creating...' : 'Create Article (All Languages)'}
            </Button>
          )}
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Existing News Articles (All Languages)</h2>
      <div className="grid grid-cols-1 gap-4">
        {newsArticles.length === 0 ? (
          <p>No news articles found.</p>
        ) : (
          // Group articles by translation group
          Object.entries(
            newsArticles.reduce((groups: Record<string, NewsArticle[]>, article) => {
              const key = article.translationGroup || `single_${article.id}`;
              if (!groups[key]) groups[key] = [];
              groups[key].push(article);
              return groups;
            }, {})
          ).map(([groupKey, articles]) => {
            const sortedArticles = articles.sort((a, b) => {
              const langOrder = ['en', 'bg', 'mk', 'sr'];
              return langOrder.indexOf(a.contentLanguage) - langOrder.indexOf(b.contentLanguage);
            });
            const mainArticle = sortedArticles[0]; // Use first article as main display
            
            return (
              <Card key={groupKey} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{mainArticle.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {sortedArticles.map(article => {
                        const langNames = { en: 'EN', bg: 'BG', mk: 'MK', sr: 'SR' };
                        return (
                          <span 
                            key={article.id}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {langNames[article.contentLanguage as keyof typeof langNames] || article.contentLanguage.toUpperCase()}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {mainArticle.publishedAt ? new Date(mainArticle.publishedAt).toLocaleDateString() : new Date(mainArticle.createdAt).toLocaleDateString()} | 
                    {mainArticle.category} | 
                    {mainArticle.author || 'Admin'} | 
                    {sortedArticles.length} language{sortedArticles.length > 1 ? 's' : ''}
                  </p>
                  <p className="mt-2 text-gray-700 line-clamp-3">{mainArticle.content}</p>
                  {mainArticle.imageUrl && (
                    <Image 
                      src={mainArticle.imageUrl} 
                      alt={mainArticle.title} 
                      width={400}
                      height={192}
                      className="mt-4 w-full h-48 object-cover rounded-md" 
                    />
                  )}
                  
                  {/* Show individual language versions for editing */}
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Language Versions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {sortedArticles.map(article => {
                        const langNames = { en: 'English', bg: 'Bulgarian', mk: 'Macedonian', sr: 'Serbian' };
                        return (
                          <div key={article.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">
                              <strong>{langNames[article.contentLanguage as keyof typeof langNames] || article.contentLanguage}:</strong> {article.title}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditClick(article)}
                            >
                              Edit
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="destructive" onClick={() => handleDeleteArticle(mainArticle.id)}>Delete All Languages</Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminNewsPage;