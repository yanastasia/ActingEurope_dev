import { getNewsArticles, createNewsArticleWithTranslations, updateNewsArticle, deleteNewsArticleWithTranslations } from '@/lib/database-operations';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    const newsArticles = await getNewsArticles(language);
    return NextResponse.json(newsArticles);
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ message: 'Error fetching news articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, imageUrl, category, author } = await request.json();

    if (!title || !content || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const authorName = author || "Admin";
    const newArticles = await createNewsArticleWithTranslations(title, content, undefined, imageUrl, category, authorName);
    return NextResponse.json(newArticles, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json({ message: 'Error creating news article' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, excerpt, imageUrl, date, category, contentLanguage, translationGroup } = await request.json();
    if (!id || !title || !excerpt || !imageUrl || !date || !category || !contentLanguage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const updatedArticle = await updateNewsArticle(id, { 
      title, 
      content: excerpt, // Use excerpt as content since admin sends content as excerpt
      excerpt, 
      imageUrl, 
      publishedAt: new Date(date), 
      category, 
      contentLanguage, 
      translationGroup 
    });
    if (!updatedArticle) {
      return NextResponse.json({ message: 'News article not found' }, { status: 404 });
    }
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json({ message: 'Error updating news article' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Missing article ID' }, { status: 400 });
    }
    const deleted = await deleteNewsArticleWithTranslations(id);
    if (!deleted) {
      return NextResponse.json({ message: 'News article not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'News article and all translations deleted successfully' });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json({ message: 'Error deleting news article' }, { status: 500 });
  }
}