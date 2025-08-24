# Acting Europe - Database and Build Guide

This guide covers the complete workflow for setting up, building, and running the Acting Europe web application.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Supabase account and project (recommended) or PostgreSQL database
- Git

## Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ActingEurope_dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment variables**
   - Copy `.env.example` to `.env.local`
   - Configure your Supabase database connection strings and other required variables
   
   **Supabase Configuration:**
   ```env
   # Database URLs (from Supabase Project Settings > Database)
   DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:6543/postgres"
   DIRECT_URL="postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:5432/postgres"
   
   # Other required variables
   JWT_SECRET="your-secure-jwt-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```
   
   **Important Notes:**
   - `DATABASE_URL` uses port 6543 for connection pooling (recommended for most operations)
   - `DIRECT_URL` uses port 5432 for direct connections (required for migrations)
   - Get both URLs from your Supabase project dashboard

## Supabase Setup

### 1. Create Supabase Project

1. **Sign up for Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Create a free account
   - Create a new project

2. **Get Database Connection Strings**
   - Navigate to Project Settings > Database
   - Copy the "Connection string" for pooled connections (port 6543)
   - Copy the "Direct connection" string (port 5432)
   - Use these in your `.env.local` file

3. **Configure Environment Variables**
   ```env
   DATABASE_URL="your-pooled-connection-string"
   DIRECT_URL="your-direct-connection-string"
   ```

### 2. Migration from Other Databases

If migrating from another PostgreSQL database:

1. **Backup existing data**
   ```bash
   pg_dump -h old-host -p old-port -U username -d database_name > backup.sql
   ```

2. **Restore to Supabase**
   ```bash
   psql "your-supabase-direct-connection-string" < backup.sql
   ```

## Database Workflow

### 1. Database Schema Management

**Generate Prisma Client**
```bash
npm run db:generate
```
- Generates TypeScript types and Prisma client based on `prisma/schema.prisma`
- Run this after any schema changes

**Push Schema to Database**
```bash
npm run db:push
```
- Pushes schema changes directly to the database
- Good for development and prototyping
- Does not create migration files

**Create and Apply Migrations**
```bash
npm run db:migrate
```
- Creates migration files and applies them
- Recommended for production environments
- Maintains migration history

**Deploy Migrations (Production)**
```bash
npm run db:deploy
```
- Applies pending migrations in production
- Does not prompt for confirmation

### 2. Database Seeding

**Seed the Database**
```bash
npm run db:seed
# or directly
npx tsx prisma/seed.ts
```

**What gets seeded:**
- Admin users (Anastasia and Toni with password: `ActingEurope2025!`)
- Sample theatres and venues
- Performance data
- News articles (if any)
- Sample about page content in multiple languages
- Sample contact page content in multiple languages

**Current Admin Accounts:**
- **Anastasia**: `anastasia@actingeurope.eu` / `ActingEurope2025!`
- **Toni**: `toni@actingeurope.eu` / `ActingEurope2025!`

### 3. Database Commands Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run db:generate` | Generate Prisma client | After schema changes |
| `npm run db:push` | Push schema to DB | Development/prototyping |
| `npm run db:migrate` | Create & apply migrations | Production-ready changes |
| `npm run db:deploy` | Deploy migrations | Production deployment |
| `npm run db:seed` | Populate with sample data | Initial setup or reset |

## Build and Development Workflow

### 1. Development Server

**Start Development Server**
```bash
npm run dev
```
- Starts Next.js development server on `http://localhost:3000`
- Hot reload enabled
- Includes development optimizations

### 2. Production Build

**Build for Production**
```bash
npm run build
```
- Uses custom PowerShell script (`build-alternative.ps1`)
- Handles Windows-specific build optimizations
- Generates optimized production bundle

**Start Production Server**
```bash
npm run start
```
- Serves the built application
- Requires successful build first

### 3. Code Quality

**Linting**
```bash
npm run lint
```
- Runs ESLint to check code quality
- Identifies potential issues and style violations

## Complete Setup Flow (New Environment)

1. **Initial Setup**
   ```bash
   # Clone and install
   git clone <repository-url>
   cd ActingEurope_dev
   npm install
   
   # Configure environment
   cp .env.example .env.local
   # Edit .env.local with your database URL and other settings
   ```

2. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with initial data
   npm run db:seed
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

## Deployment Flow

1. **Pre-deployment**
   ```bash
   # Ensure all dependencies are installed
   npm install
   
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:deploy
   ```

2. **Build and Deploy**
   ```bash
   # Build for production
   npm run build
   
   # Start production server
   npm run start
   ```

## Troubleshooting

### Common Issues

1. **Prisma Client Errors**
   - Run `npm run db:generate` after schema changes
   - Ensure database connection is properly configured

2. **Build Failures**
   - Check that all environment variables are set
   - Ensure database is accessible during build

3. **Seed Failures**
   - Verify database connection
   - Check that schema is up to date
   - Clear existing data if needed

4. **Authentication and Session Issues**
   - **Admin Panel Redirect Loops**: If admin users are redirected to login page repeatedly:
     - Ensure Supabase environment variables are correctly configured
     - Check that user email domain matches admin requirements (@actingeurope.eu)
     - Verify session synchronization between client and server
   - **Session Not Found**: If middleware cannot detect user sessions:
     - Clear browser cookies and localStorage
     - Restart the development server
     - Check that Supabase client is using SSR-compatible configuration
   - **Deprecated Function Warnings**: Update any usage of `createServerClient` to `createBrowserClient` for SSR compatibility

5. **Missing Performance Data**
   - If events like "Don Juan" are missing from the database:
     - Run the data synchronization script: `node reset-events-from-performance-data.js`
     - Verify theatre and venue ID mappings are correct
     - Check for foreign key constraint violations in the console output

### Reset Database

To completely reset your database:
```bash
# Drop and recreate schema
npm run db:push --force-reset

# Re-seed data
npm run db:seed
```

## Content Management System

The application now includes a fully database-connected CMS for dynamic content with multilingual support and shared admin access:

### Theatre Management with Translation Groups
- Automatic multilingual theatre creation in all supported languages (English, Bulgarian, Macedonian, Serbian)
- Translation group system for linking related content across languages
- Enhanced admin interface with language navigation for grouped content
- Shared admin access - all admins can edit any theatre content
- Database functions: `createTheatre()` and `createTheatreWithTranslations()`
- API endpoints: `/api/theatres` (GET, POST, PUT, DELETE)

### News Management with Translation Groups
- Automatic multilingual news article creation
- Translation group display in admin interface
- Consistent multilingual content creation pattern
- API endpoints: `/api/news` (GET, POST, PUT, DELETE)

### Shared Admin Access System
- No content ownership restrictions in database schema
- All admin users can edit content created by any other admin
- Role-based access control (admin and super_admin roles)
- Authorization based on user roles, not content ownership
- Consistent across all content types (theatres, news, about pages, contact pages)

### About Page Management
- Database-stored content with multi-language support
- Admin interface for editing title and content
- Automatic fallback to translation files if no database content exists
- API endpoints: `/api/about` (GET, POST, PUT, DELETE)

### Contact Page Management
- Database-stored contact information (address, phone, email, hours)
- Admin interface for editing all contact details
- Multi-language support for all contact content
- API endpoints: `/api/contact` (GET, POST, PUT)

### File Upload System
- Real file upload functionality via `/api/upload`
- Automatic file validation (type and size)
- Secure filename sanitization
- Files stored in `public/uploads/` directory

## File Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── seed.ts               # Database seeding script
├── lib/
│   ├── prisma.ts             # Prisma client configuration
│   ├── database-operations.ts # Database helper functions
│   └── database.ts           # Mock data and utilities
├── app/api/                  # API routes (server-side)
│   ├── about/                # About page content management
│   ├── contact/              # Contact page content management
│   └── upload/               # File upload handling
├── components/               # React components
├── public/uploads/           # Uploaded files directory
└── .env.local               # Environment variables
```

## Security Notes

- Never commit `.env.local` or any files containing secrets
- Use strong passwords for admin accounts in production
- Regularly update dependencies for security patches
- Use environment-specific database URLs

## Performance Tips

- Run `npm run db:generate` after any schema changes
- Use `npm run db:push` for rapid development iterations
- Use `npm run db:migrate` for production-ready changes
- Monitor database query performance in production

For additional help, refer to the [Prisma documentation](https://www.prisma.io/docs) and [Next.js documentation](https://nextjs.org/docs).