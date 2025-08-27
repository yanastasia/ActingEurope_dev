require('dotenv').config({ path: '.env' })
const { createClient } = require('@supabase/supabase-js')

async function deleteUser() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // First, get the user by email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      return
    }

    const user = users.users.find(u => u.email === 'jakimanastasija@gmail.com')
    
    if (user) {
      console.log('Found user:', user.id, user.email)
      
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
      
      if (deleteError) {
        console.error('Error deleting user:', deleteError)
      } else {
        console.log('✅ User deleted successfully')
      }
    } else {
      console.log('User not found')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

deleteUser()