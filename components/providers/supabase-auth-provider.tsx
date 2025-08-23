"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { clientAuth } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { setAuthenticated, clearAuthentication, isAdminEmail } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await clientAuth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
          
          // Sync with localStorage if session exists
          if (session?.user?.email) {
            const isAdmin = isAdminEmail(session.user.email)
            const userRole = isAdmin ? 'admin' : 'user'
            
            console.log('Initial Session Debug:', {
              email: session.user.email,
              isAdmin,
              userRole
            })
            
            setAuthenticated(session.user.email, userRole)
            // Dispatch custom event for admin page
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('user-logged-in'))
            }, 100)
          } else {
            console.log('No initial session found')
            // Clear localStorage if no session
            clearAuthentication()
            // Dispatch custom event for admin page
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('user-logged-out'))
            }, 100)
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = clientAuth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            // User signed in - sync with localStorage
            if (session?.user?.email) {
              const isAdmin = isAdminEmail(session.user.email)
              const userRole = isAdmin ? 'admin' : 'user'
              
              console.log('SIGNED_IN Event Debug:', {
                email: session.user.email,
                isAdmin,
                userRole
              })
              
              setAuthenticated(session.user.email, userRole)
              // Dispatch custom event for admin page
              window.dispatchEvent(new CustomEvent('user-logged-in'))
            }
            break
          case 'SIGNED_OUT':
            // User signed out - clear localStorage
            clearAuthentication()
            // Dispatch custom event for admin page
            window.dispatchEvent(new CustomEvent('user-logged-out'))
            router.push('/auth/login')
            break
          case 'TOKEN_REFRESHED':
            // Token was refreshed - ensure localStorage is still set
            if (session?.user?.email) {
              const isAdmin = isAdminEmail(session.user.email)
              const userRole = isAdmin ? 'admin' : 'user'
              setAuthenticated(session.user.email, userRole)
              // Dispatch custom event for admin page
              window.dispatchEvent(new CustomEvent('user-logged-in'))
            }
            break
          case 'USER_UPDATED':
            // User data was updated
            break
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await clientAuth.signOut()
      if (error) {
        console.error('Error signing out:', error)
        throw error
      }
      // Clear localStorage on manual sign out
      clearAuthentication()
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}