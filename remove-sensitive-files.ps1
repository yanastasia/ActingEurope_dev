# PowerShell script to remove sensitive files from Git history
# WARNING: This will rewrite Git history. Make sure to backup your repository first!

Write-Host "🚨 WARNING: This script will rewrite Git history!" -ForegroundColor Red
Write-Host "📋 Make sure you have a backup of your repository before proceeding." -ForegroundColor Yellow
Write-Host "👥 All team members will need to re-clone the repository after this operation." -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Do you want to proceed? Type 'YES' to continue"
if ($confirmation -ne "YES") {
    Write-Host "❌ Operation cancelled." -ForegroundColor Red
    exit
}

Write-Host "🔄 Starting removal of sensitive files from Git history..." -ForegroundColor Green

# List of sensitive files to remove
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
    "render.yaml"
)

# Remove files from current working directory first
Write-Host "📁 Removing files from current working directory..." -ForegroundColor Blue
foreach ($file in $sensitiveFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   ✅ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Not found: $file" -ForegroundColor Yellow
    }
}

# Remove test files
Write-Host "🧪 Removing test files with sensitive data..." -ForegroundColor Blue
if (Test-Path "tests/email") {
    Get-ChildItem "tests/email" -Filter "test-*.js" | Remove-Item -Force
    Get-ChildItem "tests/email" -Filter "check-*.js" | Remove-Item -Force
    Get-ChildItem "tests/email" -Filter "send-*.js" | Remove-Item -Force
    Get-ChildItem "tests/email" -Filter "debug-*.js" | Remove-Item -Force
    Get-ChildItem "tests/email" -Filter "delete-*.js" | Remove-Item -Force
    Write-Host "   ✅ Removed email test files" -ForegroundColor Green
}

if (Test-Path "tests/general") {
    Get-ChildItem "tests/general" -Filter "test-*.js" | Remove-Item -Force
    Write-Host "   ✅ Removed general test files" -ForegroundColor Green
}

# Remove utility scripts
Write-Host "🔧 Removing utility scripts with credentials..." -ForegroundColor Blue
$scriptPatterns = @("check-*.js", "create-*.js", "fix-*.js", "update-*.ps1", "build-*.ps1", "repair-*.js", "reset-*.js", "align-*.js", "add-*.js", "direct-*.js", "final-*.js")
foreach ($pattern in $scriptPatterns) {
    Get-ChildItem -Filter $pattern | Remove-Item -Force -ErrorAction SilentlyContinue
}
Write-Host "   ✅ Removed utility scripts" -ForegroundColor Green

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
Write-Host "🔄 Now removing files from Git history..." -ForegroundColor Magenta
Write-Host "⏳ This may take a while depending on repository size..." -ForegroundColor Yellow

# Use git filter-branch to remove files from history
foreach ($file in $sensitiveFiles) {
    Write-Host "   🗑️  Removing $file from history..." -ForegroundColor Cyan
    git filter-branch --force --index-filter "git rm --cached --ignore-unmatch '$file'" --prune-empty --tag-name-filter cat -- --all
}

# Remove test directories from history
Write-Host "   🗑️  Removing test files from history..." -ForegroundColor Cyan
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch tests/email/test-*.js tests/email/check-*.js tests/email/send-*.js tests/email/debug-*.js tests/email/delete-*.js tests/general/test-*.js" --prune-empty --tag-name-filter cat -- --all

Write-Host ""
Write-Host "🧹 Cleaning up Git repository..." -ForegroundColor Blue
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host ""
Write-Host "✅ Sensitive files have been removed from Git history!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review the changes with: git log --oneline" -ForegroundColor White
Write-Host "   2. Force push to GitHub: git push origin --force --all" -ForegroundColor White
Write-Host "   3. Force push tags: git push origin --force --tags" -ForegroundColor White
Write-Host "   4. Notify team members to re-clone the repository" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  WARNING: After force pushing, all team members must re-clone!" -ForegroundColor Red
Write-Host "   Old clones will have conflicts and should be deleted." -ForegroundColor Red

Write-Host ""
Write-Host "🔒 Remember to:" -ForegroundColor Cyan
Write-Host "   - Create a new .env file with your actual credentials" -ForegroundColor White
Write-Host "   - Update any deployment configurations" -ForegroundColor White
Write-Host "   - Rotate any exposed API keys or secrets" -ForegroundColor White