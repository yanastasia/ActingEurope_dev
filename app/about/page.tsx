"use client";

import React, { useState, useEffect } from 'react';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/language-context';

const AboutPage = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    setUserIsAdmin(isAdmin());
  }, []);

  // In a real application, you would fetch this from a database
  useEffect(() => {
    setAboutText(t('aboutText'));
  }, [t]);

  const handleSave = () => {
    // In a real application, you would save this to a database
    console.log('Saving about text:', aboutText);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('aboutUs')}</h1>
      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={15}
            className="w-full"
          />
          <Button onClick={handleSave}>{t('saveChanges')}</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
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