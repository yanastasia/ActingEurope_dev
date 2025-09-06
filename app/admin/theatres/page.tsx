'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isAdmin } from '../../../lib/auth';
import { useToast } from '../../../hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
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

// Helper function to fix company names
const fixCompanyName = (name: string): string => {
  return name
    .replace(/OSAIK "39 Monkeys"/g, 'OSAIK "36 Monkeys"')
    .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК "36 Маймуни"')
    .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАИК "36 Мајмуни"')
    .replace(/ОСАИК "39 Мајмуна"/g, 'ОСАИК "36 Мајмуна"');
};

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
    images: [] as TheatreImage[],
    tags: [] as string[]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [photoLink, setPhotoLink] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [translationGroups, setTranslationGroups] = useState<{ [key: string]: Theatre[] }>({});
  const [theatresWithoutGroups, setTheatresWithoutGroups] = useState<Theatre[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const fetchTheatres = useCallback(async () => {
    try {
      // Fetch all theatres for admin interface
      const response = await fetch('/api/theatres?admin=true');
      if (response.ok) {
        const data = await response.json();
        setTheatres(data);
      } else {
        throw new Error('Failed to fetch theatres');
      }
    } catch (error) {
      console.error('Error fetching theatres:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch theatres',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // First check localStorage for quick response
      const localAdmin = isAdmin();
      
      if (!localAdmin) {
        router.push('/auth/login');
        return;
      }
      
      // Then verify with server to ensure session is still valid
      try {
        const userRole = localStorage.getItem('actingEurope_userRole');
        const response = await fetch('/api/auth/check', {
          headers: {
            'Authorization': `Bearer ${userRole}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setUserIsAdmin(true);
            fetchTheatres();
          } else {
            // Clear invalid auth and redirect
            localStorage.removeItem('actingEurope_auth');
            localStorage.removeItem('actingEurope_userRole');
            localStorage.removeItem('actingEurope_userEmail');
            router.push('/auth/login');
          }
        } else {
          // Server auth check failed, redirect to login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // On network error, trust localStorage for now
        setUserIsAdmin(true);
        fetchTheatres();
      }
    };
    
    checkAuthAndFetch();
  }, [router, fetchTheatres]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate photo link if provided
    if (photoLink && !isValidImageUrl(photoLink)) {
      toast({
        title: 'Invalid Photo Link',
        description: 'Please enter a valid image URL or remove the photo link',
        variant: 'destructive',
      });
      return;
    }
    
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
      } else if (photoLink) {
        // Use photo link if no file is uploaded
        imageUrl = photoLink;
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
        setPhotoLink('');
        
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
      // If it's not a file upload (no blob URL), it's a photo link
      if (!theatre.images[0].image_url.startsWith('blob:')) {
        setPhotoLink(theatre.images[0].image_url);
      }
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
    setPhotoLink('');
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null;
    } catch {
      return false;
    }
  };

  const handlePhotoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPhotoLink(url);
    
    if (url) {
      if (isValidImageUrl(url)) {
        setImagePreview(url);
        setImageFile(null); // Clear file upload if using link
      } else if (url.length > 10) {
        // Only show error for URLs that seem complete
        toast({
          title: 'Invalid Image URL',
          description: 'Please enter a valid image URL ending with .jpg, .png, .gif, .webp, or .svg',
          variant: 'destructive',
        });
      }
    } else {
      setImagePreview('');
    }
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

  // Group theatres by translation group
  useEffect(() => {
    const groups: { [key: string]: Theatre[] } = {};
    const withoutGroups: Theatre[] = [];

    theatres.forEach(theatre => {
      if (theatre.translation_group) {
        if (!groups[theatre.translation_group]) {
          groups[theatre.translation_group] = [];
        }
        groups[theatre.translation_group].push(theatre);
      } else {
        withoutGroups.push(theatre);
      }
    });

    setTranslationGroups(groups);
    setTheatresWithoutGroups(withoutGroups);
  }, [theatres]);

  // Connect orphaned theatres to existing translation groups
  async function connectOrphanedTheatres() {
    try {
      let connectionsFound = 0;
      
      // Get all theatres with translation groups to match against
      const groupedTheatres = Object.values(translationGroups).flat();
      
      for (const orphanedTheatre of theatresWithoutGroups) {
        // Try to find a matching theatre in existing translation groups
        const potentialMatch = groupedTheatres.find(groupedTheatre => 
          groupedTheatre.name.toLowerCase().includes(orphanedTheatre.name.toLowerCase()) ||
          orphanedTheatre.name.toLowerCase().includes(groupedTheatre.name.toLowerCase()) ||
          (groupedTheatre.city === orphanedTheatre.city && 
           groupedTheatre.country === orphanedTheatre.country &&
           groupedTheatre.content_language !== orphanedTheatre.content_language)
        );
        
        if (potentialMatch && potentialMatch.translation_group) {
          // Connect the orphaned theatre to this translation group
          const theatreData = {
            ...orphanedTheatre,
            translation_group: potentialMatch.translation_group
          };

          const response = await fetch(`/api/theatres/${orphanedTheatre.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('actingEurope_token')}`,
            },
            body: JSON.stringify(theatreData),
          });

          if (response.ok) {
            connectionsFound++;
          }
        }
      }
      
      if (connectionsFound > 0) {
        toast({
          title: 'Success',
          description: `Connected ${connectionsFound} orphaned theatres to translation groups`,
        });
        fetchTheatres();
      } else {
        toast({
          title: 'Info',
          description: 'No matching theatres found to connect',
        });
      }
    } catch (error) {
      console.error('Error connecting orphaned theatres:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect orphaned theatres',
        variant: 'destructive',
      });
    }
  }

  // Create language copy of a theatre
  async function createLanguageCopy(originalTheatre: Theatre, targetLanguage: string) {
    try {
      let translationGroup: string | null = originalTheatre.translation_group || null;
      
      if (!translationGroup) {
        // Create a new translation group for this theatre
        translationGroup = `theatre_${originalTheatre.id}_${Date.now()}`;
        
        // Update the original theatre with the new translation group
        const updateResponse = await fetch(`/api/theatres/${originalTheatre.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('actingEurope_token')}`,
          },
          body: JSON.stringify({
            ...originalTheatre,
            translation_group: translationGroup
          }),
        });
        
        if (!updateResponse.ok) {
          throw new Error('Failed to assign translation group');
        }
      }

      // Check if a copy already exists for this language in the translation group
      const existingCopy = theatres.find(theatre => 
        theatre.translation_group === translationGroup && 
        theatre.content_language === targetLanguage
      );

      if (existingCopy) {
        toast({
          title: 'Info',
          description: `${targetLanguage.toUpperCase()} language copy already exists`,
        });
        return;
      }

      // Check if there's an orphaned theatre that could be connected instead
      const orphanedMatch = theatresWithoutGroups.find(theatre =>
        theatre.content_language === targetLanguage &&
        (theatre.name.toLowerCase().includes(originalTheatre.name.toLowerCase()) ||
         originalTheatre.name.toLowerCase().includes(theatre.name.toLowerCase()) ||
         (theatre.city === originalTheatre.city && theatre.country === originalTheatre.country))
      );

      if (orphanedMatch) {
        // Connect the orphaned theatre to this translation group
        const response = await fetch(`/api/theatres/${orphanedMatch.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('actingEurope_token')}`,
          },
          body: JSON.stringify({
            ...orphanedMatch,
            translation_group: translationGroup
          }),
        });

        if (response.ok) {
          toast({
            title: 'Success',
            description: `Connected existing ${targetLanguage.toUpperCase()} theatre to translation group`,
          });
          fetchTheatres();
        }
        return;
      }

      // Create a new theatre copy
      const newTheatreData = {
        name: originalTheatre.name, // Should be translated in real implementation
        city: originalTheatre.city,
        country: originalTheatre.country,
        description: originalTheatre.description, // Should be translated
        history: originalTheatre.history, // Should be translated
        website: originalTheatre.website,
        founded_year: originalTheatre.founded_year,
        content_language: targetLanguage,
        translation_group: translationGroup
      };

      const response = await fetch('/api/theatres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('actingEurope_token')}`,
        },
        body: JSON.stringify(newTheatreData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Created ${targetLanguage.toUpperCase()} language copy`,
        });
        fetchTheatres();
      } else {
        throw new Error('Failed to create language copy');
      }
    } catch (error) {
      console.error('Error creating language copy:', error);
      toast({
        title: 'Error',
        description: 'Failed to create language copy',
        variant: 'destructive',
      });
    }
  }

  // Get language badge component
  function getLanguageBadge(language: string) {
    const langConfig = {
      en: { label: 'EN', color: 'bg-blue-100 text-blue-800' },
      bg: { label: 'BG', color: 'bg-green-100 text-green-800' },
      mk: { label: 'MK', color: 'bg-yellow-100 text-yellow-800' },
      sr: { label: 'SR', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = langConfig[language as keyof typeof langConfig] || { label: language.toUpperCase(), color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge className={`${config.color} text-xs font-semibold`}>
        {config.label}
      </Badge>
    );
  }

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
                  onValueChange={(value: string) => setNewTheatreData({ ...newTheatreData, content_language: value })}
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
              <div className="mt-2 space-y-4">
                <div>
                  <Label htmlFor="image-file" className="text-sm font-medium">Upload Image File</Label>
                  <input
                    id="image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div>
                  <Label htmlFor="photo-link" className="text-sm font-medium">Photo Link URL</Label>
                  <Input
                    id="photo-link"
                    type="url"
                    value={photoLink}
                    onChange={handlePhotoLinkChange}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-4 relative">
                    <Image src={imagePreview} alt="Preview" width={128} height={128} className="object-cover rounded" />
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
                    setPhotoLink('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Translation Groups Display */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Translation Groups</h2>
        {Object.keys(translationGroups).length === 0 && theatresWithoutGroups.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">No theatres found. Create your first theatre above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {Object.entries(translationGroups).map(([groupId, groupTheatres]) => {
              const languages = ['en', 'bg', 'mk', 'sr'];
              const theatresByLang = languages.reduce((acc, lang) => {
                acc[lang] = groupTheatres.find(theatre => theatre.content_language === lang) || null;
                return acc;
              }, {} as { [key: string]: Theatre | null });
              
              const primaryTheatre = groupTheatres[0];
              
              return (
                <Card key={groupId} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{fixCompanyName(primaryTheatre.name)}</h3>
                      <p className="text-gray-600">
                        {primaryTheatre.city}, {primaryTheatre.country}
                        {primaryTheatre.founded_year && ` • Founded ${primaryTheatre.founded_year}`}
                      </p>
                      {primaryTheatre.website && (
                        <p className="text-sm text-blue-600 mt-1">
                          <a href={primaryTheatre.website} target="_blank" rel="noopener noreferrer">
                            {primaryTheatre.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {languages.map(lang => {
                      const theatre = theatresByLang[lang];
                      return (
                        <div key={lang} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            {getLanguageBadge(lang)}
                          </div>
                          {theatre ? (
                            <div>
                              <p className="font-medium text-sm">{fixCompanyName(theatre.name)}</p>
                              {theatre.description && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{theatre.description}</p>
                              )}
                              {theatre._count?.events && (
                                <p className="text-xs text-gray-600 mt-1">{theatre._count.events} events</p>
                              )}
                              <div className="flex gap-1 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditClick(theatre)}
                                  className="flex-1"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteTheatre(theatre.id)}
                                  className="flex-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-gray-400 text-sm">No {lang.toUpperCase()} version</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 w-full"
                                onClick={() => createLanguageCopy(primaryTheatre, lang)}
                              >
                                Create {lang.toUpperCase()}
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Theatres without translation groups */}
      {theatresWithoutGroups.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Individual Theatres</h2>
            <Button
              onClick={connectOrphanedTheatres}
              variant="outline"
              className="ml-4"
            >
              Connect Orphaned Theatres
            </Button>
          </div>
          <div className="grid gap-4">
            {theatresWithoutGroups.map((theatre) => (
              <Card key={theatre.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{fixCompanyName(theatre.name)}</h3>
                    <p className="text-gray-600 text-sm">
                      {theatre.city}, {theatre.country}
                      {theatre.founded_year && ` • Founded ${theatre.founded_year}`}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getLanguageBadge(theatre.content_language)}
                      {theatre._count?.events && (
                        <Badge variant="outline">{theatre._count.events} events</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(theatre)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTheatre(theatre.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTheatresPage;