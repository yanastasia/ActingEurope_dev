'use client'

import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// For client components
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helper functions for client components
export const clientAuth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabaseClient.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabaseClient.auth.signOut()
  },

  getSession: async () => {
    return await supabaseClient.auth.getSession()
  },

  getUser: async () => {
    return await supabaseClient.auth.getUser()
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabaseClient.auth.onAuthStateChange(callback)
  },

  resetPassword: async (email: string) => {
    return await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
  }
}