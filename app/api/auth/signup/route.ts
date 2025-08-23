import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/database-operations'
import { isAdminEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Determine user role based on email domain
    const userRole = isAdminEmail(email) ? 'admin' : 'client'
    
    // Create new user
    const newUser = await createUser(email, password, firstName, lastName, userRole)
    
    // Return success (without password hash)
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        isAdmin: newUser.is_admin,
        phone: newUser.phone,
        emailNotifications: newUser.email_notifications,
        marketingPreferences: newUser.marketing_preferences
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}