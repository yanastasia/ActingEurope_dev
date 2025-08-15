# Acting Europe - Theatre Without Borders

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.10.1-green)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)

An international theatre festival platform celebrating cultural exchange and artistic collaboration across Europe. This web application provides a comprehensive solution for managing theatre events, venues, bookings, and user interactions.

## 🎭 Project Overview

Acting Europe is a modern web application designed to connect theatre enthusiasts, artists, and venues across Europe. The platform facilitates the discovery of theatrical performances, workshops, and cultural discussions while providing robust administrative tools for event management.

## ✨ Key Features

### 🎪 Public Features
- **Event Discovery**: Browse performances, workshops, and discussions with detailed information
- **Interactive Venue Maps**: Visual seat selection with accessibility options
- **Multi-language Support**: Internationalization for European audiences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **News & Updates**: Stay informed about festival news and announcements
- **Theatre Profiles**: Detailed information about participating theatres
- **Performance Details**: Comprehensive event information including cast, synopsis, and scheduling

### 🎫 Booking System
- **Seat Selection**: Interactive venue maps with real-time availability
- **Accessibility Support**: Special seating for users with disabilities
- **Booking Management**: Complete booking lifecycle from selection to confirmation
- **PDF Ticket Generation**: Automated ticket generation and email delivery
- **Payment Integration**: Secure booking process with status tracking

### 👤 User Management
- **User Registration & Authentication**: Secure account creation and login
- **Email Verification**: Account verification system
- **Profile Management**: User preferences and notification settings
- **Booking History**: Track past and upcoming bookings

### 🛠️ Administrative Features
- **Event Management**: Create, edit, and manage performances, workshops, and discussions
- **Venue Administration**: Configure venues with multi-section seating layouts
- **User Administration**: Manage user accounts and permissions
- **News Management**: Create and publish news articles with automatic multilingual support
- **Theatre Management**: Comprehensive theatre profiles with automatic translation group creation
- **Analytics Dashboard**: Monitor bookings, events, and user engagement
- **Content Management**: Upload images, manage descriptions, and organize content
- **Dynamic Page Content**: Edit about and contact page content directly from the admin interface
- **File Upload System**: Real file upload functionality for images and documents
- **Database-Connected CMS**: All content is stored in and retrieved from the database
- **Shared Admin Access**: All content created by any admin is accessible and editable by all other admins
- **Multilingual Content Creation**: Automatic creation of content in all supported languages (English, Bulgarian, Macedonian, Serbian)
- **Translation Group Management**: Content is automatically grouped by translation for easy management across languages

### 🏛️ Venue Management
- **Multi-Section Venues**: Support for regular and balcony seating
- **Dynamic Seat Configuration**: Flexible row and seat arrangements
- **Accessibility Features**: Designated accessible seating areas
- **Capacity Management**: Automatic capacity calculations
- **Visual Seat Maps**: Interactive seating charts for users

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 with custom components
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context
- **Theming**: Next Themes with dark/light mode support

### Backend
- **Runtime**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM 6.10.1
- **Authentication**: Custom JWT-based authentication
- **Email Service**: Nodemailer for transactional emails
- **PDF Generation**: PDFKit for ticket generation
- **File Handling**: Next.js built-in file upload

### Development Tools
- **Language**: TypeScript for type safety
- **Database Management**: Prisma for schema management and migrations
- **Code Quality**: ESLint and TypeScript compiler
- **Package Manager**: npm/pnpm support
- **Build System**: Next.js optimized build pipeline

### Deployment & Infrastructure
- **Platform**: Render.com 
- **Database**: Supabase PostgreSQL with connection pooling
- **Environment**: Production-ready with environment variables
- **Monitoring**: Built-in logging and error handling

## 📁 Project Structure

```
ActingEurope_dev/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── events/               # Event management
│   │   ├── venues/               # Venue management
│   │   ├── users/                # User management
│   │   └── news/                 # News management
│   ├── admin/                    # Admin dashboard
│   ├── auth/                     # Authentication pages
│   ├── performances/             # Event detail pages
│   ├── tickets/                  # Booking interface
│   ├── news/                     # News section
│   └── participants/             # Theatre profiles
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components
│   ├── auth/                     # Authentication components
│   └── seat-selection.tsx        # Venue seating component
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Database client
│   ├── auth.ts                   # Authentication utilities
│   ├── language-context.tsx      # Internationalization
│   └── database.ts               # Data models and utilities
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding
├── public/                       # Static assets
└── emails/                       # Email templates
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **PostgreSQL** database (local or remote)
- **Git**

### Installation

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

3. **Environment Setup**
   
   Copy the example environment file and configure your variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   # Database (Supabase)
   DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:6543/postgres"
   DIRECT_URL="postgresql://postgres.xxx:password@aws-0-eu-central-2.pooler.supabase.com:5432/postgres"
   
   # Authentication
   JWT_SECRET="your-jwt-secret-key"
   
   # Email Configuration
   SMTP_HOST="your-smtp-host"
   SMTP_PORT=587
   SMTP_USER="your-email@domain.com"
   SMTP_PASS="your-email-password"
   
   # Application
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

### Database Setup

1. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

2. **Push Schema to Database**
   ```bash
   npm run db:push
   ```

3. **Seed the Database**
   ```bash
   npm run db:seed
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:seed` - Seed database with initial data

## 🚀 Deployment

### Render.com Deployment (Recommended)

1. **Setup Supabase Database**
   - Create a [Supabase](https://supabase.com) account and project
   - Get your database connection strings from Project Settings > Database
   - Note both the pooled connection URL (port 6543) and direct connection URL (port 5432)

2. **Deploy Web Service**
   - Connect your Git repository
   - Configure build settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
   
3. **Environment Variables**
   
   Set the following in Render dashboard:
   ```env
   NODE_ENV=production
   DATABASE_URL=<your-supabase-pooled-connection-url>
   DIRECT_URL=<your-supabase-direct-connection-url>
   JWT_SECRET=<secure-random-string>
   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=587
   SMTP_USER=<your-email>
   SMTP_PASS=<your-password>
   NEXT_PUBLIC_APP_URL=<your-render-app-url>
   ```

4. **Database Migration**
   
   After deployment, run migrations:
   ```bash
   npm run db:deploy
   npm run db:seed
   ```

### Alternative Deployment Options

- **Vercel**: Full Next.js support with edge functions
- **Railway**: Simple deployment with PostgreSQL
- **DigitalOcean App Platform**: Container-based deployment
- **Self-hosted**: Docker containerization available

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **Users**: Authentication and profile management with role-based access control
- **Theatres**: Theatre information and profiles with multilingual support and translation grouping
- **Venues**: Physical locations with seating configurations
- **Events**: Performances, workshops, and discussions
- **Bookings**: Ticket reservations and seat assignments
- **News Articles**: Content management for announcements with automatic multilingual creation
- **About Pages**: Dynamic about page content with multi-language support
- **Contact Pages**: Dynamic contact page content with multi-language support
- **Translation Groups**: Automatic grouping system for multilingual content management

### Key Features:
- **Shared Admin Access**: No content ownership restrictions - all admins can edit any content
- **Automatic Multilingual Creation**: Content is automatically created in all supported languages (English, Bulgarian, Macedonian, Serbian)
- **Translation Group Management**: Related content across languages is grouped for easy management
- **Role-Based Permissions**: Admin and super_admin roles with appropriate access controls

For detailed schema information, see `prisma/schema.prisma`.

## 🌐 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/verify-email` - Email verification

### Event Management
- `GET /api/events` - List all events
- `GET /api/events/[id]` - Get event details
- `POST /api/events` - Create event (admin)
- `PUT /api/events/[id]` - Update event (admin)

### Venue Management
- `GET /api/venues` - List all venues
- `GET /api/venues/[id]` - Get venue details
- `POST /api/venues` - Create venue (admin)
- `PUT /api/venues/[id]` - Update venue (admin)

### User Management
- `GET /api/users` - List users (admin)
- `POST /api/users/create` - Create user (admin)

### Theatre Management
- `GET /api/theatres` - List all theatres with translation grouping
- `GET /api/theatres/[id]` - Get theatre details
- `POST /api/theatres` - Create theatre with automatic multilingual versions (admin)
- `PUT /api/theatres/[id]` - Update theatre (admin)
- `DELETE /api/theatres/[id]` - Delete theatre (admin)

### News Management
- `GET /api/news` - List all news articles with translation grouping
- `GET /api/news/[id]` - Get news article details
- `POST /api/news` - Create news article with automatic multilingual versions (admin)
- `PUT /api/news/[id]` - Update news article (admin)
- `DELETE /api/news/[id]` - Delete news article (admin)

### Content Management
- `GET /api/about` - Get about page content by language
- `POST /api/about` - Create about page content (admin)
- `PUT /api/about` - Update about page content (admin)
- `DELETE /api/about` - Delete about page content (admin)
- `GET /api/contact` - Get contact page content by language
- `POST /api/contact` - Create contact page content (admin)
- `PUT /api/contact` - Update contact page content (admin)
- `POST /api/upload` - Upload files (admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Anastasia Yakimovska** - *Project Lead* - [LinkedIn](https://www.linkedin.com/in/yakiman/)

## 🙏 Acknowledgments

- European Commission for supporting cultural exchange initiatives
- Participating theatres across Europe
- Open source community for the amazing tools and libraries

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs` folder

---

**Acting Europe** - Connecting cultures through the art of theatre 🎭

