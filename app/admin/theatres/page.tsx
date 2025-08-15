'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin } from '../../../lib/auth';
import { useToast } from '../../../hooks/use-toast';
import { useLanguage } from '../../../lib/language-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Trash2, Edit, Plus, Save, X, Upload } from 'lucide-react';

interface Theatre {
  id: number;
  name: string;
  city: string;
  country: string;
  description?: string;
  history?: string;
  website?: string;
  founded_year?: number;
  content_language: string;
  translation_group?: string;
  images: TheatreImage[];
  tags: TheatreTag[];
  _count?: {
    events: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface TheatreImage {
  id: number;
  image_url: string;
  caption?: string;
  is_primary: boolean;
}

interface TheatreTag {
  id: number;
  tag_name: string;
}

const AdminTheatresPage = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState<Theatre | null>(null);
  const [newTheatreData, setNewTheatreData] = useState({
    name: '',
    city: '',
    country: '',
    description: '',
    history: '',
    website: '',
    founded_year: '',
    content_language: 'en',
    translation_group: '',
    images: [] as any[],
    tags: [] as string[]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/'); // Redirect if not admin
    } else {
      setUserIsAdmin(true);
      fetchTheatres();
    }
  }, [router]);

  const fetchTheatres = async () => {
    try {
      // Fetch theatres for all languages
      const languages = ['en', 'bg', 'mk', 'sr'];
      const allTheatres = [];
      
      for (const lang of languages) {
        const response = await fetch(`/api/theatres?language=${lang}`);
        if (response.ok) {
          const data = await response.json();
          allTheatres.push(...data);
        }
      }
      
      setTheatres(allTheatres);
    } catch (error) {
      console.error('Error fetching theatres:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch theatres',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = '';
      
      // Upload image if selected
      if (imageFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', imageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
        } else {
          throw new Error('Failed to upload image');
        }
        setIsUploading(false);
      }

      const theatreData = {
        ...newTheatreData,
        founded_year: newTheatreData.founded_year ? parseInt(newTheatreData.founded_year) : null,
        images: imageUrl ? [{ image_url: imageUrl, is_primary: true }] : [],
      };

      const url = editingTheatre ? `/api/theatres/${editingTheatre.id}` : '/api/theatres';
      const method = editingTheatre ? 'PUT' : 'POST';
      
      const userRole = localStorage.getItem("actingEurope_userRole");
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userRole}`,
        },
        body: JSON.stringify(theatreData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Theatre ${editingTheatre ? 'updated' : 'created'} successfully`,
        });
        
        // Reset form
        setNewTheatreData({
          name: '',
          city: '',
          country: '',
          description: '',
          history: '',
          website: '',
          founded_year: '',
          content_language: 'en',
          translation_group: '',
          images: [],
          tags: []
        });
        setEditingTheatre(null);
        setImageFile(null);
        setImagePreview('');
        
        // Refresh theatres list
        fetchTheatres();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save theatre');
      }
    } catch (error) {
      console.error('Error saving theatre:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save theatre',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteTheatre = async (theatreId: number) => {
    if (!confirm('Are you sure you want to delete this theatre? This action cannot be undone.')) {
      return;
    }

    try {
      const userRole = localStorage.getItem("actingEurope_userRole");
      const response = await fetch(`/api/theatres/${theatreId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userRole}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Theatre deleted successfully',
        });
        fetchTheatres();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete theatre');
      }
    } catch (error) {
      console.error('Error deleting theatre:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete theatre',
        variant: 'destructive',
      });
    }
  };

  const handleEditClick = (theatre: Theatre) => {
    setEditingTheatre(theatre);
    setNewTheatreData({
      name: theatre.name,
      city: theatre.city,
      country: theatre.country,
      description: theatre.description || '',
      history: theatre.history || '',
      website: theatre.website || '',
      founded_year: theatre.founded_year?.toString() || '',
      content_language: theatre.content_language,
      translation_group: theatre.translation_group || '',
      images: theatre.images || [],
      tags: theatre.tags?.map(tag => tag.tag_name) || []
    });
    if (theatre.images && theatre.images.length > 0) {
      setImagePreview(theatre.images[0].image_url);
    }
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const addTag = () => {
    if (newTag.trim() && !newTheatreData.tags.includes(newTag.trim())) {
      setNewTheatreData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTheatreData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!userIsAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        Access Denied. You must be an administrator to view this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Theatre Management</h1>
      <p className="text-gray-600 mb-6">
        Creating a theatre will automatically generate versions in all supported languages (English, Bulgarian, Macedonian, Serbian).
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingTheatre ? 'Edit Theatre' : 'Add New Theatre'}</CardTitle>
          {editingTheatre && (
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
                    return langNames[editingTheatre.content_language as keyof typeof langNames] || editingTheatre.content_language.toUpperCase();
                  })()}
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Theatre Name *</Label>
                <Input
                  id="name"
                  value={newTheatreData.name}
                  onChange={(e) => setNewTheatreData({ ...newTheatreData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={newTheatreData.city}
                  onChange={(e) => setNewTheatreData({ ...newTheatreData, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={newTheatreData.country}
                  onChange={(e) => setNewTheatreData({ ...newTheatreData, country: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="founded_year">Founded Year</Label>
                <Input
                  id="founded_year"
                  type="number"
                  value={newTheatreData.founded_year}
                  onChange={(e) => setNewTheatreData({ ...newTheatreData, founded_year: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={newTheatreData.website}
                  onChange={(e) => setNewTheatreData({ ...newTheatreData, website: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="content_language">Content Language</Label>
                <Select
                  value={newTheatreData.content_language}
                  onValueChange={(value) => setNewTheatreData({ ...newTheatreData, content_language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bg">Bulgarian</SelectItem>
                    <SelectItem value="mk">Macedonian</SelectItem>
                    <SelectItem value="sr">Serbian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newTheatreData.description}
                onChange={(e) => setNewTheatreData({ ...newTheatreData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                value={newTheatreData.history}
                onChange={(e) => setNewTheatreData({ ...newTheatreData, history: e.target.value })}
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Theatre Image</Label>
              <div className="mt-2">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-4 relative">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newTheatreData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {editingTheatre ? 'Update Theatre' : 'Create Theatre'}
              </Button>
              {editingTheatre && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingTheatre(null);
                    setNewTheatreData({
                      name: '',
                      city: '',
                      country: '',
                      description: '',
                      history: '',
                      website: '',
                      founded_year: '',
                      content_language: 'en',
                      translation_group: '',
                      images: [],
                      tags: []
                    });
                    setImagePreview('');
                    setImageFile(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Theatres List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Theatres</h2>
        {theatres.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">No theatres found. Create your first theatre above.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(
            theatres.reduce((groups: Record<string, Theatre[]>, theatre) => {
              const key = theatre.translation_group || `single_${theatre.id}`;
              if (!groups[key]) groups[key] = [];
              groups[key].push(theatre);
              return groups;
            }, {})
          ).map(([groupKey, groupTheatres]) => {
            const sortedTheatres = groupTheatres.sort((a, b) => {
              const langOrder = ['en', 'bg', 'mk', 'sr'];
              return langOrder.indexOf(a.content_language) - langOrder.indexOf(b.content_language);
            });
            const mainTheatre = sortedTheatres[0]; // Use first theatre as main display
            
            return (
              <Card key={groupKey} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span>{mainTheatre.name}</span>
                        <div className="flex flex-wrap gap-1">
                          {sortedTheatres.map(theatre => {
                            const langNames = { en: 'EN', bg: 'BG', mk: 'MK', sr: 'SR' };
                            return (
                              <span 
                                key={theatre.id}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                              >
                                {langNames[theatre.content_language as keyof typeof langNames] || theatre.content_language.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                      </CardTitle>
                      <CardDescription>
                        {mainTheatre.city}, {mainTheatre.country}
                        {mainTheatre.founded_year && ` • Founded ${mainTheatre.founded_year}`}
                        {mainTheatre._count && ` • ${mainTheatre._count.events} events`}
                        {` • ${sortedTheatres.length} language${sortedTheatres.length > 1 ? 's' : ''}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {mainTheatre.description && (
                    <p className="text-gray-600 mb-2">{mainTheatre.description}</p>
                  )}
                  {mainTheatre.website && (
                    <p className="text-sm text-blue-600 mb-2">
                      <a href={mainTheatre.website} target="_blank" rel="noopener noreferrer">
                        {mainTheatre.website}
                      </a>
                    </p>
                  )}
                  {mainTheatre.tags && mainTheatre.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {mainTheatre.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.tag_name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Show individual language versions for editing */}
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Language Versions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {sortedTheatres.map(theatre => {
                        const langNames = { en: 'English', bg: 'Bulgarian', mk: 'Macedonian', sr: 'Serbian' };
                        return (
                          <div key={theatre.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">
                              <strong>{langNames[theatre.content_language as keyof typeof langNames] || theatre.content_language}:</strong> {theatre.name}
                            </span>
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditClick(theatre)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteTheatre(theatre.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminTheatresPage;