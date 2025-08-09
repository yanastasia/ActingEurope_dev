# Render Database Deployment Guide

This guide will help you deploy the ActingEurope application with a MySQL database on Render.

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Create a PostgreSQL Database on Render

1. **Log in to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" and select "PostgreSQL"

2. **Configure Database Settings**
   - **Name**: `actingeurope-db`
   - **Database Name**: `actingeurope`
   - **User**: `actingeurope_user`
   - **Region**: Choose closest to your users
   - **Plan**: Start with Free tier

3. **Create the Database**
   - Click "Create Database"
   - Wait for the database to be provisioned (usually 2-3 minutes)
   - Note down the connection details from the database dashboard

**Note**: You don't need pgAdmin for this deployment. Render provides a web-based database dashboard, and you can manage your database through Prisma commands and the Render dashboard.

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
   DATABASE_URL=postgresql://actingeurope_user:p1EOPq8RfGjCEN7MqPcKehFVOucDRrTn@dpg-d2a8sfer433s73a7rm0g-a/actingeurope
   NEXTAUTH_SECRET=your-generated-secret-key
   NEXTAUTH_URL=https://your-app-name.onrender.com
   ```

   **Important**: Replace the DATABASE_URL with the actual connection string from your database dashboard.
   
   **For your specific database, use**:
   ```
   DATABASE_URL=postgresql://actingeurope_user:p1EOPq8RfGjCEN7MqPcKehFVOucDRrTn@dpg-d2a8sfer433s73a7rm0g-a.oregon-postgres.render.com:5432/actingeurope
   ```

## Step 3: Database Setup and Migration

1. **Get Database Connection String**
   - Go to your database dashboard on Render
   - Copy the "External Connection String"
   - It should look like: `postgresql://actingeurope_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/actingeurope`
   - Your specific connection string is: `postgresql://actingeurope_user:p1EOPq8RfGjCEN7MqPcKehFVOucDRrTn@dpg-d2a8sfer433s73a7rm0g-a.oregon-postgres.render.com:5432/actingeurope`

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
- `DATABASE_URL`: MySQL connection string from Render
- `NEXTAUTH_SECRET`: Random secret for NextAuth.js
- `NEXTAUTH_URL`: Your app's URL on Render
- `NODE_ENV`: Set to "production"

### Optional Variables
- `EMAIL_SERVER_HOST`: SMTP server for emails
- `EMAIL_SERVER_PORT`: SMTP port (usually 587)
- `EMAIL_SERVER_USER`: SMTP username
- `EMAIL_SERVER_PASSWORD`: SMTP password
- `EMAIL_FROM`: From email address

## Database Schema Overview

The application includes these main data entities:

### Core Tables
- **users**: User accounts and authentication
- **theatres**: Theatre organizations and participants
- **theatre_images**: Images for theatre profiles
- **theatre_tags**: Tags/categories for theatres
- **venues**: Performance venues and spaces
- **venue_sections**: Seating sections within venues
- **seats**: Individual seats for booking
- **events**: Performances, workshops, and discussions
- **bookings**: User ticket bookings
- **booked_seats**: Seat reservations
- **news_articles**: News and announcements

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check if database is running in Render dashboard
   - Ensure database and web service are in the same region

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
   - Database is only accessible from your Render services
   - Use connection pooling for better performance
   - Monitor database usage and performance

3. **Application Security**
   - Keep dependencies updated
   - Use HTTPS only (Render provides this automatically)
   - Implement proper input validation

## Monitoring and Maintenance

1. **Logs**: Monitor application logs in Render dashboard
2. **Performance**: Check database performance metrics
3. **Backups**: Render automatically backs up your database
4. **Updates**: Keep dependencies and Render services updated

## Database Management Without pgAdmin

**You don't need pgAdmin for this deployment.** Here are the alternatives:

### 1. Render Dashboard
- Access your database through the Render web interface
- View connection details, metrics, and logs
- Monitor database performance and usage

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
psql postgresql://actingeurope_user:p1EOPq8RfGjCEN7MqPcKehFVOucDRrTn@dpg-d2a8sfer433s73a7rm0g-a.oregon-postgres.render.com:5432/actingeurope

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

**Note**: This setup uses the free tier of Render services. For production applications with higher traffic, consider upgrading to paid plans for better performance and reliability.