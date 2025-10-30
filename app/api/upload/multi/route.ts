import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()

    // Collect all files under key 'files' or repeated 'file'
    const files: File[] = []
    for (const [key, value] of form.entries()) {
      if ((key === 'files' || key === 'file') && value instanceof File) {
        files.push(value)
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files received' }, { status: 400 })
    }

    // Enforce limit of 5
    if (files.length > 5) {
      return NextResponse.json({ error: 'Too many files. Maximum is 5.' }, { status: 400 })
    }

    // Validate and save
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    const saved: { url: string; filename: string; size: number; originalName: string }[] = []

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: `Invalid file type: ${file.name}` }, { status: 400 })
      }
      if (file.size > maxSize) {
        return NextResponse.json({ error: `File too large: ${file.name}` }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${timestamp}_${originalName}`
      const filepath = join(uploadsDir, filename)

      await writeFile(filepath, buffer)

      saved.push({
        url: `/uploads/${filename}`,
        filename,
        size: file.size,
        originalName: file.name,
      })
    }

    return NextResponse.json({ message: 'Files uploaded successfully', files: saved })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
  }
}