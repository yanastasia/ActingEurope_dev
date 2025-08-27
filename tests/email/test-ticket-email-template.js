// Test the new Postmark ticket email template with PDF attachment
require('dotenv').config({ path: '.env' })

const { sendTicketEmailWithTemplate } = require('../../lib/postmark-email-service')

async function testTicketEmailTemplate() {
  console.log('🎭 Testing Postmark Ticket Email Template...')
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    SEND_EMAILS: process.env.SEND_EMAILS,
    POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN ? '✓ Set' : '✗ Missing',
    POSTMARK_TICKET_TEMPLATE_ALIAS: process.env.POSTMARK_TICKET_TEMPLATE_ALIAS || 'ticket-delivery-acting-europe (default)'
  })

  const testTicketData = {
    email: 'test@example.com', // Change this to your test email
    userName: 'John Doe',
    eventTitle: 'Romeo and Juliet',
    eventDate: '2025-02-15',
    eventTime: '19:30',
    venue: 'National Theatre Sofia',
    seats: 'Row A, Seats 12-13',
    bookingReference: 'AE-TEST-001'
  }

  try {
    console.log('\n📧 Sending test ticket email with data:', testTicketData)
    
    const result = await sendTicketEmailWithTemplate(testTicketData)
    
    if (result.success) {
      console.log('✅ Ticket email sent successfully!')
      if (result.messageId) {
        console.log('📬 Postmark Message ID:', result.messageId)
      }
      console.log('\n📋 Template variables used:')
      console.log('- userName:', testTicketData.userName)
      console.log('- eventTitle:', testTicketData.eventTitle)
      console.log('- eventDate:', testTicketData.eventDate)
      console.log('- eventTime:', testTicketData.eventTime)
      console.log('- venue:', testTicketData.venue)
      console.log('- seats:', testTicketData.seats)
      console.log('- bookingReference:', testTicketData.bookingReference)
      console.log('\n📎 PDF attachment: ticket-' + testTicketData.bookingReference + '.pdf')
    } else {
      console.error('❌ Failed to send ticket email:', result.error)
    }
  } catch (error) {
    console.error('❌ Error testing ticket email template:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Run the test
testTicketEmailTemplate().then(() => {
  console.log('\n🏁 Test completed')
  process.exit(0)
}).catch(error => {
  console.error('💥 Test failed:', error)
  process.exit(1)
})