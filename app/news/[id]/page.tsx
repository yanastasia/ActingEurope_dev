'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { NewsArticle } from '@/lib/database-operations';
import { useLanguage, type Language } from "@/lib/language-context"
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';


const NewsArticlePage = () => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check if there's a language parameter in the URL and update the global language context
    const urlLang = searchParams.get('lang');
    if (urlLang && ['en', 'bg', 'mk', 'sr'].includes(urlLang) && urlLang !== language) {
      // Validate that urlLang is a valid Language type
      const validLanguages: Language[] = ['en', 'bg', 'mk', 'sr'];
      if (validLanguages.includes(urlLang as Language)) {
        setLanguage(urlLang as Language);
      }
    }
  }, [searchParams, language, setLanguage]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Use URL language parameter directly, fallback to global language context
        const urlLang = searchParams.get('lang') || language;
        const response = await fetch(`/api/news/${id}?language=${urlLang}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('=== ARTICLE DEBUG INFO ===');
        console.log('Fetched article data:', data);
        console.log('Current language:', urlLang);
        console.log('Article content language:', data.contentLanguage);
        console.log('Article title:', data.title);
        console.log('Article content preview:', data.content.substring(0, 100) + '...');

        console.log('Article ID:', data.id);
        console.log('=== END DEBUG INFO ===');
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch news article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, language, searchParams]);

  const handleBackToNews = () => {
    router.push('/news');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('articleNotFound')}</h1>
          <p className="text-gray-600 mb-4">{t('articleNotFoundDesc')}</p>
          <Button onClick={handleBackToNews}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToNews')}
          </Button>
        </div>
      </div>
    );
  }

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'en': return t('english');
      case 'bg': return t('bulgarian');
      case 'mk': return t('macedonian');
      case 'sr': return t('serbian');
      default: return lang.toUpperCase();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="outline" onClick={handleBackToNews}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToNews')}
        </Button>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>
              {article.publishedAt 
                ? new Date(article.publishedAt).toLocaleDateString()
                : new Date(article.createdAt).toLocaleDateString()}
            </span>
            {article.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {article.category}
              </span>
            )}
            {article.author && (
              <span>{t('by')} {article.author}</span>
            )}
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
              {getLanguageName(article.contentLanguage)}
            </span>
          </div>
        </header>

        {/* Article Image */}
        {article.imageUrl && (
          <div className="mb-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {t('lastUpdated')}: {new Date(article.updatedAt).toLocaleDateString()}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NewsArticlePage;