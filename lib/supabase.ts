import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseEnabled = !!supabaseUrl && !!supabaseAnonKey

const fallbackClient = {
  auth: {
    async signUp() { return { data: { user: null, session: null }, error: { message: 'Supabase is not configured' } } },
    async signInWithPassword() { return { data: { user: null, session: null }, error: { message: 'Supabase is not configured' } } },
    async signOut() { return { error: null } },
    async getSession() { return { data: { session: null }, error: null } },
    async getUser() { return { data: { user: null }, error: null } },
    onAuthStateChange() { return { data: { subscription: { unsubscribe(){} } } } }
  }
} as any

export const supabase = supabaseEnabled
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : fallbackClient

// Helper functions for authentication
export const auth = {
  signUp: async (email: string, password: string, options?: { data?: any }) => {
    return await supabase.auth.signUp({
      email,
      password,
      options
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getSession: async () => {
    return await supabase.auth.getSession()
  },

  getUser: async () => {
    return await supabase.auth.getUser()
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}