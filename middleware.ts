import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session to ensure we have the latest user data
  const { data: { session } } = await supabase.auth.getSession()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  // Debug logging removed to prevent EvalError in edge runtime

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/bookings',
    '/dashboard',
    '/admin',
    '/scanner',
    '/api/bookings',
    '/api/profile',
  ]

  // Auth routes that should redirect if user is already logged in
  const authRoutes = ['/auth/login', '/auth/signup']

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && user) {
    // Check if user is admin based on email
    const isAdmin = user.email === 'admin@actingeurope.eu'
    // Check if user is scanner based on email
    const isScanner = user.email === 'tickets@actingeurope.eu'
    
    let redirectUrl = '/profile' // default for regular users
    if (isAdmin) {
      redirectUrl = '/admin'
    } else if (isScanner) {
      redirectUrl = '/scanner'
    }
    
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}