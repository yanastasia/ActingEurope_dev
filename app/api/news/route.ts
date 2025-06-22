import { getNewsArticles, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '@/lib/database-operations';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newsArticles = await getNewsArticles();
    return NextResponse.json(newsArticles);
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ message: 'Error fetching news articles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, excerpt, imageUrl, date, category } = await request.json();

    // Ensure content and author are defined before calling createNewsArticle
    const content = excerpt; // Using excerpt as content
    const author = "Admin"; // Placeholder author

    if (!title || !excerpt || !imageUrl || !date || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const newArticle = await createNewsArticle(title, content, excerpt, author, date, category, imageUrl); // Added comment to force recompile
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json({ message: 'Error creating news article' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, excerpt, imageUrl, date, category } = await request.json();
    if (!id || !title || !excerpt || !imageUrl || !date || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const updatedArticle = await updateNewsArticle(id, { title, excerpt, imageUrl, date, category });
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
    const deleted = await deleteNewsArticle(id);
    if (!deleted) {
      return NextResponse.json({ message: 'News article not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json({ message: 'Error deleting news article' }, { status: 500 });
  }
}