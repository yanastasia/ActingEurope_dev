import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    
    const contactPage = await prisma.contactPage.findFirst({
      where: {
        content_language: language
      }
    });
    
    if (!contactPage) {
      // Fallback to English if requested language not found
      const fallbackPage = await prisma.contactPage.findFirst({
        where: {
          content_language: 'en'
        }
      });
      return NextResponse.json(fallbackPage);
    }
    
    return NextResponse.json(contactPage);
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return NextResponse.json({ message: 'Error fetching contact page' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, contentLanguage, translationGroup } = await request.json();
    
    if (!title || !content || !contentLanguage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const contactPage = await prisma.contactPage.create({
      data: {
        title,
        content,
        content_language: contentLanguage,
        translation_group: translationGroup
      }
    });
    
    return NextResponse.json(contactPage, { status: 201 });
  } catch (error) {
    console.error('Error creating contact page:', error);
    return NextResponse.json({ message: 'Error creating contact page' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, content, contentLanguage, translationGroup } = await request.json();
    
    if (!id || !title || !content || !contentLanguage) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const contactPage = await prisma.contactPage.update({
      where: { id },
      data: {
        title,
        content,
        content_language: contentLanguage,
        translation_group: translationGroup
      }
    });
    
    return NextResponse.json(contactPage);
  } catch (error) {
    console.error('Error updating contact page:', error);
    return NextResponse.json({ message: 'Error updating contact page' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'Missing ID parameter' }, { status: 400 });
    }
    
    await prisma.contactPage.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Contact page deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact page:', error);
    return NextResponse.json({ message: 'Error deleting contact page' }, { status: 500 });
  }
}