import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { activeScannerSessions } from '@/app/api/auth/scanner-login/route'

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key'

export interface ScannerAuthResult {
  authenticated: boolean
  email?: string
  deviceId?: string
  error?: string
}

export async function verifyScannerAuth(request: NextRequest): Promise<ScannerAuthResult> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authenticated: false,
        error: 'Missing or invalid authorization header'
      }
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    // Verify JWT token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (jwtError) {
      return {
        authenticated: false,
        error: 'Invalid token'
      }
    }
    
    // Check if session exists in our store
    const session = activeScannerSessions.get(token)
    
    if (!session) {
      return {
        authenticated: false,
        error: 'Session not found'
      }
    }
    
    // Verify token type
    if (decoded.type !== 'scanner') {
      return {
        authenticated: false,
        error: 'Invalid token type'
      }
    }
    
    // Check if session is still within 24 hours
    const now = Date.now()
    const dayInMs = 24 * 60 * 60 * 1000
    
    if (now - session.loginTime > dayInMs) {
      activeScannerSessions.delete(token)
      return {
        authenticated: false,
        error: 'Session expired'
      }
    }
    
    return {
      authenticated: true,
      email: session.email,
      deviceId: session.deviceId
    }
    
  } catch (error) {
    console.error('Scanner auth verification error:', error)
    return {
      authenticated: false,
      error: 'Internal server error'
    }
  }
}

// Check if request has valid scanner authentication
export async function requireScannerAuth(request: NextRequest): Promise<{ success: boolean; response?: Response }> {
  const authResult = await verifyScannerAuth(request)
  
  if (!authResult.authenticated) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({ 
          ok: false, 
          reason: 'Scanner authentication required',
          error: authResult.error 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
  
  return { success: true }
}