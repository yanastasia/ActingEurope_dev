"use client"

// Removed direct database imports - now using API routes

export async function verifyEmail(token: string): Promise<{ success: boolean; email?: string; message?: string; role?: string }> {
  try {
    const response = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    })

    const result = await response.json()

    if (!response.ok) {
      return { success: false, message: result.message || result.error || 'Verification failed' }
    }

    return result
  } catch (error) {
    console.error('Email verification error:', error)
    return { success: false, message: 'Network error during verification' }
  }
}