'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus } from 'lucide-react';

interface AboutPage {
  id: number;
  title: string;
  content: string;
  contentLanguage: string;
  translationGroup: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminAboutPage() {
  const [aboutPages, setAboutPages] = useState<AboutPage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPage, setEditingPage] = useState<AboutPage | null>(null);
  const [newPageData, setNewPageData] = useState({
    title: '',
    content: '',
    contentLanguage: 'en',
    translationGroup: undefined as string | undefined
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    fetchAboutPages();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchAboutPages = async () => {
    try {
      // Fetch about pages for all languages
      const languages = ['en', 'bg', 'mk', 'sr'];
      const allPages: AboutPage[] = [];
      
      for (const lang of languages) {
        const response = await fetch(`/api/about?language=${lang}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            allPages.push({
              id: data.id,
              title: data.title,
              content: data.content,
              contentLanguage: data.content_language,
              translationGroup: data.translation_group,
              createdAt: new Date(data.created_at),
              updatedAt: new Date(data.updated_at)
            });
          }
        }
      }
      
      setAboutPages(allPages);
    } catch (error) {
      console.error('Error fetching about pages:', error);
    }
  };

  const handleCreatePage = async () => {
    try {
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPageData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'About page created successfully',
        });
        setNewPageData({
          title: '',
          content: '',
          contentLanguage: 'en',
          translationGroup: undefined
        });
        fetchAboutPages();
      } else {
        throw new Error('Failed to create about page');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create about page',
        variant: 'destructive',
      });
    }
  };

  const handleUpdatePage = async () => {
    if (!editingPage) return;

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPage),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'About page updated successfully',
        });
        setEditingPage(null);
        fetchAboutPages();
      } else {
        throw new Error('Failed to update about page');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update about page',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePage = async (id: number) => {
    try {
      const response = await fetch(`/api/about?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'About page deleted successfully',
        });
        fetchAboutPages();
      } else {
        throw new Error('Failed to delete about page');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete about page',
        variant: 'destructive',
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-red-600">Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Page Management</h1>

      {/* Add New About Page */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New About Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={newPageData.title}
              onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value })}
              placeholder="Enter page title"
            />
          </div>
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={newPageData.content}
              onChange={(e) => setNewPageData({ ...newPageData, content: e.target.value })}
              placeholder="Enter page content"
              rows={6}
            />
          </div>
          <div>
            <Label htmlFor="contentLanguage">Content Language</Label>
            <Select
              value={newPageData.contentLanguage}
              onValueChange={(value) => setNewPageData({ ...newPageData, contentLanguage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="mk">Macedonian</SelectItem>
                <SelectItem value="bg">Bulgarian</SelectItem>
                <SelectItem value="sr">Serbian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreatePage}>Create About Page</Button>
            <Button
              variant="outline"
              onClick={() => setNewPageData({
                title: '',
                content: '',
                contentLanguage: 'en',
                translationGroup: undefined
              })}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit About Page */}
      {editingPage && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit About Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={editingPage.title}
                onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                placeholder="Enter page title"
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Content *</Label>
              <Textarea
                id="edit-content"
                value={editingPage.content}
                onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                placeholder="Enter page content"
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="edit-contentLanguage">Content Language</Label>
              <Select
                value={editingPage.contentLanguage}
                onValueChange={(value) => setEditingPage({ ...editingPage, contentLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="mk">Macedonian</SelectItem>
                  <SelectItem value="bg">Bulgarian</SelectItem>
                  <SelectItem value="sr">Serbian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdatePage}>Update About Page</Button>
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* About Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing About Pages</CardTitle>
        </CardHeader>
        <CardContent>
          {aboutPages.length === 0 ? (
            <p className="text-center text-gray-500">No about pages found.</p>
          ) : (
            <div className="space-y-4">
              {aboutPages.map((page) => (
                <div key={page.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{page.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Language: {page.contentLanguage}</p>
                      <p className="text-gray-700 line-clamp-3">{page.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Created: {new Date(page.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPage(page)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}