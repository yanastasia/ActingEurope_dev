// Test script to verify booking API with proper seat IDs
const testBooking = async () => {
  const testData = {
    userId: 1,
    eventId: 62,
    selectedSeats: [1, 2], // Using actual seat IDs
    attendee_names: [
      { seatId: "1", fullName: "Test User 1" },
      { seatId: "2", fullName: "Test User 2" }
    ],
    totalAmount: 50.00,
    customerEmail: "anastasiayakimovska@gmail.com",
    customerName: "Test Customer"
  };

  try {
    console.log('Testing booking API with data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3002/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Booking API test PASSED');
    } else {
      console.log('❌ Booking API test FAILED');
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testBooking();