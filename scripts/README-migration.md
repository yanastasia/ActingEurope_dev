# Events Multilingual Migration Script

This script migrates existing events to support the new multilingual functionality by adding translation groups and creating language copies.

## What the Migration Does

1. **Adds Translation Groups**: Assigns a unique translation group ID to each existing event
2. **Sets Content Language**: Ensures all events have a proper content language (defaults to 'en')
3. **Creates Language Copies**: Generates copies of each event in all supported languages (Bulgarian, Macedonian, Serbian)
4. **Maintains Relationships**: Preserves all existing relationships with theatres and venues

## Supported Languages

- `en` - English (default)
- `bg` - Bulgarian
- `mk` - Macedonian
- `sr` - Serbian

## Prerequisites

1. Ensure your database is backed up
2. Make sure the events table has the new multilingual fields:
   - `content_language`
   - `translation_group`
3. Install required dependencies:
   ```bash
   npm install uuid
   ```

## Running the Migration

### Forward Migration

To migrate existing events to multilingual format:

```bash
node scripts/migrate-events-multilingual.js
```

### Rollback Migration

To rollback the migration (removes language copies and translation groups):

```bash
node scripts/migrate-events-multilingual.js rollback
```

## What Happens During Migration

### Before Migration
```
Event 1: "Hamlet" (no translation_group, content_language: null)
Event 2: "Romeo and Juliet" (no translation_group, content_language: null)
```

### After Migration
```
Event 1: "Hamlet" (translation_group: uuid-1, content_language: 'en')
Event 2: "Hamlet (BG)" (translation_group: uuid-1, content_language: 'bg')
Event 3: "Hamlet (MK)" (translation_group: uuid-1, content_language: 'mk')
Event 4: "Hamlet (SR)" (translation_group: uuid-1, content_language: 'sr')
Event 5: "Romeo and Juliet" (translation_group: uuid-2, content_language: 'en')
Event 6: "Romeo and Juliet (BG)" (translation_group: uuid-2, content_language: 'bg')
... and so on
```

## Important Notes

1. **Backup First**: Always backup your database before running the migration
2. **Translation Required**: The script creates placeholder titles with language codes (e.g., "Event Title (BG)"). You'll need to manually translate these titles and descriptions through the admin interface
3. **One-Time Operation**: This migration should only be run once on existing data
4. **Testing**: Test the migration on a development database first

## Post-Migration Steps

1. **Translate Content**: Use the admin interface to properly translate event titles and descriptions
2. **Verify Data**: Check that all events have proper translation groups
3. **Test Frontend**: Ensure the language switching works correctly on the public pages
4. **Update Images**: Consider adding language-specific images if needed

## Troubleshooting

### Common Issues

1. **UUID Package Missing**:
   ```bash
   npm install uuid
   ```

2. **Database Connection Issues**:
   - Check your `.env` file has correct database credentials
   - Ensure the database is running

3. **Migration Already Run**:
   - The script checks for existing translation groups
   - Events with translation groups are skipped

### Verification Queries

After migration, you can verify the results with these SQL queries:

```sql
-- Check total events and translation groups
SELECT 
  COUNT(*) as total_events,
  COUNT(DISTINCT translation_group) as translation_groups
FROM events 
WHERE translation_group IS NOT NULL;

-- Check language distribution
SELECT 
  content_language,
  COUNT(*) as event_count
FROM events 
GROUP BY content_language;

-- Check events by translation group
SELECT 
  translation_group,
  COUNT(*) as versions,
  STRING_AGG(content_language, ', ') as languages
FROM events 
WHERE translation_group IS NOT NULL
GROUP BY translation_group;
```

## Support

If you encounter issues during migration:

1. Check the console output for detailed error messages
2. Verify your database schema matches the expected structure
3. Ensure all prerequisites are met
4. Consider running the rollback if needed and trying again