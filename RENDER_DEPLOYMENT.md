# Render Deployment Guide with Supabase Database

This guide will help you deploy the ActingEurope application on Render.com using Supabase as the database provider.

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Setup Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Choose a project name and database password
   - Select a region closest to your users

2. **Get Database Connection Strings**
   - Navigate to Project Settings > Database
   - Copy the "Connection string" (pooled connection - port 6543)
   - Copy the "Direct connection" string (port 5432)
   - You'll need both for the deployment

3. **Configure Database Settings**
   - The database is automatically provisioned
   - Supabase provides connection pooling by default
   - Free tier includes 500MB storage and 2GB bandwidth

**Note**: Supabase provides a comprehensive dashboard for database management, including a built-in SQL editor and table viewer.

## Step 2: Deploy the Web Service

1. **Create Web Service**
   - Click "New +" and select "Web Service"
   - Connect your Git repository
   - Select the repository containing this code

2. **Configure Build Settings**
   - **Name**: `actingeurope-web`
   - **Environment**: `Node`
   - **Region**: Same as your database
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   Add these environment variables in the Render dashboard:

   ```
   NODE_ENV=production
   DATABASE_URL=your-supabase-pooled-connection-string
   DIRECT_URL=your-supabase-direct-connection-string
   JWT_SECRET=your-generated-secret-key
   NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
   ```

   **Important**: Replace the connection strings with the actual URLs from your Supabase project dashboard.
   
   **Example format**:
   ```
   DATABASE_URL=postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:6543/postgres
   DIRECT_URL=postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:5432/postgres
   ```

## Step 3: Database Setup and Migration

1. **Verify Database Connection**
   - Ensure both DATABASE_URL and DIRECT_URL are correctly set in Render
   - The pooled connection (DATABASE_URL) is used for application queries
   - The direct connection (DIRECT_URL) is used for migrations and schema changes

2. **Run Database Migrations**
   After your web service is deployed, you need to set up the database schema:

   **Option A: Using Render Shell (Recommended)**
   - Go to your web service dashboard
   - Click "Shell" tab
   - Run these commands:
     ```bash
     npm run db:deploy
     npm run db:seed
     ```

   **Option B: Local Setup (Alternative)**
   - Set the DATABASE_URL in your local `.env` file
   - Run locally:
     ```bash
     npm run db:deploy
     npm run db:seed
     ```

## Step 4: Verify Deployment

1. **Check Web Service**
   - Your app should be available at `https://your-app-name.onrender.com`
   - Check the logs for any errors

2. **Test Database Connection**
   - Navigate to `/participants` to see if theatre data loads
   - Navigate to `/program` to see if events load
   - Navigate to `/news` to see if news articles load

## Environment Variables Reference

### Required Variables
- `DATABASE_URL`: Supabase pooled connection string (port 6543)
- `DIRECT_URL`: Supabase direct connection string (port 5432)
- `JWT_SECRET`: Random secret for authentication
- `NEXT_PUBLIC_APP_URL`: Your app's URL on Render
- `NODE_ENV`: Set to "production"

### Optional Variables
- `SMTP_HOST`: SMTP server for emails
- `SMTP_PORT`: SMTP port (usually 587)
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `EMAIL_FROM`: From email address

## Database Schema Overview

The application includes these main data entities with multilingual support and shared admin access:

### Core Tables
- **users**: User accounts and authentication with role-based access control (admin, super_admin)
- **theatres**: Theatre organizations and participants with automatic multilingual creation
- **theatre_images**: Images for theatre profiles
- **theatre_tags**: Tags/categories for theatres
- **venues**: Performance venues and spaces
- **venue_sections**: Seating sections within venues
- **seats**: Individual seats for booking
- **events**: Performances, workshops, and discussions
- **bookings**: User ticket bookings
- **booked_seats**: Seat reservations
- **news_articles**: News and announcements with automatic multilingual creation
- **about_pages**: Dynamic about page content with multi-language support
- **contact_pages**: Dynamic contact page content with multi-language support

### Multilingual Features
- **Translation Groups**: Automatic linking of content across languages (English, Bulgarian, Macedonian, Serbian)
- **Automatic Content Creation**: When creating theatres or news articles, versions are automatically created in all supported languages
- **Language Navigation**: Admin interface provides easy navigation between language versions of grouped content
- **Consistent Multilingual Pattern**: All content types follow the same translation group system

### Shared Admin Access
- **No Content Ownership**: Database schema does not include `created_by` or ownership fields
- **Role-Based Authorization**: Access control based on user roles (admin/super_admin) rather than content ownership
- **Universal Edit Access**: All admin users can edit content created by any other admin
- **Consistent Across Content Types**: Shared access applies to theatres, news, about pages, and contact pages

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify both DATABASE_URL and DIRECT_URL are correct
   - Check Supabase project status in dashboard
   - Ensure connection strings include correct ports (6543 for pooled, 5432 for direct)
   - Verify database password and project reference are correct

2. **Build Failures**
   - Check build logs in Render dashboard
   - Verify all dependencies are in package.json
   - Ensure Node.js version compatibility

3. **Migration Errors**
   - Check if database is empty before running migrations
   - Verify Prisma schema matches your database structure
   - Run `npm run db:generate` if client is outdated

### Useful Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Deploy migrations in production
npm run db:deploy

# Seed database with initial data
npm run db:seed

# Reset database (development only)
npx prisma migrate reset
```

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use strong, unique passwords for database
   - Generate secure random strings for secrets

2. **Database Access**
   - Supabase provides built-in connection pooling
   - Monitor database usage in Supabase dashboard
   - Free tier has usage limits (check Supabase dashboard for current usage)

3. **Application Security**
   - Keep dependencies updated
   - Use HTTPS only (Render provides this automatically)
   - Implement proper input validation

## Monitoring and Maintenance

1. **Logs**: Monitor application logs in Render dashboard
2. **Performance**: Check database performance metrics
3. **Backups**: Render automatically backs up your database
4. **Updates**: Keep dependencies and Render services updated

## Database Management

**Supabase provides comprehensive database management tools:**

### 1. Supabase Dashboard
- Access your database through the Supabase web interface
- Built-in SQL editor for running queries
- Table editor for viewing and editing data
- Real-time monitoring and analytics

### 2. Prisma Studio (Recommended)
```bash
# Run locally to view/edit your database
npx prisma studio
```
- Visual database browser
- Edit data directly through web interface
- Works with your deployed database

### 3. Command Line Tools
```bash
# Connect directly via psql (if installed)
psql "your-supabase-direct-connection-string"

# Or use Prisma CLI for database operations
npx prisma db push    # Push schema changes
npx prisma db seed    # Seed with data
npx prisma migrate    # Run migrations
```

### 4. Application-Level Management
- Use your Next.js admin panel (if implemented)
- Create API endpoints for data management
- Build custom admin interfaces

## Support

If you encounter issues:
1. Check Render documentation: [render.com/docs](https://render.com/docs)
2. Review application logs in Render dashboard
3. Check database connection and status
4. Verify environment variables are set correctly
5. Use Prisma Studio for database inspection

---

**Note**: This setup uses the free tier of both Render and Supabase services. The combination provides:
- **Render**: Free web service hosting with automatic deployments
- **Supabase**: Free PostgreSQL database with 500MB storage, connection pooling, and comprehensive dashboard
- **Benefits**: Better database management tools, built-in connection pooling, and real-time monitoring

For production applications with higher traffic, consider upgrading to paid plans for better performance and reliability.