import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { activeScannerSessions } from '../scanner-login/route'

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const { deviceId } = await request.json()
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { valid: false, error: 'Missing authorization header' },
        { status: 401 }
      )
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    if (!deviceId) {
      return NextResponse.json(
        { valid: false, error: 'Missing device ID' },
        { status: 400 }
      )
    }
    
    // Verify JWT token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (jwtError) {
      return NextResponse.json(
        { valid: false, error: 'Invalid token' },
        { status: 401 }
      )
    }
    
    // Check if session exists in our store
    const session = activeScannerSessions.get(token)
    
    if (!session) {
      return NextResponse.json(
        { valid: false, error: 'Session not found' },
        { status: 401 }
      )
    }
    
    // Verify device ID matches
    if (session.deviceId !== deviceId) {
      return NextResponse.json(
        { valid: false, error: 'Device ID mismatch' },
        { status: 401 }
      )
    }
    
    // Verify token type
    if (decoded.type !== 'scanner') {
      return NextResponse.json(
        { valid: false, error: 'Invalid token type' },
        { status: 401 }
      )
    }
    
    // Check if session is still within 24 hours
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000
    
    if (now - session.loginTime > dayInMs) {
      activeScannerSessions.delete(token)
      return NextResponse.json(
        { valid: false, error: 'Session expired' },
        { status: 401 }
      )
    }
    
    return NextResponse.json({
      valid: true,
      email: session.email,
      deviceId: session.deviceId,
    })
    
  } catch (error) {
    console.error('Scanner validation error:', error)
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}