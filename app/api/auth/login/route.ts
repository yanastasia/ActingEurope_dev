import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/database-operations'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await getUserByEmail(email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'No user found with this email' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      )
    }

    // Return user data (without password hash)
    const { password_hash, ...userWithoutPassword } = user
    
    return NextResponse.json({
      success: true,
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        firstName: userWithoutPassword.first_name,
        lastName: userWithoutPassword.last_name,
        isAdmin: userWithoutPassword.is_admin,
        phone: userWithoutPassword.phone,
        emailNotifications: userWithoutPassword.email_notifications,
        marketingPreferences: userWithoutPassword.marketing_preferences
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}