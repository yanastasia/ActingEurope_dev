# Modern PowerShell script to remove sensitive files from Git history using git-filter-repo
# This is the recommended modern approach (faster and safer than git filter-branch)

Write-Host "🚨 WARNING: This script will rewrite Git history!" -ForegroundColor Red
Write-Host "📋 Make sure you have a backup of your repository before proceeding." -ForegroundColor Yellow
Write-Host "👥 All team members will need to re-clone the repository after this operation." -ForegroundColor Yellow
Write-Host ""

# Check if git-filter-repo is installed
Write-Host "🔍 Checking for git-filter-repo..." -ForegroundColor Blue
try {
    git filter-repo --version | Out-Null
    Write-Host "   ✅ git-filter-repo is installed" -ForegroundColor Green
} catch {
    Write-Host "   ❌ git-filter-repo is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "📦 To install git-filter-repo:" -ForegroundColor Yellow
    Write-Host "   Option 1 (pip): pip install git-filter-repo" -ForegroundColor White
    Write-Host "   Option 2 (manual): Download from https://github.com/newren/git-filter-repo" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Alternatively, use the remove-sensitive-files.ps1 script (uses git filter-branch)" -ForegroundColor Cyan
    exit 1
}

$confirmation = Read-Host "Do you want to proceed? Type 'YES' to continue"
if ($confirmation -ne "YES") {
    Write-Host "❌ Operation cancelled." -ForegroundColor Red
    exit
}

Write-Host "🔄 Starting removal of sensitive files from Git history..." -ForegroundColor Green

# Create a paths file for git-filter-repo
$pathsFile = "sensitive-files-to-remove.txt"
Write-Host "📝 Creating paths file: $pathsFile" -ForegroundColor Blue

$sensitiveFiles = @(
    ".env.example",
    "render_backup.sql",
    "seed-specific-tables.js",
    "seed-via-api.js",
    "cleanup-duplicates.js",
    "seed-backup-improved.js",
    "seed-corrected.js",
    "seed-final.js",
    "seed-from-backup.js",
    "seed-via-backup-api.js",
    "minimal-seed.js",
    "complete-seed.js",
    "test-template-variables.js",
    "test-postmark-variables.js",
    "fix-39-simple.js",
    "RENDER_DEPLOYMENT.md",
    "SMTP_TESTING_GUIDE.md",
    "theatres.json",
    "theatres_updated.json",
    "render.yaml",
    "tests/email/test-*.js",
    "tests/email/check-*.js",
    "tests/email/send-*.js",
    "tests/email/debug-*.js",
    "tests/email/delete-*.js",
    "tests/general/test-*.js",
    "check-*.js",
    "create-*.js",
    "fix-*.js",
    "update-*.ps1",
    "build-*.ps1",
    "repair-*.js",
    "reset-*.js",
    "align-*.js",
    "add-*.js",
    "direct-*.js",
    "final-*.js"
)

# Write paths to file
$sensitiveFiles | Out-File -FilePath $pathsFile -Encoding UTF8

Write-Host "📁 Removing files from current working directory..." -ForegroundColor Blue
foreach ($file in $sensitiveFiles) {
    if ($file -like "*/*" -or $file -like "*\*") {
        # Handle directory patterns
        $pattern = $file -replace "\*", "*"
        Get-ChildItem -Path . -Recurse -Filter ($pattern -split "/")[-1] -ErrorAction SilentlyContinue | 
            Where-Object { $_.FullName -like "*$($file -replace "\*", "*")*" } | 
            Remove-Item -Force -ErrorAction SilentlyContinue
    } else {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "   ✅ Removed: $file" -ForegroundColor Green
        }
    }
}

Write-Host "📝 Staging .gitignore changes..." -ForegroundColor Blue
git add .gitignore

Write-Host "💾 Committing removal of sensitive files..." -ForegroundColor Blue
git commit -m "Remove sensitive files and update .gitignore

- Remove .env.example with real credentials
- Remove database backup files
- Remove seeding scripts with hardcoded tokens
- Remove test files with sensitive data
- Remove utility scripts with credentials
- Remove documentation with sensitive information
- Update .gitignore to prevent future commits"

Write-Host ""
Write-Host "🔄 Now removing files from Git history using git-filter-repo..." -ForegroundColor Magenta
Write-Host "⏳ This may take a while depending on repository size..." -ForegroundColor Yellow

# Use git-filter-repo to remove files from history
git filter-repo --invert-paths --paths-from-file $pathsFile --force

Write-Host ""
Write-Host "🧹 Cleaning up temporary files..." -ForegroundColor Blue
Remove-Item $pathsFile -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✅ Sensitive files have been removed from Git history!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review the changes with: git log --oneline" -ForegroundColor White
Write-Host "   2. Add your remote back: git remote add origin <your-repo-url>" -ForegroundColor White
Write-Host "   3. Force push to GitHub: git push origin --force --all" -ForegroundColor White
Write-Host "   4. Force push tags: git push origin --force --tags" -ForegroundColor White
Write-Host "   5. Notify team members to re-clone the repository" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  WARNING: After force pushing, all team members must re-clone!" -ForegroundColor Red
Write-Host "   Old clones will have conflicts and should be deleted." -ForegroundColor Red

Write-Host ""
Write-Host "🔒 Remember to:" -ForegroundColor Cyan
Write-Host "   - Create a new .env file with your actual credentials" -ForegroundColor White
Write-Host "   - Update any deployment configurations" -ForegroundColor White
Write-Host "   - Rotate any exposed API keys or secrets" -ForegroundColor White

Write-Host ""
Write-Host "📖 Note: git-filter-repo removes the remote origin for safety." -ForegroundColor Blue
Write-Host "   You'll need to add it back before pushing." -ForegroundColor Blue