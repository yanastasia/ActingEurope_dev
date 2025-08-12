'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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

export default function NewsArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id, lang } = params;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/news/${id}?language=${lang}`);
        
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id && lang) {
      fetchArticle();
    }
  }, [id, lang]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested article could not be found.'}</p>
          <Link href="/news">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className="inline-flex items-center text-primary-gold hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>
        
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {article.category && (
                <Badge className="bg-primary-gold text-secondary-blue">
                  {article.category}
                </Badge>
              )}
              <Badge variant="outline">
                {lang === 'en' ? 'English' : 
                 lang === 'mk' ? 'Macedonian' : 
                 lang === 'bg' ? 'Bulgarian' : 
                 lang === 'sr' ? 'Serbian' : lang}
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-secondary-blue mb-4">
              {article.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {article.imageUrl && (
              <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}