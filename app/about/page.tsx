"use client";

import React, { useState, useEffect } from 'react';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/language-context';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HARD_STATS = {
  users: 136,
  bookings: 496,
  bookedSeats: 2441,
  performances: 6,
  theatres: 6,
  workshops: 2,
  countries: 3,
}

const AboutPage = () => {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aboutPageId, setAboutPageId] = useState(null);
  // Stats are hardcoded per request; no API calls

  // Translation helper with safe fallback if key is missing
  const tx = (key: string, fallback: string) => {
    try {
      const val = t(key);
      return val && val !== key ? val : fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    setUserIsAdmin(isAdmin());
  }, []);

  // Use static translation content locally (no DB/API fetch)
  useEffect(() => {
    setLoading(true);
    setAboutText(t('aboutText'));
    setAboutTitle(t('aboutUs'));
    setAboutPageId(null);
    setLoading(false);
  }, [language, t]);

  // No stats fetching; values are hardcoded above

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
      <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">{aboutTitle}</h1>

      {/* Cards moved below the About text, using brand colors and hardcoded values */}
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
        <div className="prose prose-neutral md:prose-lg max-w-3xl mx-auto leading-relaxed">
          {aboutText
            .split(/\n\n+/) // break on double newlines to create clearer sections
            .map((block, index) => (
              <p key={index} className="mb-4">
                {block}
              </p>
            ))}
          {userIsAdmin && (
            <div className="mt-6">
              <Button onClick={() => setIsEditing(true)}>{t('editAboutPage')}</Button>
            </div>
          )}
        </div>
      )}

      {/* Brand-styled stats cards (below text) */}
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Order: Countries, Users, Bookings, Booked Seats, Performances, Theatres, Workshops */}
          {/* Navy cards with golden numbers */}
          <Card className="bg-secondary text-secondary-foreground border-secondary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('countries', 'Countries')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{HARD_STATS.countries}</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground border-secondary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('users', 'Users')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{HARD_STATS.users}</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground border-secondary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('bookings', 'Bookings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{HARD_STATS.bookings}</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary text-secondary-foreground border-secondary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('bookedSeats', 'Booked Seats')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{HARD_STATS.bookedSeats}</div>
            </CardContent>
          </Card>

          {/* Gold cards with navy text */}
          <Card className="bg-primary text-secondary-blue border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('performances', 'Performances')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{HARD_STATS.performances}</div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-secondary-blue border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('theatres', 'Theatres')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{HARD_STATS.theatres}</div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-secondary-blue border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle lang={language} className="text-sm tracking-wide">{tx('workshops', 'Workshops')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{HARD_STATS.workshops}</div>
            </CardContent>
          </Card>

          {/* Message card next to Workshops */}
          <Card className="bg-white/90 text-secondary-blue border-secondary/20 shadow-lg">
            <CardContent className="p-6">
              <div lang={language} className="text-lg font-semibold">{tx('moreNextYear', 'And we have lots more in store for next year!')}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;