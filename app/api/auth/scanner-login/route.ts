import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const SCANNER_EMAIL = process.env.SCANNER_EMAIL || 'tickets@actingeurope.eu'
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key'

// In-memory store for active scanner sessions (in production, use Redis)
const activeScannerSessions = new Map<string, {
  deviceId: string
  email: string
  loginTime: number
}>()

export async function POST(request: NextRequest) {
  try {
    const { email, password, deviceId } = await request.json()
    
    if (!email || !password || !deviceId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (email !== SCANNER_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Invalid scanner account' },
        { status: 401 }
      )
    }
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate session token
    const sessionToken = jwt.sign(
      {
        email: user.email,
        deviceId,
        type: 'scanner',
        userId: user.id,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    // Store session
    activeScannerSessions.set(sessionToken, {
      deviceId,
      email: user.email,
      loginTime: Date.now(),
    })
    
    // Clean up old sessions (older than 24 hours)
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000
    
    for (const [token, session] of activeScannerSessions.entries()) {
      if (now - session.loginTime > dayInMs) {
        activeScannerSessions.delete(token)
      }
    }
    
    return NextResponse.json({
      success: true,
      sessionToken,
      deviceId,
      email: user.email,
    })
    
  } catch (error) {
    console.error('Scanner login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Export the active sessions for use in validation
export { activeScannerSessions }