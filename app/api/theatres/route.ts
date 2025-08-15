import { NextRequest, NextResponse } from 'next/server';
import { getTheatresWithLanguage } from '@/lib/database-operations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';
    const theatres = await getTheatresWithLanguage(language);
    return NextResponse.json(theatres);
  } catch (error) {
    console.error('Error fetching theatres:', error);
    return NextResponse.json({ message: 'Error fetching theatres' }, { status: 500 });
  }
}