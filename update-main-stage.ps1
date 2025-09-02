# Update Main Stage venue with new seat configuration

# Regular section seat counts per row: 22, 27, 26, 29, 28, 31, 0, 30, 33, 33, 33, 33, 32, 31, 30, 26, 26
# Balcony section seat counts per row: 30, 29, 30, 29, 30, 29

$regularSeatCounts = @(22, 27, 26, 29, 28, 31, 0, 30, 33, 33, 33, 33, 32, 31, 30, 26, 26)
$balconySeatCounts = @(30, 29, 30, 29, 30, 29)

# Create regular section rows
$regularRows = @()
for ($i = 0; $i -lt $regularSeatCounts.Length; $i++) {
    $rowNumber = $i + 1
    $seatCount = $regularSeatCounts[$i]
    
    if ($seatCount -eq 0) {
        # Skip row 7 (0 seats)
        continue
    }
    
    $seats = @()
    for ($j = 1; $j -le $seatCount; $j++) {
        $seats += @{
            seatNumber = $j
            isAccessible = $false
        }
    }
    
    $regularRows += @{
        rowNumber = $rowNumber
        seats = $seats
    }
}

# Create balcony section rows
$balconyRows = @()
for ($i = 0; $i -lt $balconySeatCounts.Length; $i++) {
    $rowNumber = $i + 1
    $seatCount = $balconySeatCounts[$i]
    
    $seats = @()
    for ($j = 1; $j -le $seatCount; $j++) {
        $seats += @{
            seatNumber = $j
            isAccessible = $false
        }
    }
    
    $balconyRows += @{
        rowNumber = $rowNumber
        seats = $seats
    }
}

# Create the venue update payload
$venueData = @{
    name = "Main Stage"
    description = "Main performance venue with regular and balcony seating"
    capacity = 500
    sections = @(
        @{
            sectionName = "Regular"
            sectionType = "regular"
            rows = $regularRows
        },
        @{
            sectionName = "Balcony"
            sectionType = "balcony"
            rows = $balconyRows
        }
    )
}

# Convert to JSON
$jsonPayload = $venueData | ConvertTo-Json -Depth 10

Write-Host "Updating Main Stage venue (ID: 16) with new seat configuration..."
Write-Host "Regular section: $($regularSeatCounts -join ', ') seats per row"
Write-Host "Balcony section: $($balconySeatCounts -join ', ') seats per row"

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/venues/16" -Method PUT -Body $jsonPayload -ContentType "application/json"
    Write-Host "✅ Successfully updated Main Stage venue!"
    Write-Host "Response: $($response | ConvertTo-Json)"
} catch {
    Write-Host "❌ Error updating venue: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
}