import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    let files: string[] = []
    try {
      files = await readdir(uploadsDir)
    } catch (e) {
      // If directory doesn't exist or can't be read, return empty
      files = []
    }

    // Filter image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const images = files
      .filter((f) => imageExtensions.some((ext) => f.toLowerCase().endsWith(ext)))
      .map((name) => ({ url: `/uploads/${name}`, name }))

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error listing gallery images:', error)
    return NextResponse.json({ images: [], error: 'Failed to list images' }, { status: 500 })
  }
}