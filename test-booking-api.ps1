# PowerShell script to create a test booking via API
$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

# First, get available events
Write-Host "Getting available events..."
try {
    $eventsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/events" -Headers $headers -Method GET
    $events = $eventsResponse.Content | ConvertFrom-Json
    Write-Host "Found $($events.Count) events"
    
    if ($events.Count -gt 0) {
        # Use the first event
        $eventId = $events[0].id
        Write-Host "Using event ID: $eventId"
        
        # Create a test booking directly without checking seats first
        # We'll use hardcoded seat IDs that should exist in the database
        $bookingData = @{
            event_id = $eventId
            seat_ids = @(1, 2, 3)
            seats_with_sections = @(
                @{
                    id = 1
                    section_id = 1
                    section_name = "Main Stage"
                    section_type = "regular"
                },
                @{
                    id = 2
                    section_id = 1
                    section_name = "Main Stage"
                    section_type = "regular"
                },
                @{
                    id = 3
                    section_id = 1
                    section_name = "Main Stage"
                    section_type = "regular"
                }
            )
        } | ConvertTo-Json -Depth 4
        
        Write-Host "Creating test booking..."
        Write-Host "Booking data: $bookingData"
        
        try {
            $bookingResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/bookings" -Headers $headers -Method POST -Body $bookingData
            $booking = $bookingResponse.Content | ConvertFrom-Json
            
            Write-Host "✅ Booking created successfully!"
            Write-Host "📋 Booking Reference: $($booking.booking_reference)"
            Write-Host "🎫 PDF Download URL: http://localhost:3000/api/bookings/$($booking.booking_reference)/pdf"
            
            # Test the PDF download
            Write-Host "`nTesting PDF download..."
            try {
                $pdfResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/bookings/$($booking.booking_reference)/pdf" -Method GET
                Write-Host "✅ PDF download successful! Status: $($pdfResponse.StatusCode)"
                Write-Host "📄 Content-Type: $($pdfResponse.Headers['Content-Type'])"
                Write-Host "📊 Content-Length: $($pdfResponse.Headers['Content-Length']) bytes"
            }
            catch {
                Write-Host "❌ PDF download failed: $($_.Exception.Message)"
                Write-Host "Response: $($_.Exception.Response)"
            }
            
        }
        catch {
            Write-Host "❌ Booking creation failed: $($_.Exception.Message)"
            if ($_.Exception.Response) {
                try {
                    $errorResponse = $_.Exception.Response.GetResponseStream()
                    $reader = New-Object System.IO.StreamReader($errorResponse)
                    $errorContent = $reader.ReadToEnd()
                    Write-Host "Error details: $errorContent"
                    $reader.Close()
                }
                catch {
                    Write-Host "Could not read error response"
                }
            }
        }
        
    }
    else {
        Write-Host "❌ No events found"
    }
    
}
catch {
    Write-Host "❌ Failed to get events: $($_.Exception.Message)"
}