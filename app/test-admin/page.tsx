"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isAdmin, isAuthenticated, getUserEmail, isAdminEmail } from '@/lib/auth'
import { clientAuth } from '@/lib/supabase-client'

export default function TestAdminPage() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    userEmail: '',
    supabaseUser: null as any
  })
  const [mounted, setMounted] = useState(false)

  const checkAuthState = async () => {
    const { data: { session } } = await clientAuth.getSession()
    
    setAuthState({
      isAuthenticated: isAuthenticated(),
      isAdmin: isAdmin(),
      userEmail: getUserEmail() || '',
      supabaseUser: session?.user || null
    })
  }

  useEffect(() => {
    setMounted(true)
    checkAuthState()
    
    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthState()
    }
    
    window.addEventListener('user-logged-in', handleAuthChange)
    window.addEventListener('user-logged-out', handleAuthChange)
    
    return () => {
      window.removeEventListener('user-logged-in', handleAuthChange)
      window.removeEventListener('user-logged-out', handleAuthChange)
    }
  }, [])

  const testEmail = (email: string) => {
    return isAdminEmail(email)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Authentication Test</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Authentication State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Is Authenticated:</strong> {authState.isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>Is Admin:</strong> {authState.isAdmin ? 'Yes' : 'No'}</p>
            <p><strong>User Email (localStorage):</strong> {authState.userEmail || 'None'}</p>
            <p><strong>Supabase User Email:</strong> {authState.supabaseUser?.email || 'None'}</p>
            <p><strong>User Role (localStorage):</strong> {mounted ? localStorage.getItem('actingEurope_userRole') || 'None' : 'Loading...'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Domain Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>test@actingeurope.eu:</strong> {testEmail('test@actingeurope.eu') ? 'Admin' : 'Regular'}</p>
            <p><strong>admin@actingeurope.eu:</strong> {testEmail('admin@actingeurope.eu') ? 'Admin' : 'Regular'}</p>
            <p><strong>user@gmail.com:</strong> {testEmail('user@gmail.com') ? 'Admin' : 'Regular'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkAuthState} className="mr-2">
              Refresh Auth State
            </Button>
            <Button 
              onClick={() => {
                console.log('Current localStorage state:', {
                  auth: localStorage.getItem('actingEurope_auth'),
                  email: localStorage.getItem('actingEurope_userEmail'),
                  role: localStorage.getItem('actingEurope_userRole')
                })
              }}
              variant="outline"
            >
              Log localStorage to Console
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}