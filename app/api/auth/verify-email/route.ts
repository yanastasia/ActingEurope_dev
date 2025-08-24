import { NextRequest, NextResponse } from 'next/server'
import { getVerificationToken, deleteVerificationToken } from '@/lib/tokens'
import { getUsers } from '@/lib/database-operations'
import { sendWelcomeEmail } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    const verification = await getVerificationToken(token)

    if (!verification) {
      return NextResponse.json(
        { success: false, message: 'Invalid verification token' },
        { status: 400 }
      )
    }

    if (new Date() > verification.expires) {
      await deleteVerificationToken(token)
      return NextResponse.json(
        { success: false, message: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Mark user as verified in the database
    const users = await getUsers()
    const user = users.find((value) => value.email === verification.email)

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Note: Email verification status update would need to be implemented
    // in database-operations.ts if needed for the application

    // Remove the used token
    await deleteVerificationToken(token)

    // Send welcome email to the newly verified user
    try {
      await sendWelcomeEmail(verification.email, `${user.first_name} ${user.last_name}`.trim() || user.email)
      console.log('Welcome email sent to:', verification.email)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't fail the verification if email sending fails
    }

    return NextResponse.json({
      success: true,
      email: verification.email,
      role: user.is_admin ? 'admin' : 'user'
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}