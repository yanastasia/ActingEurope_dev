import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseEnabled = !!supabaseUrl && !!supabaseAnonKey

// For server components and API routes
export const createSupabaseServerClient = () => {
  if (!supabaseEnabled) {
    // Fallback server client with minimal auth interface
    return {
      auth: {
        async getUser() { return { data: { user: null }, error: null } },
        async getSession() { return { data: { session: null }, error: null } },
        async signOut() { return { error: null } },
      }
    } as any
  }

  const cookieStore = cookies()

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      async getAll() {
        return (await cookieStore).getAll()
      },
      async setAll(cookiesToSet) {
        try {
          const store = await cookieStore
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options)
          })
        } catch (error) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Helper function to get current user on server
export const getServerUser = async () => {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to get session on server
export const getServerSession = async () => {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}