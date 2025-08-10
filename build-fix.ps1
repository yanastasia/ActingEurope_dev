# Temporary build script to work around Windows permission issues

# Set environment variables to avoid problematic directories
$env:TMPDIR = "D:\ActingEurope\ActingEurope_dev\ActingEurope_dev\.tmp"
$env:TEMP = "D:\ActingEurope\ActingEurope_dev\ActingEurope_dev\.tmp"
$env:TMP = "D:\ActingEurope\ActingEurope_dev\ActingEurope_dev\.tmp"
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:WEBPACK_DISABLE_WATCHING = "true"
$env:NEXT_TELEMETRY_DISABLED = "1"

# Create temp directory if it doesn't exist
if (!(Test-Path ".tmp")) {
    New-Item -ItemType Directory -Path ".tmp" -Force
}

# Run Prisma generate first
Write-Host "Generating Prisma client..."
npx prisma generate

# Run the build with specific flags
Write-Host "Starting Next.js build..."
npx next build --no-lint --experimental-build-mode=compile

# Clean up temp directory
if (Test-Path ".tmp") {
    Remove-Item -Path ".tmp" -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Build process completed."