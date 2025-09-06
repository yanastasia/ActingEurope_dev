require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exportAuthUsers() {
  try {
    console.log('Exporting users from Supabase auth...');
    
    // Get all users from Supabase auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return;
    }
    
    console.log(`Found ${authUsers.users.length} users in Supabase auth`);
    
    // Transform users for database insertion
    const usersForDatabase = authUsers.users.map(authUser => ({
      id: authUser.id,
      email: authUser.email || '',
      first_name: authUser.user_metadata?.first_name || '',
      last_name: authUser.user_metadata?.last_name || '',
      phone: authUser.user_metadata?.phone || null,
      is_admin: false,
      email_notifications: true,
      marketing_preferences: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    // Write to JSON file
    const outputPath = 'scripts/auth-users-export.json';
    fs.writeFileSync(outputPath, JSON.stringify(usersForDatabase, null, 2));
    
    console.log(`\nExported ${usersForDatabase.length} users to ${outputPath}`);
    console.log('\nYou can now:');
    console.log('1. Review the exported users in the JSON file');
    console.log('2. Use Prisma Studio or SQL to import these users into your database');
    console.log('3. Or use the JSON data in your application');
    
    // Also create SQL insert statements
    const sqlStatements = usersForDatabase.map(user => 
      `INSERT INTO users (id, email, first_name, last_name, phone, is_admin, email_notifications, marketing_preferences, created_at, updated_at) VALUES ('${user.id}', '${user.email.replace(/'/g, "''")}', '${user.first_name.replace(/'/g, "''")}', '${user.last_name.replace(/'/g, "''")}', ${user.phone ? `'${user.phone}'` : 'NULL'}, ${user.is_admin}, ${user.email_notifications}, ${user.marketing_preferences}, '${user.created_at}', '${user.updated_at}') ON CONFLICT (id) DO NOTHING;`
    ).join('\n');
    
    const sqlPath = 'scripts/insert-users.sql';
    fs.writeFileSync(sqlPath, sqlStatements);
    
    console.log(`\nAlso created SQL insert statements in ${sqlPath}`);
    
  } catch (error) {
    console.error('Export failed:', error);
  }
}

// Run the export
exportAuthUsers();