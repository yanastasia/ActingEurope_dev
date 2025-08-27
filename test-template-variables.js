// Simple test to verify template variables being sent to Postmark
const { createClient } = require('@supabase/supabase-js')
const { ServerClient } = require('postmark')

// Environment setup
require('dotenv').config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN || "")

async function testTemplateVariables() {
  console.log('🧪 Testing Postmark template variables...')
  
  const testEmail = 'yakimovskaanastasia@gmail.com'
  const testPassword = 'testpassword123'
  const userMetadata = {
    first_name: 'John',
    last_name: 'Doe',
    full_name: 'John Doe',
    is_admin: false
  }

  try {
    // Generate Supabase confirmation link (same as in the service)
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "signup",
      email: testEmail,
      password: testPassword,
      options: {
        redirectTo: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback`
      }
    })

    if (error) {
      throw new Error(`Failed to generate confirmation link: ${error.message}`)
    }

    const confirmationUrl = data.properties.action_link
    const templateAlias = process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-signup'
    
    // Create the template model (same as in the service)
    const templateModel = {
      product_name: 'Acting Europe',
      action_url: confirmationUrl,
      user_name: userMetadata?.first_name || userMetadata?.full_name || 'User',
      user_email: testEmail
    }
    
    console.log('📧 Template variables that would be sent to Postmark:')
    console.log(JSON.stringify(templateModel, null, 2))
    
    console.log('\n📋 Variable breakdown:')
    console.log(`✅ product_name: ${templateModel.product_name}`)
    console.log(`✅ action_url: ${templateModel.action_url}`)
    console.log(`✅ user_name: ${templateModel.user_name}`)
    console.log(`✅ user_email: ${templateModel.user_email}`)
    
    console.log('\n🎯 Template alias:', templateAlias)
    console.log('🎯 To email:', testEmail)
    console.log('🎯 From email:', process.env.EMAIL_FROM || 'info@actingeurope.eu')
    
  } catch (error) {
    console.error('❌ Error testing template variables:', error.message)
  }
}

testTemplateVariables()