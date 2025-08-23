import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/auth/check - Check if user is authenticated and admin
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { isAuthenticated: false, isAdmin: false },
        { status: 200 }
      );
    }

    const userRole = authHeader.replace('Bearer ', '');
    const isAdmin = userRole === 'admin' || userRole === 'super_admin';
    
    return NextResponse.json(
      { 
        isAuthenticated: true, 
        isAdmin,
        role: userRole
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json(
      { 
        isAuthenticated: false, 
        isAdmin: false,
        error: 'Failed to check authentication status'
      },
      { status: 500 }
    );
  }
}