import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    
    const aboutPage = await prisma.aboutPage.findFirst({
      where: {
        content_language: language
      }
    });
    
    if (!aboutPage) {
      // Fallback to English if requested language not found
      const fallbackPage = await prisma.aboutPage.findFirst({
        where: {
          content_language: 'en'
        }
      });
      return NextResponse.json(fallbackPage);
    }
    
    return NextResponse.json(aboutPage);
  } catch (error) {
    console.error('Error fetching about page:', error);
    return NextResponse.json({ message: 'Error fetching about page' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, contentLanguage, translationGroup } = await request.json();
    
    if (!title || !content || !contentLanguage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const aboutPage = await prisma.aboutPage.create({
      data: {
        title,
        content,
        content_language: contentLanguage,
        translation_group: translationGroup
      }
    });
    
    return NextResponse.json(aboutPage, { status: 201 });
  } catch (error) {
    console.error('Error creating about page:', error);
    return NextResponse.json({ message: 'Error creating about page' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, content, contentLanguage, translationGroup } = await request.json();
    
    if (!id || !title || !content || !contentLanguage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const aboutPage = await prisma.aboutPage.update({
      where: { id },
      data: {
        title,
        content,
        content_language: contentLanguage,
        translation_group: translationGroup
      }
    });
    
    return NextResponse.json(aboutPage);
  } catch (error) {
    console.error('Error updating about page:', error);
    return NextResponse.json({ message: 'Error updating about page' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'Missing ID parameter' }, { status: 400 });
    }
    
    await prisma.aboutPage.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'About page deleted successfully' });
  } catch (error) {
    console.error('Error deleting about page:', error);
    return NextResponse.json({ message: 'Error deleting about page' }, { status: 500 });
  }
}