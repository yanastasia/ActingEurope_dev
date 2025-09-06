const { generateTicketPdfBufferReact } = require('./lib/pdf/react-pdf-generator');

async function testPdfGeneration() {
  try {
    const result = await generateTicketPdfBufferReact({
      event: {
        id: '1',
        title: 'Test Event',
        date: '2024-01-01',
        time: '19:00',
        venueName: 'Test Venue',
        address: 'Test Address'
      },
      bookingReference: 'TEST123'
    }, {
      seatId: '1',
      row: 1,
      number: 1,
      attendeeName: 'Test User'
    });
    
    console.log('Result type:', typeof result);
    console.log('Result keys:', Object.keys(result));
    console.log('Buffer type:', typeof result.buffer);
    console.log('Buffer is Buffer?', Buffer.isBuffer(result.buffer));
    console.log('Buffer length:', result.buffer?.length);
    
    if (result.buffer) {
      const base64 = result.buffer.toString('base64');
      console.log('Base64 length:', base64.length);
      console.log('Base64 starts with:', base64.substring(0, 50));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testPdfGeneration();