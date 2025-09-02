// Scanner authentication system for tickets@actingeurope.eu
// Allows multiple devices to be logged in simultaneously

const SCANNER_EMAIL = process.env.NEXT_PUBLIC_SCANNER_EMAIL || 'tickets@actingeurope.eu'
const SCANNER_SESSION_KEY = process.env.NEXT_PUBLIC_SCANNER_SESSION_KEY || 'actingeurope_scanner_session'
const SCANNER_DEVICE_ID_KEY = process.env.NEXT_PUBLIC_SCANNER_DEVICE_ID_KEY || 'actingeurope_scanner_device_id'

// Generate a unique device ID for this browser/device
function generateDeviceId(): string {
  const existing = localStorage.getItem(SCANNER_DEVICE_ID_KEY)
  if (existing) return existing
  
  const deviceId = `scanner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  localStorage.setItem(SCANNER_DEVICE_ID_KEY, deviceId)
  return deviceId
}

// Check if current session is a valid scanner session
export function isScannerAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const session = localStorage.getItem(SCANNER_SESSION_KEY)
  const deviceId = localStorage.getItem(SCANNER_DEVICE_ID_KEY)
  
  return !!(session && deviceId)
}

// Get current scanner device ID
export function getScannerDeviceId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SCANNER_DEVICE_ID_KEY)
}

// Authenticate as scanner with password
export async function authenticateScanner(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/scanner-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: SCANNER_EMAIL, 
        password,
        deviceId: generateDeviceId()
      }),
    })

    const result = await response.json()
    
    if (result.success) {
      localStorage.setItem(SCANNER_SESSION_KEY, result.sessionToken)
      localStorage.setItem('actingeurope_scanner_email', SCANNER_EMAIL)
      
      // Dispatch event to notify components
      window.dispatchEvent(new Event('scanner-logged-in'))
      
      return { success: true }
    } else {
      return { success: false, error: result.error || 'Authentication failed' }
    }
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

// Logout scanner session
export function logoutScanner(): void {
  localStorage.removeItem(SCANNER_SESSION_KEY)
  localStorage.removeItem('actingeurope_scanner_email')
  // Keep device ID for future logins
  
  // Dispatch event to notify components
  window.dispatchEvent(new Event('scanner-logged-out'))
}

// Get scanner session token for API calls
export function getScannerSessionToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SCANNER_SESSION_KEY)
}

// Check if user is scanner (for UI purposes)
export function isScannerUser(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('actingeurope_scanner_email') === SCANNER_EMAIL
}

// Validate scanner session with server
export async function validateScannerSession(): Promise<boolean> {
  const token = getScannerSessionToken()
  const deviceId = getScannerDeviceId()
  
  if (!token || !deviceId) return false
  
  try {
    const response = await fetch('/api/auth/validate-scanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    })
    
    const result = await response.json()
    
    if (!result.valid) {
      logoutScanner()
      return false
    }
    
    return true
  } catch (error) {
    console.error('Scanner session validation failed:', error)
    return false
  }
}