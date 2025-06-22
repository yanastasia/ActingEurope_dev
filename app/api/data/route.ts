import { NextResponse } from 'next/server';
import { promises as fsPromises } from 'fs';
import path from 'path';

const dataFiles = {
  events: 'events.json',
  venues: 'venues.json',
  bookings: 'bookings.json',
  users: 'users.json',
  news: 'newsArticles.json',
  theatres: 'theatres.json',
};

export async function GET() {
  console.log('GET /api/data endpoint hit');
  try {
    const allData: { [key: string]: any[] } = {};
    for (const key in dataFiles) {
      const filePath = path.join(process.cwd(), 'data', dataFiles[key as keyof typeof dataFiles]);
      const fileContents = await fsPromises.readFile(filePath, 'utf8');
      allData[key] = JSON.parse(fileContents);
    }
    console.log('Data read from files in /api/data:', allData);
    return NextResponse.json(allData);
  } catch (error) {
    console.error('Error reading data from files:', error);
    return NextResponse.json({ message: 'Error loading data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedData = await request.json();
    for (const key in dataFiles) {
      if (updatedData[key]) {
        const filePath = path.join(process.cwd(), 'data', dataFiles[key as keyof typeof dataFiles]);
        await fsPromises.writeFile(filePath, JSON.stringify(updatedData[key], null, 2), 'utf8');
      }
    }
    return NextResponse.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error writing data to files:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}
