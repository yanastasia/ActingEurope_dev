"use server"

import { ServerClient } from "postmark"
import { createClient } from '@supabase/supabase-js'

// Initialize Postmark client
const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN || "")

// Initialize Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// For testing/development, we'll log emails instead of sending them
const isDevelopment = process.env.NODE_ENV === 'development' && process.env.SEND_EMAILS !== 'true'

interface UserMetadata {
  first_name: string
  last_name: string
  full_name: string
  is_admin: boolean
}

// Note: Using Supabase's built-in confirmation flow instead of custom tokens

// Send verification email using Postmark template with Supabase-generated confirmation link
async function sendVerificationEmail(email: string, password: string, userMetadata?: UserMetadata): Promise<void> {
  if (isDevelopment) {
    console.log("Development mode: Postmark verification email would be sent to:", email)
    return
  }

  if (!postmarkClient) {
    throw new Error('Postmark client not initialized. Check POSTMARK_API_KEY or POSTMARK_SERVER_TOKEN.')
  }

  // Generate Supabase confirmation link
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      redirectTo: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback`
    }
  });

  if (error) {
    throw new Error(`Failed to generate confirmation link: ${error.message}`);
  }

  const confirmationUrl = data.properties.action_link;
  const templateAlias = process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-signup'
  
  await postmarkClient.sendEmailWithTemplate({
    TemplateAlias: templateAlias,
    To: email,
    From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
    TemplateModel: {
        userName: userMetadata?.first_name || userMetadata?.full_name || 'User',
        confirmationUrl: confirmationUrl
      }
  })
}

// Main signup function with custom verification using Supabase-generated links
export async function signUpWithCustomVerification(
  email: string,
  password: string,
  metadata: UserMetadata
): Promise<{ success: boolean; message?: string; userId?: string }> {
  try {
    // Send custom verification email with Supabase-generated confirmation link
    await sendVerificationEmail(email, password, metadata)

    return {
      success: true,
      message: 'Verification email sent successfully'
    }
  } catch (error) {
    console.error('Signup with verification error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Signup failed'
    }
  }
}

// Note: Email verification is now handled by Supabase's built-in confirmation flow
// Users will be redirected to /auth/callback after clicking the confirmation link

// Test Postmark connection
export async function testPostmarkConnection() {
  if (isDevelopment) {
    console.log("Development mode: Postmark connection test skipped")
    return { success: true, message: "Development mode - test skipped" }
  }

  if (!postmarkClient) {
    return { success: false, error: 'Postmark client not initialized' }
  }

  try {
    const serverInfo = await postmarkClient.getServer()
    console.log("Postmark connection successful:", serverInfo.Name)
    return { success: true, accountName: serverInfo.Name }
  } catch (error: any) {
    console.error("Postmark connection failed:", error)
    return { success: false, error: error.message }
  }
}