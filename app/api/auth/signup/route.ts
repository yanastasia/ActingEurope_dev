import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/database-operations'
import { isAdminEmail } from '@/lib/auth'
import { signUpWithCustomVerification } from '@/lib/postmark-verification-service'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists in our database
    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Determine user role based on email domain
    const userRole = isAdminEmail(email) ? 'admin' : 'client'
    const isAdmin = userRole === 'admin'
    
    if (isAdmin) {
      // For admin users, create directly without email verification
      const newUser = await createUser(email, password, firstName, lastName, userRole)
      
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
        },
        message: 'Admin account created successfully. No email verification required.'
      })
    } else {
      // For regular users, use Postmark verification flow
      const result = await signUpWithCustomVerification(email, password, {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        is_admin: false
      })
      
      if (!result.success) {
        throw new Error(result.message || 'Signup failed')
      }
      
      // Also create user in our database (but mark as unverified)
      // We'll update this when email is verified
      const newUser = await createUser(email, password, firstName, lastName, userRole)
      
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
        },
        message: 'Account created successfully. Please check your email for verification instructions.',
        requiresVerification: true
      })
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}