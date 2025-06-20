import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper function to check if the request is from a super admin
// In a real application, this would involve proper authentication and authorization checks
// For this example, we'll assume a simple check based on a header or session
const isSuperAdmin = (request: Request) => {
  // This is a placeholder. In a real app, you'd verify a token/session.
  // For now, let's assume a simple header for demonstration.
  const authHeader = request.headers.get('Authorization');
  return authHeader === 'Bearer super_admin_token'; // Replace with actual token validation
};

export async function GET(request: Request) {
  if (!isSuperAdmin(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const users = db.getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isSuperAdmin(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id, newRole } = await request.json();
    if (!id || !newRole) {
      return NextResponse.json({ message: 'Missing required fields: id or newRole' }, { status: 400 });
    }
    const updatedUser = db.updateUserRole(id, newRole);
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ message: 'Error updating user role' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isSuperAdmin(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
    }
    const deleted = db.deleteUser(id);
    if (!deleted) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}