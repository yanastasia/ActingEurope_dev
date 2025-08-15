"use client";

import React, { useState, useEffect } from 'react';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/language-context';
import { toast } from 'sonner';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aboutPageId, setAboutPageId] = useState(null);

  useEffect(() => {
    setUserIsAdmin(isAdmin());
  }, []);

  // Fetch about page content from database
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/about?language=${language}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setAboutText(data.content || '');
            setAboutTitle(data.title || t('aboutUs'));
            setAboutPageId(data.id);
          } else {
            // Fallback to translation if no database content
            setAboutText(t('aboutText'));
            setAboutTitle(t('aboutUs'));
          }
        } else {
          // Fallback to translation if API fails
          setAboutText(t('aboutText'));
          setAboutTitle(t('aboutUs'));
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        // Fallback to translation if fetch fails
        setAboutText(t('aboutText'));
        setAboutTitle(t('aboutUs'));
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, [language, t]);

  const handleSave = async () => {
    try {
      const method = aboutPageId ? 'PUT' : 'POST';
      const url = aboutPageId ? `/api/about?id=${aboutPageId}` : '/api/about';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: aboutTitle,
          content: aboutText,
          contentLanguage: language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAboutPageId(data.id);
        toast.success('About page updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to save about page');
      }
    } catch (error) {
      console.error('Error saving about page:', error);
      toast.error('Error saving about page');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{aboutTitle}</h1>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              id="content"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows={15}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>{t('saveChanges')}</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="prose lg:prose-xl max-w-none">
          {aboutText.split('\n').map((paragraph, index) => (
            <p key={index} className="text-lg mb-4">
              {paragraph}
            </p>
          ))}
          {userIsAdmin && (
            <Button onClick={() => setIsEditing(true)}>{t('editAboutPage')}</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutPage;