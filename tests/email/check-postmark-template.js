// Check Postmark template configuration
require('dotenv').config({ path: '.env' })

const { ServerClient } = require('postmark')

const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN || "")

async function checkTemplate() {
  console.log('🔍 Checking Postmark template configuration...')
  console.log('📧 Environment check:')
  console.log('- POSTMARK_API_KEY:', process.env.POSTMARK_API_KEY ? 'Set' : 'Not set')
  console.log('- POSTMARK_SERVER_TOKEN:', process.env.POSTMARK_SERVER_TOKEN ? 'Set' : 'Not set')
  console.log('- Template Alias:', process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-sign-up-for-acting-eur')
  console.log('')
  
  const templateAlias = process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-sign-up-for-acting-eur'
  
  try {
    console.log('📋 Fetching template details...')
    const template = await postmarkClient.getTemplate(templateAlias)
    
    console.log('✅ Template found!')
    console.log('- Template ID:', template.TemplateId)
    console.log('- Template Name:', template.Name)
    console.log('- Template Alias:', template.Alias)
    console.log('- Active:', template.Active)
    console.log('')
    
    console.log('📝 Template Subject:')
    console.log(template.Subject)
    console.log('')
    
    console.log('📧 HTML Body (first 500 characters):')
    console.log(template.HtmlBody.substring(0, 500) + '...')
    console.log('')
    
    console.log('📄 Text Body (first 300 characters):')
    console.log(template.TextBody ? template.TextBody.substring(0, 300) + '...' : 'No text body')
    console.log('')
    
    // Extract variables from HTML body
    const htmlVariables = template.HtmlBody.match(/{{\s*([^}]+)\s*}}/g) || []
    const subjectVariables = template.Subject.match(/{{\s*([^}]+)\s*}}/g) || []
    const textVariables = template.TextBody ? template.TextBody.match(/{{\s*([^}]+)\s*}}/g) || [] : []
    
    const allVariables = [...new Set([...htmlVariables, ...subjectVariables, ...textVariables])]
    
    console.log('🔧 Variables found in template:')
    if (allVariables.length > 0) {
      allVariables.forEach(variable => {
        console.log(`- ${variable}`)
      })
    } else {
      console.log('- No variables found')
    }
    console.log('')
    
    console.log('📤 Variables we are sending:')
    console.log('- {{product_name}}: "Acting Europe"')
    console.log('- {{action_url}}: [Supabase confirmation link]')
    console.log('- {{user_name}}: "Anastasija"')
    console.log('- {{user_email}}: "jakimanastasija@gmail.com"')
    console.log('')
    
    console.log('⚠️  Check if template variables match what we are sending!')
    
  } catch (error) {
    console.error('❌ Error fetching template:', error.message)
    if (error.ErrorCode) {
      console.error('- Postmark Error Code:', error.ErrorCode)
    }
    if (error.stack) {
      console.error('- Stack trace:', error.stack)
    }
  }
}

checkTemplate()