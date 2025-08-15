'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/language-context';
import { isAdmin } from '@/lib/auth';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactContent, setContactContent] = useState({
    title: '',
    content: '',
    address: 'bul. "Bulgaria" 26А, 2500 Kyustendil, Bulgaria',
    phone: '+359 87 696 7588',
    email: 'info@actingeurope.eu',
    businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactPageId, setContactPageId] = useState(null);

  useEffect(() => {
    setUserIsAdmin(isAdmin());
  }, []);

  // Fetch contact page content from database
  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/contact?language=${language}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const content = JSON.parse(data.content || '{}');
            setContactContent({
              title: data.title || t('contactUs'),
              content: content.description || t('contactDescription'),
              address: content.address || 'bul. "Bulgaria" 26А, 2500 Kyustendil, Bulgaria',
              phone: content.phone || '+359 87 696 7588',
              email: content.email || 'info@actingeurope.eu',
              businessHours: content.businessHours || 'Monday - Friday: 9:00 AM - 6:00 PM'
            });
            setContactPageId(data.id);
          } else {
            // Fallback to translation if no database content
            setContactContent(prev => ({
              ...prev,
              title: t('contactUs'),
              content: t('contactDescription')
            }));
          }
        } else {
          // Fallback to translation if API fails
          setContactContent(prev => ({
            ...prev,
            title: t('contactUs'),
            content: t('contactDescription')
          }));
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
        // Fallback to translation if fetch fails
        setContactContent(prev => ({
          ...prev,
          title: t('contactUs'),
          content: t('contactDescription')
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, [language, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleSaveContact = async () => {
    try {
      const method = contactPageId ? 'PUT' : 'POST';
      const url = contactPageId ? `/api/contact?id=${contactPageId}` : '/api/contact';
      
      const contentData = {
        description: contactContent.content,
        address: contactContent.address,
        phone: contactContent.phone,
        email: contactContent.email,
        businessHours: contactContent.businessHours
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: contactContent.title,
          content: JSON.stringify(contentData),
          contentLanguage: language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setContactPageId(data.id);
        toast.success('Contact page updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to save contact page');
      }
    } catch (error) {
      console.error('Error saving contact page:', error);
      toast.error('Error saving contact page');
    }
  };

  const handleContactContentChange = (field, value) => {
    setContactContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{contactContent.title}</h1>
        {userIsAdmin && !isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Contact Page
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Edit Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <Input
                value={contactContent.title}
                onChange={(e) => handleContactContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={contactContent.content}
                onChange={(e) => handleContactContentChange('content', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                value={contactContent.address}
                onChange={(e) => handleContactContentChange('address', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={contactContent.phone}
                onChange={(e) => handleContactContentChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                value={contactContent.email}
                onChange={(e) => handleContactContentChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Hours</label>
              <Input
                value={contactContent.businessHours}
                onChange={(e) => handleContactContentChange('businessHours', e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button onClick={handleSaveContact}>Save Changes</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          {contactContent.content}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('sendMessage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">{t('yourName')}</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('enterYourName')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">{t('yourEmail')}</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('enterYourEmail')}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">{t('subject')}</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t('enterSubject')}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t('message')}</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('enterYourMessage')}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">{t('sendMessageButton')}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('ourInformation')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{t('address')}</p>
                  <p className="text-gray-600">{contactContent.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{t('phone')}</p>
                  <p className="text-gray-600">{contactContent.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{contactContent.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{t('businessHours')}</p>
                  <p className="text-gray-600">{contactContent.businessHours}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">{t('followUsContact')}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}