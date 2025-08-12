'use client';

import React, { useState, useEffect } from 'react';
import NewsCard from '@/components/news-card';
import { NewsArticle } from '@/lib/database-operations';
import { useLanguage } from '@/lib/language-context';

const NewsPage = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const { language, t } = useLanguage();

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(`/api/news?language=${language}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setNewsArticles(data);
        } catch (error) {
          console.error('Failed to fetch news articles:', error);
        }
      };
      fetchNews();
    }, [language]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('latestNews')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <NewsCard
            key={article.id}
            title={article.title}
            id={article.id}
            excerpt={article.excerpt || ''}
            imageUrl={article.imageUrl || ''}
            date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date(article.createdAt).toLocaleDateString()}
            category={article.category || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;