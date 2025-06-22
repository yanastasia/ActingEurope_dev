import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/database-operations';


export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Placeholder for super admin check based on the token
    // In a real application, you would validate the token against a session or database
    // For this example, we'll assume a simple check or a more robust token validation
    // This token check here is a placeholder and needs to be integrated with actual auth logic
    if (token !== 'super_admin_token') {
      return NextResponse.json({ message: 'Forbidden: Invalid super admin token' }, { status: 403 });
    }


    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Email, password, and role are required' }, { status: 400 });
    }

    const newUser = await createUser(email, password, role);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}