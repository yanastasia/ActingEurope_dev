// Direct test of Postmark email delivery
require('dotenv').config({ path: '.env' })

const { ServerClient } = require('postmark')
const { createClient } = require('@supabase/supabase-js')

const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN || "")
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testEmailDelivery() {
  console.log('🧪 Testing direct email delivery...')
  console.log('📧 Environment check:')
  console.log('- POSTMARK_API_KEY:', process.env.POSTMARK_API_KEY ? 'Set' : 'Not set')
  console.log('- POSTMARK_SERVER_TOKEN:', process.env.POSTMARK_SERVER_TOKEN ? 'Set' : 'Not set')
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('- Template Alias:', process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-signup')
  console.log('')
  
  const testEmail = 'jakimanastasija@gmail.com'
  const testPassword = 'testpassword123'
  const userMetadata = {
    first_name: 'Anastasija',
    last_name: 'Jakimovska',
    full_name: 'Anastasija Jakimovska',
    is_admin: false
  }

  try {
    console.log('🔗 Generating Supabase confirmation link...')
    
    // Generate Supabase confirmation link
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
    
    console.log('📧 Sending email via Postmark...')
    console.log('- To:', testEmail)
    console.log('- Template:', templateAlias)
    console.log('- Confirmation URL:', confirmationUrl.substring(0, 80) + '...')
    
    const templateModel = {
       userName: userMetadata.first_name || userMetadata.full_name || 'User',
       confirmationUrl: confirmationUrl
     }
    
    console.log('📋 Template variables:')
    console.log(JSON.stringify(templateModel, null, 2))
    
    const result = await postmarkClient.sendEmailWithTemplate({
      TemplateAlias: templateAlias,
      To: testEmail,
      From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
      TemplateModel: templateModel
    })
    
    console.log('✅ Email sent successfully!')
    console.log('📬 Postmark response:')
    console.log('- Message ID:', result.MessageID)
    console.log('- To:', result.To)
    console.log('- Submitted at:', result.SubmittedAt)
    console.log('')
    console.log('🎯 Check your email inbox for the verification message!')
    
  } catch (error) {
    console.error('❌ Error during email delivery:', error.message)
    if (error.ErrorCode) {
      console.error('- Postmark Error Code:', error.ErrorCode)
    }
    if (error.stack) {
      console.error('- Stack trace:', error.stack)
    }
  }
}

testEmailDelivery()