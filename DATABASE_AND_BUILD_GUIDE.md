# Acting Europe - Database and Build Guide

This guide covers the complete workflow for setting up, building, and running the Acting Europe web application.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- PostgreSQL database (local or remote)
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
   - Configure your database connection string and other required variables

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

### Reset Database

To completely reset your database:
```bash
# Drop and recreate schema
npm run db:push --force-reset

# Re-seed data
npm run db:seed
```

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
├── components/               # React components
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