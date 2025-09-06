import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Admin email addresses
const ADMIN_EMAILS = [
  'admin@actingeurope.eu',
  'info@actingeurope.eu'
];

export async function isAdmin(): Promise<{ isAdmin: boolean }> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return { isAdmin: false };
    }
    
    return { isAdmin: ADMIN_EMAILS.includes(session.user.email) };
  } catch (error) {
    console.error('Error checking admin status:', error);
    return { isAdmin: false };
  }
}

export async function requireAdmin() {
  const adminCheck = await isAdmin();
  
  if (!adminCheck.isAdmin) {
    throw new Error('Admin access required');
  }
  
  return true;
}