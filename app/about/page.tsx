"use client";

import React, { useState, useEffect } from 'react';
import { isAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const AboutPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    setUserIsAdmin(isAdmin());
  }, []);

  // In a real application, you would fetch this from a database
  useEffect(() => {
    setAboutText(
      `Welcome to Acting Europe, your premier destination for theatrical events and performances across Europe.
We are dedicated to bringing you the best of European theatre, from classic plays to contemporary productions,
showcasing the rich cultural diversity and artistic talent of the continent.

Our mission is to connect theatre enthusiasts with unforgettable experiences, providing comprehensive
information on upcoming shows, venues, and ticketing. We believe in the power of live performance to inspire,
Entertain, and provoke thought, and we strive to make it accessible to everyone.

Founded by a team of passionate theatre lovers, Acting Europe is committed to supporting the arts community
and promoting cultural exchange. Join us on a journey through the vibrant world of European theatre!`
    );
  }, []);

  const handleSave = () => {
    // In a real application, you would save this to a database
    console.log('Saving about text:', aboutText);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      {isEditing ? (
        <div className="space-y-4">
          <Textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={15}
            className="w-full"
          />
          <Button onClick={handleSave}>Save Changes</Button>
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
            <Button onClick={() => setIsEditing(true)}>Edit About Page</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutPage;