# Guide: Removing Sensitive Files from GitHub History

## ⚠️ CRITICAL WARNING

**This process will rewrite Git history and is irreversible!**

- Make a complete backup of your repository before proceeding
- All team members will need to re-clone the repository after this operation
- Any existing pull requests will be invalidated
- This should be done during a maintenance window

## 📋 Files Identified for Removal

The following sensitive files have been identified and added to `.gitignore`:

### Environment and Configuration Files
- `.env.example` (contains real API keys - should only have placeholders)
- `render.yaml` (deployment configuration)

### Database Files
- `render_backup.sql` (contains sensitive database data)
- Any `*.sql` files

### Seeding Scripts with Hardcoded Tokens
- `seed-specific-tables.js`
- `seed-via-api.js`
- `cleanup-duplicates.js`
- `seed-backup-improved.js`
- `seed-corrected.js`
- `seed-final.js`
- `seed-from-backup.js`
- `seed-via-backup-api.js`
- `minimal-seed.js`
- `complete-seed.js`

### Test Files with Sensitive Data
- `test-template-variables.js`
- `test-postmark-variables.js`
- All files in `tests/email/` directory
- All files in `tests/general/` directory

### Utility Scripts with Credentials
- `fix-39-simple.js`
- All `check-*.js` files
- All `create-*.js` files
- All `fix-*.js` files
- All `update-*.ps1` files
- All `build-*.ps1` files
- All `repair-*.js` files
- All `reset-*.js` files
- All `align-*.js` files
- All `add-*.js` files
- All `direct-*.js` files
- All `final-*.js` files

### Documentation with Sensitive Information
- `RENDER_DEPLOYMENT.md`
- `SMTP_TESTING_GUIDE.md`

### Data Files
- `theatres.json`
- `theatres_updated.json`

## 🛠️ Removal Methods

Two scripts have been created for you:

### Method 1: Modern Approach (Recommended)
**File:** `remove-sensitive-files-modern.ps1`

- Uses `git-filter-repo` (faster and safer)
- Requires installation of `git-filter-repo`
- Recommended by Git maintainers

**Installation of git-filter-repo:**
```bash
# Option 1: Using pip
pip install git-filter-repo

# Option 2: Using conda
conda install -c conda-forge git-filter-repo

# Option 3: Manual installation
# Download from: https://github.com/newren/git-filter-repo
```

### Method 2: Legacy Approach
**File:** `remove-sensitive-files.ps1`

- Uses `git filter-branch` (built into Git)
- Slower but doesn't require additional installation
- Works with any Git installation

## 📝 Step-by-Step Process

### 1. Backup Your Repository
```bash
# Create a complete backup
git clone --mirror <your-repo-url> backup-repo.git
```

### 2. Choose and Run a Script

**For Modern Approach:**
```powershell
.\remove-sensitive-files-modern.ps1
```

**For Legacy Approach:**
```powershell
.\remove-sensitive-files.ps1
```

### 3. Verify Changes
```bash
# Check that files are removed from history
git log --oneline --name-only

# Verify repository size reduction
git count-objects -vH
```

### 4. Re-add Remote (if using modern approach)
```bash
git remote add origin <your-repo-url>
```

### 5. Force Push Changes
```bash
# Push all branches
git push origin --force --all

# Push all tags
git push origin --force --tags
```

### 6. Notify Team Members
Send this message to all team members:

> **🚨 IMPORTANT: Repository History Rewritten**
> 
> The repository history has been rewritten to remove sensitive files.
> 
> **Action Required:**
> 1. Delete your local repository clone
> 2. Re-clone the repository: `git clone <repo-url>`
> 3. Do NOT try to merge or pull - this will cause conflicts
> 
> **Affected:** All existing clones, forks, and pull requests

## 🔒 Post-Cleanup Security Steps

### 1. Rotate Exposed Credentials
If any of these were exposed in the repository:
- Supabase API keys
- Database passwords
- JWT secrets
- Email service tokens
- Postmark API keys

**Rotate them immediately!**

### 2. Create New Environment Files
```bash
# Create a new .env file with actual values
cp .env.example .env
# Edit .env with your real credentials (never commit this file)
```

### 3. Update .env.example
Ensure `.env.example` only contains placeholder values:
```bash
# Example of safe .env.example content
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url-here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 4. Review Deployment Configurations
- Update Render.com environment variables
- Verify Vercel/Netlify environment variables
- Check any CI/CD pipeline secrets

## 🔍 Verification Checklist

- [ ] Repository size significantly reduced
- [ ] Sensitive files no longer appear in `git log --name-only`
- [ ] `.gitignore` updated to prevent future commits
- [ ] New `.env` file created (not committed)
- [ ] All exposed credentials rotated
- [ ] Team members notified to re-clone
- [ ] Deployment environment variables updated

## 🆘 Troubleshooting

### "git filter-repo not found"
- Install git-filter-repo using pip or conda
- Use the legacy script instead

### "Repository too large" errors
- The process may take time for large repositories
- Consider using `git filter-repo` with `--partial` flag for very large repos

### Team member merge conflicts
- Ensure they delete and re-clone (don't pull/merge)
- Old clones are incompatible with rewritten history

### Lost commits
- Restore from your backup if needed
- Check `git reflog` before running cleanup commands

## 📞 Support

If you encounter issues:
1. Check your backup is complete
2. Review the Git documentation for filter-repo/filter-branch
3. Consider consulting with a Git expert for complex scenarios

---

**Remember: This is a one-way operation. Always backup first!**