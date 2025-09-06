require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const prisma = new PrismaClient();

async function migrateUsers() {
  try {
    console.log('Starting user migration from Supabase auth to users table...');
    
    // Get all users from Supabase auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return;
    }
    
    console.log(`Found ${authUsers.users.length} users in Supabase auth`);
    
    // Get existing users from our database
    const existingUsers = await prisma.user.findMany();
    const existingUserIds = new Set(existingUsers.map(user => user.id));
    
    console.log(`Found ${existingUsers.length} users in application database`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    // Migrate each auth user to our users table
    for (const authUser of authUsers.users) {
      if (existingUserIds.has(authUser.id)) {
        console.log(`Skipping user ${authUser.email} - already exists in database`);
        skippedCount++;
        continue;
      }
      
      try {
        await prisma.user.create({
          data: {
            id: authUser.id,
            email: authUser.email || '',
            first_name: authUser.user_metadata?.first_name || '',
            last_name: authUser.user_metadata?.last_name || '',
            phone: authUser.user_metadata?.phone || null,
            is_admin: false,
            email_notifications: true,
            marketing_preferences: false
          }
        });
        
        console.log(`Migrated user: ${authUser.email}`);
        migratedCount++;
      } catch (error) {
        console.error(`Error migrating user ${authUser.email}:`, error);
      }
    }
    
    console.log(`\nMigration completed:`);
    console.log(`- Migrated: ${migratedCount} users`);
    console.log(`- Skipped: ${skippedCount} users`);
    console.log(`- Total in auth: ${authUsers.users.length} users`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateUsers();