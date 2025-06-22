import { getUsers, updateUserRole, deleteUser } from '@/lib/database-operations';

// Helper function to check if the request is from a super admin
// In a real application, this would involve proper authentication and authorization checks
// For this example, we'll assume a simple check based on a header or session
import { NextResponse } from 'next/server';

const hasAdminAccess = (request: Request) => {
  const authHeader = request.headers.get('Authorization');
  console.log('Auth Header:', authHeader);
  if (!authHeader) {
    console.log('No Authorization header found.');
    return false;
  }
  const userRole = authHeader.replace('Bearer ', '');
  console.log('Extracted User Role:', userRole);
  const hasAccess = userRole === 'super_admin' || userRole === 'admin';
  console.log('Has Access:', hasAccess);
  return hasAccess;
};

export async function GET(request: Request) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id, newRole } = await request.json();
    if (!id || !newRole) {
      return NextResponse.json({ message: 'Missing required fields: id or newRole' }, { status: 400 });
    }
    const updatedUser = await updateUserRole(id, newRole);
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
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Missing user ID' }, { status: 400 });
    }
    const deleted = await deleteUser(id);
    if (!deleted) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}