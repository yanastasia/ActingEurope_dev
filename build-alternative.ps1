# Alternative build script to avoid Windows permission issues

# Set environment variables to redirect all temp operations
$env:TMPDIR = 'D:\temp'
$env:TMP = 'D:\temp'
$env:TEMP = 'D:\temp'
$env:NODE_OPTIONS = '--max-old-space-size=4096'
$env:NEXT_TELEMETRY_DISABLED = '1'
$env:WEBPACK_DISABLE_HOST_CHECK = 'true'
$env:CI = 'true'
$env:NODE_ENV = 'production'

# Create temp directory
New-Item -ItemType Directory -Force -Path 'D:\temp' | Out-Null

# Try to change user profile temporarily
$originalUserProfile = $env:USERPROFILE
$env:USERPROFILE = 'D:\temp\profile'
New-Item -ItemType Directory -Force -Path $env:USERPROFILE | Out-Null

Write-Host "Starting build with alternative configuration..."

try {
    # Generate Prisma client first
    Write-Host "Generating Prisma client..."
    npx prisma generate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Building Next.js application..."
        # Try direct next build without pnpm
        npx next build --no-lint
    }
} catch {
    Write-Host "Error during build: $_"
} finally {
    # Restore original user profile
    $env:USERPROFILE = $originalUserProfile
}

Write-Host "Build process completed."