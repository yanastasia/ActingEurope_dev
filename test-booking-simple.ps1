# Simple PowerShell script to create a test booking
$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

Write-Host "Getting events..."
$eventsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/events" -Headers $headers -Method GET
$events = $eventsResponse.Content | ConvertFrom-Json
Write-Host "Found $($events.Count) events"

if ($events.Count -gt 0) {
    $eventId = $events[0].id
    Write-Host "Using event ID: $eventId"
    
    # Create booking data
    $bookingData = @{
        event_id = $eventId
        seat_ids = @(1, 2, 3)
        seats_with_sections = @(
            @{
                id = 1
                section_id = 1
                section_name = "Main Stage"
                section_type = "regular"
            }
        )
    } | ConvertTo-Json -Depth 4
    
    Write-Host "Creating booking..."
    Write-Host "Data: $bookingData"
    
    $bookingResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/bookings" -Headers $headers -Method POST -Body $bookingData
    $booking = $bookingResponse.Content | ConvertFrom-Json
    
    Write-Host "SUCCESS: Booking created!"
    Write-Host "Reference: $($booking.booking_reference)"
    
    # Test PDF download
    Write-Host "Testing PDF download..."
    $pdfUrl = "http://localhost:3000/api/bookings/$($booking.booking_reference)/pdf"
    Write-Host "PDF URL: $pdfUrl"
    
    $pdfResponse = Invoke-WebRequest -Uri $pdfUrl -Method GET
    Write-Host "SUCCESS: PDF Status: $($pdfResponse.StatusCode)"
    Write-Host "Content-Type: $($pdfResponse.Headers['Content-Type'])"
    
} else {
    Write-Host "ERROR: No events found"
}