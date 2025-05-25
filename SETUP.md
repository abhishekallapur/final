# Project Setup Guide

## Quick Start

1. Download or clone this repository
2. Open terminal in the project folder
3. Run `npm install`
4. Create a new file named `.env` in the root directory
5. Copy the environment variables below into your `.env` file
6. Run `npm run dev`

## Environment Variables Setup

Create a new file named `.env` in the root directory and add these variables:

```env
# Contact Information (Replace with your details)
VITE_CONTACT_EMAIL=your_contact_email@example.com
VITE_CONTACT_PHONE=your_contact_phone
VITE_CONTACT_BUSINESS_HOURS="9:00 AM - 6:00 PM"

# Social Media Links (Replace with your profile URLs)
VITE_INSTAGRAM_LINK=https://instagram.com/your_username
VITE_LINKEDIN_LINK=https://linkedin.com/in/your_username
VITE_FACEBOOK_LINK=https://facebook.com/your_username
VITE_TWITTER_LINK=https://twitter.com/your_username

# Supabase Configuration (Required for form submission)
# Get these from your Supabase project settings
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_STORAGE_URL=your_supabase_storage_url

# Email Configuration (Required for contact form)
# Get these from your email service provider (e.g., Gmail, SendGrid, etc.)
SMTP_HOSTNAME=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM_EMAIL=your_email@gmail.com
```

## How to get Supabase credentials:

1. Go to [Supabase](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Project Settings > API
5. Copy the following values:
   - Project URL (for VITE_SUPABASE_URL)
   - anon/public key (for VITE_SUPABASE_ANON_KEY)
   - Storage URL (for VITE_SUPABASE_STORAGE_URL)

## How to set up email sending:

1. Choose an email service provider (e.g., Gmail, SendGrid, etc.)
2. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password (Google Account > Security > App Passwords)
   - Use your Gmail address as SMTP_USERNAME and SMTP_FROM_EMAIL
   - Use the generated App Password as SMTP_PASSWORD
3. For SendGrid:
   - Create an account
   - Create an API key
   - Use their SMTP settings and API key

## Common Issues and Solutions

1. **Project won't start**
   - Make sure you have Node.js installed (v16 or higher)
   - Run `npm install` again
   - Check if `.env` file exists in the root directory

2. **Form submission not working**
   - Verify Supabase credentials in `.env` file
   - Check if Supabase project is active
   - Ensure all required environment variables are set

3. **Contact links not working**
   - Check if email and phone variables are set correctly
   - Verify social media links are valid URLs

4. **Email notifications not working**
   - Verify SMTP credentials in `.env` file
   - Check if your email service provider allows SMTP access
   - Make sure the Supabase Edge Function is deployed
   - Check Supabase logs for any email sending errors

5. **Build errors**
   - Delete `node_modules` folder
   - Delete `package-lock.json`
   - Run `npm install` again
   - Run `npm run dev`

## Development Commands

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Required Software

- Node.js (v16 or higher)
- npm (comes with Node.js)
- Git (for cloning the repository)

## Support

If you encounter any issues:
1. Check the troubleshooting guide above
2. Verify all environment variables are set correctly
3. Make sure you're using the correct Node.js version
4. Check the console for error messages 