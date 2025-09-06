import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Helper function to create Supabase server client
async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get Supabase client
    const supabase = await createSupabaseServerClient();
    
    // Check if user exists in Supabase auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json({ error: 'Failed to check auth users' }, { status: 500 });
    }
    
    // Find user by email in Supabase auth
    const authUser = authUsers.users.find(user => user.email === email.toLowerCase());
    
    if (!authUser) {
      // User doesn't exist in Supabase auth, create them
      const { data: newAuthUser, error: createError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        email_confirm: true,
        user_metadata: {
          first_name: firstName || '',
          last_name: lastName || ''
        }
      });
      
      if (createError) {
        console.error('Error creating auth user:', createError);
        return NextResponse.json({ error: 'Failed to create auth user' }, { status: 500 });
      }
      
      // The trigger will automatically create the user in our users table
      // Wait a moment for the trigger to execute
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Fetch the created user from our database
      const dbUser = await prisma.user.findUnique({
        where: { id: newAuthUser.user!.id }
      });
      
      return NextResponse.json({ user: dbUser });
    } else {
      // User exists in Supabase auth, check if they exist in our database
      let dbUser = await prisma.user.findUnique({
        where: { id: authUser.id }
      });
      
      if (!dbUser) {
        // User exists in auth but not in our database, create them
        dbUser = await prisma.user.create({
          data: {
            id: authUser.id,
            email: authUser.email!,
            first_name: firstName || authUser.user_metadata?.first_name || '',
            last_name: lastName || authUser.user_metadata?.last_name || ''
          }
        });
      }
      
      return NextResponse.json({ user: dbUser });
    }
  } catch (error) {
    console.error('Error in sync-user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}