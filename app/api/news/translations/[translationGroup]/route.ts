import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ translationGroup: string }> }
) {
  try {
    const resolvedParams = await params;
    const { translationGroup } = resolvedParams;

    if (!translationGroup) {
      return NextResponse.json(
        { error: 'Translation group is required' },
        { status: 400 }
      );
    }

    // Fetch all articles in the translation group
    const articles = await prisma.newsArticle.findMany({
      where: {
        translation_group: translationGroup,
        is_published: true,
      },
      orderBy: {
        content_language: 'asc',
      },
    });

    if (articles.length === 0) {
      return NextResponse.json(
        { error: 'No articles found for this translation group' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const transformedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.image_url,
      category: article.category,
      author: article.author,
      publishedAt: article.published_at,
      isPublished: article.is_published,
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      contentLanguage: article.content_language,
      translationGroup: article.translation_group,
    }));

    return NextResponse.json({
      translationGroup,
      articles: transformedArticles,
      availableLanguages: transformedArticles.map(a => a.contentLanguage),
    });
  } catch (error) {
    console.error('Error fetching translation group:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}