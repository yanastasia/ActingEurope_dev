# Update Chamber Stage venue with new seat configuration

# Chamber Stage seat counts per row: 12, 13, 15, 14, 14, 14, 9, 9
$chamberSeatCounts = @(12, 13, 15, 14, 14, 14, 9, 9)

# Create chamber stage rows
$chamberRows = @()
for ($i = 0; $i -lt $chamberSeatCounts.Length; $i++) {
    $rowNumber = $i + 1
    $seatCount = $chamberSeatCounts[$i]
    
    $seats = @()
    for ($j = 1; $j -le $seatCount; $j++) {
        $seats += @{
            seatNumber = $j
            isAccessible = $false
        }
    }
    
    $chamberRows += @{
        rowNumber = $rowNumber
        seats = $seats
    }
}

# Create the venue update payload
$venueData = @{
    name = "Chamber Stage"
    description = "Intimate performance venue for smaller productions"
    capacity = 100
    sections = @(
        @{
            sectionName = "Regular"
            sectionType = "regular"
            rows = $chamberRows
        }
    )
}

# Convert to JSON
$jsonPayload = $venueData | ConvertTo-Json -Depth 10

Write-Host "Updating Chamber Stage venue with new seat configuration..."
Write-Host "Seat counts per row: $($chamberSeatCounts -join ', ')"

try {
    # First, find the Chamber Stage venue ID
    $venues = Invoke-RestMethod -Uri "http://localhost:3001/api/venues"
    $chamberStage = $venues | Where-Object { $_.name -eq "Chamber Stage" }
    
    if ($chamberStage) {
        $venueId = $chamberStage.id
        Write-Host "Found Chamber Stage with ID: $venueId"
        
        $response = Invoke-RestMethod -Uri "http://localhost:3001/api/venues/$venueId" -Method PUT -Body $jsonPayload -ContentType "application/json"
        Write-Host "✅ Successfully updated Chamber Stage venue!"
        Write-Host "Response: $($response | ConvertTo-Json)"
    } else {
        Write-Host "❌ Chamber Stage venue not found"
    }
} catch {
    Write-Host "❌ Error updating venue: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
}