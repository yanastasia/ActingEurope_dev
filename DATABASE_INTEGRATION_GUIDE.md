# Database Integration and CMS Features Guide

This guide covers the recent database integration improvements and Content Management System (CMS) features implemented in the Acting Europe application.

## Overview

The application has been enhanced with full database integration for dynamic content management, replacing previous placeholder implementations with real database-connected functionality. The system is fully compatible with Supabase PostgreSQL and includes connection pooling for optimal performance.

## Features Implemented

### 1. Multilingual Theatre Management

**Location**: `app/admin/theatres/page.tsx`, `app/api/theatres/route.ts`

**Features**:
- Automatic multilingual theatre creation in all supported languages
- Translation group system for linking related content across languages
- Enhanced admin interface with language navigation for grouped content
- Shared admin access - all admins can edit any theatre content
- Database functions for single and multilingual theatre creation

**API Endpoints**:
- `GET /api/theatres` - Fetch all theatres with translation grouping
- `POST /api/theatres` - Create theatre with automatic multilingual versions
- `PUT /api/theatres/[id]` - Update specific theatre
- `DELETE /api/theatres/[id]` - Delete specific theatre

**Database Functions**:
- `createTheatre()` - Create single theatre entry
- `createTheatreWithTranslations()` - Create theatre in all languages with shared translation_group

**Database Schema**:
```sql
Theatre {
  id: number
  name: string
  city: string
  country: string
  description: string
  history: string
  website: string?
  founded_year: number?
  content_language: string
  translation_group: string?
  created_at: DateTime
  updated_at: DateTime
}
```

**Supported Languages**: English (en), Bulgarian (bg), Macedonian (mk), Serbian (sr)

### 2. Shared Admin Access System

**Features**:
- No content ownership restrictions in database schema
- All admin users can edit content created by any other admin
- Role-based access control (admin and super_admin roles)
- Authorization based on user roles, not content ownership
- Consistent across all content types (theatres, news, about pages, contact pages)

**Implementation**:
- No `created_by`, `author_id`, or `user_id` fields in content tables
- API endpoints check admin role via `hasAdminAccess()` helper function
- Authorization header validation for admin operations
- Shared content management across all admin users

### 3. About Page Database Integration

**Location**: `app/about/page.tsx`

**Features**:
- Dynamic content loading from database
- Multi-language support with automatic fallbacks
- Admin editing interface for title and content
- Real-time content updates
- Loading states and error handling

**API Endpoints**:
- `GET /api/about?language={lang}` - Fetch about page content
- `POST /api/about` - Create new about page content
- `PUT /api/about` - Update existing about page content
- `DELETE /api/about` - Delete about page content

**Database Schema**:
```sql
AboutPage {
  id: number
  title: string
  content: string
  language: string
  created_at: DateTime
  updated_at: DateTime
}
```

**Supabase Configuration**:
- Uses pooled connections (port 6543) for optimal performance
- Supports direct connections (port 5432) for migrations
- Full compatibility with Supabase's PostgreSQL implementation

### 2. Contact Page Database Integration

**Location**: `app/contact/page.tsx`

**Features**:
- Dynamic contact information from database
- Editable contact details (address, phone, email, hours)
- Multi-language support for all contact content
- Admin editing interface
- Form integration with dynamic content

**API Endpoints**:
- `GET /api/contact?language={lang}` - Fetch contact page content
- `POST /api/contact` - Create new contact page content
- `PUT /api/contact` - Update existing contact page content

**Database Schema**:
```sql
ContactPage {
  id: number
  title: string
  description: string
  address: string
  phone: string
  email: string
  business_hours: string
  language: string
  created_at: DateTime
  updated_at: DateTime
}
```

### 3. File Upload System

**Location**: `app/api/upload/route.ts`

**Features**:
- Real file upload functionality
- File type validation (images only)
- File size limits (10MB maximum)
- Secure filename sanitization
- Automatic directory creation
- Public URL generation

**Usage in Admin Panel**:
- Integrated into `app/admin/page.tsx`
- Replaces previous placeholder image URLs
- Error handling and success notifications
- Toast notifications for user feedback

**File Storage**:
- Files stored in `public/uploads/` directory
- Accessible via `/uploads/{filename}` URLs
- Automatic timestamp-based naming to prevent conflicts

## Implementation Details

### Content Loading Strategy

1. **Primary**: Load content from database based on current language
2. **Fallback 1**: If no database content, use translation files
3. **Fallback 2**: If translation missing, use English as default
4. **Error Handling**: Display user-friendly error messages

### Admin Interface Integration

**About Page Editing**:
- Edit button visible only to admin users
- Inline editing with input fields
- Save/Cancel functionality
- Real-time preview of changes

**Contact Page Editing**:
- Comprehensive editing interface
- All contact fields editable
- Validation for required fields
- Immediate UI updates after saving

### Multi-Language Support

**Language Detection**:
- Uses `useLanguage()` context for current language
- Automatic API calls with language parameter
- Seamless language switching

**Content Fallbacks**:
- Database content takes priority
- Translation files as backup
- English as ultimate fallback

## Database Operations

### Seeding

The database seed script (`prisma/seed.ts`) now includes:
- Sample about page content in multiple languages
- Sample contact page content in multiple languages
- Proper translation group linking

### Migration

No manual migration required as:
- Schema changes are handled by Prisma
- New tables created automatically
- Existing data remains intact

### 6. Admin QR Code Management System

**Location**: `app/admin/qr-scanner/page.tsx`, `app/api/admin/add-qr/route.ts`

**Features**:
- Camera-based QR code scanning interface for administrators
- Manual QR code input option for cases where camera scanning fails
- Attendee name association with scanned QR codes
- Integration with existing QR verification system
- Support for external QR codes not originally generated by the system
- Real-time validation and duplicate prevention

**API Endpoints**:
- `POST /api/admin/add-qr` - Add external QR codes to system with attendee information
- Admin access to `/admin/qr-scanner` page for scanning interface

**Database Integration**:
- External QR codes stored in `qr_code_data` field of `BookedSeat` model
- Attendee names stored in `attendee_name` field
- Compatible with existing `verifyQrPayload` function in `lib/tickets/qr.ts`
- QR codes may not be linked to specific seats (used primarily for validation)

**Database Schema Usage**:
```sql
BookedSeat {
  id: number
  booking_id: number
  seat_id: number?
  attendee_name: string
  qr_code_data: string
  scanned_at: DateTime?
  // ... other fields
}
```

**Security Features**:
- Admin-only access control via role-based permissions
- QR code validation against existing database entries
- Duplicate QR code prevention
- Input sanitization for attendee names and QR data

**Use Cases**:
- Adding external QR codes from third-party ticketing systems
- Manual entry verification for events
- Backup validation method when primary ticketing fails
- Integration with legacy ticketing systems

**Navigation Integration**:
- New "QR Scanner" menu item in admin dropdown navigation
- Seamless integration with existing admin interface
- Role-based visibility (only visible to admin users)

## API Usage Examples

### Fetch About Page Content
```javascript
// Get English about page
const response = await fetch('/api/about?language=en');
const aboutData = await response.json();

// Get Bulgarian about page
const response = await fetch('/api/about?language=bg');
const aboutData = await response.json();
```

### Update About Page Content
```javascript
const response = await fetch('/api/about', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    title: 'New Title',
    content: 'Updated content',
    language: 'en'
  })
});
```

### Upload File
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('File URL:', result.url);
```

### Add External QR Code
```javascript
// Add external QR code with attendee information
const response = await fetch('/api/admin/add-qr', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    qrData: 'scanned-qr-code-data',
    attendeeName: 'John Doe'
  })
});

const result = await response.json();
if (result.success) {
  console.log('QR code added successfully:', result.bookedSeat);
} else {
  console.error('Error:', result.error);
}
```

### Verify QR Code
```javascript
// Verify QR code for ticket validation
const response = await fetch('/api/verify-qr', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    qrData: 'qr-code-to-verify'
  })
});

const result = await response.json();
if (result.success) {
  console.log('Valid ticket:', result.ticket);
  console.log('Event:', result.event);
  console.log('Customer:', result.customer);
} else {
  console.error('Invalid QR code:', result.error);
}
```

## Security Considerations

### File Upload Security
- File type validation (images only)
- File size limits enforced
- Filename sanitization to prevent path traversal
- No executable file uploads allowed

### Content Management Security
- Admin-only editing permissions
- Input validation and sanitization
- SQL injection prevention via Prisma ORM
- XSS protection through proper escaping

## Performance Optimizations

### Caching Strategy
- Database queries optimized for language-specific content
- Efficient fallback mechanisms
- Minimal API calls through smart state management

### Loading States
- Skeleton UI during content loading
- Progressive enhancement approach
- Graceful degradation for slow connections

## Troubleshooting

### Common Issues

1. **Content Not Loading**
   - Check database connection
   - Verify API endpoints are accessible
   - Check browser console for errors

2. **File Upload Failures**
   - Verify file size is under 10MB
   - Ensure file is an image type
   - Check `public/uploads/` directory permissions

3. **Admin Interface Not Showing**
   - Verify user has admin privileges
   - Check authentication status
   - Ensure proper session management

### Debug Commands

```bash
# Check database content
npx prisma studio

# View API logs
npm run dev
# Check terminal output for API calls

# Reset database if needed
npm run db:push --force-reset
npm run db:seed
```

## Future Enhancements

### Planned Features
1. **Bulk Content Management**: Edit multiple languages simultaneously
2. **Content Versioning**: Track changes and allow rollbacks
3. **Media Library**: Enhanced file management interface
4. **Content Scheduling**: Schedule content updates
5. **SEO Optimization**: Meta tags and structured data

### Technical Improvements
1. **Caching Layer**: Redis integration for better performance
2. **CDN Integration**: Faster file delivery
3. **Image Optimization**: Automatic resizing and compression
4. **Content Validation**: Rich text editor with validation

## Conclusion

The database integration and CMS features provide a solid foundation for dynamic content management in the Acting Europe application. The implementation follows best practices for security, performance, and user experience while maintaining backward compatibility with existing translation systems.