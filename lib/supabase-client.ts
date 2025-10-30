"use client"

import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseEnabled = !!supabaseUrl && !!supabaseAnonKey

// Provide a robust fallback client when env vars are missing (development without Supabase)
const fallbackClient = {
  auth: {
    async signUp() {
      return {
        data: { user: null, session: null },
        error: { message: "Supabase is not configured" },
      }
    },
    async signInWithPassword() {
      return {
        data: { user: null, session: null },
        error: { message: "Supabase is not configured" },
      }
    },
    async signOut() {
      return { error: null }
    },
    async getSession() {
      return { data: { session: null }, error: null }
    },
    async getUser() {
      return { data: { user: null }, error: null }
    },
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } }
    },
    async refreshSession() {
      return { data: { session: null }, error: null }
    },
    async resetPasswordForEmail() {
      return { data: {}, error: { message: "Supabase is not configured" } }
    },
  },
}

// For client components - use SSR-compatible browser client when available
export const supabaseClient = supabaseEnabled
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      global: {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    })
  : (fallbackClient as any)

// Auth helper functions for client components
export const clientAuth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabaseClient.auth.signInWithPassword({
      email,
      password,
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
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
  },
}