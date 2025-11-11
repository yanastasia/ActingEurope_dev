# Deployment Checklist — JEThost.bg Start (Node.js)

Use this checklist to deploy the Next.js app on JEThost.bg’s shared hosting (Start plan) via cPanel’s Node.js App module.

## Prerequisites
- Domain and hosting active on JEThost.bg.
- cPanel access with Node.js App feature enabled.
- Database provisioned (e.g., Supabase/Postgres) with `DATABASE_URL` and `DIRECT_URL` ready.
- Email sender configured (Postmark recommended) or SMTP credentials.

## Build & Start
- Startup file: `server.js` (custom Next server).
- Scripts:
  - `npm run build` — runs `prisma generate` and `next build`.
  - `npm run start:server` — starts `server.js`.

## Minimal Environment Variables
Set these in cPanel → Software → Setup Node.js App → Application Environment:

- `NODE_ENV=production`
- `PORT=3000` (or your assigned port; cPanel will proxy to it)
- `NEXT_PUBLIC_APP_URL=https://your-domain.tld`
- `NEXT_PUBLIC_SUPABASE_URL=<your supabase url>`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>`
- `DATABASE_URL=<postgres connection string>`
- `DIRECT_URL=<postgres direct connection string>`

## Optional/Feature Environment Variables
- Authentication/redirects:
  - `NEXTAUTH_URL=https://your-domain.tld`
- Email (Postmark or SMTP):
  - `SEND_EMAILS=true` (enable real sending in production)
  - `EMAIL_FROM=info@your-domain.tld`
  - `POSTMARK_SERVER_TOKEN=<server token>`
  - `POSTMARK_API_KEY=<api key>` (if used)
  - `POSTMARK_VERIFICATION_TEMPLATE_ALIAS=<template alias>`
  - `POSTMARK_VERIFICATION_TEMPLATE_ID=<template id>` (if used)
  - `POSTMARK_TICKET_TEMPLATE_ALIAS=<ticket template alias>`
  - `POSTMARK_TICKET_FROM_EMAIL=tickets@your-domain.tld` (if used)
  - `EMAIL_SERVER_USER=<smtp user>`
  - `EMAIL_SERVER_PASSWORD=<smtp password>`
- Supabase admin operations:
  - `SUPABASE_SERVICE_ROLE_KEY=<service role key>`

## cPanel Setup Steps
1. Upload project to your hosting home directory (e.g., `~/apps/acting-europe-web`).
2. Open cPanel → Setup Node.js App → Create Application:
   - Application root: `/home/<user>/apps/acting-europe-web`
   - Application startup file: `server.js`
   - Node.js version: latest available (matches Next 15 compatibility).
3. Click “Create”.
4. In the app view, set Environment Variables (see above).
5. Open Terminal in cPanel (or use SSH) and run:
   - `npm ci` (or `npm install` if `ci` not available)
   - `npm run build`
6. Back in cPanel Node App, set Startup Command to: `npm run start:server` (or leave startup file as `server.js` if cPanel runs it directly).
7. Restart the app in cPanel.

## Prisma & Database Notes
- No migrations run automatically on shared hosting. If needed, run `npm run db:migrate` from a dev machine or via SSH against your remote database.
- Ensure `DATABASE_URL` and `DIRECT_URL` are reachable from JEThost network.

## Verification
- Visit `https://your-domain.tld/about` and key pages.
- Check cPanel app logs for errors.
- Test email flows if `SEND_EMAILS=true`.

## Troubleshooting
- “ChunkLoadError” or stale assets: restart the Node app; clear browser cache.
- “Invalid or unexpected token”: ensure only one app instance is running and that the app URL matches `NEXT_PUBLIC_APP_URL`.
- Build failures: confirm Node version and that `npm ci` completed without errors.