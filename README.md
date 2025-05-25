# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/31cad750-475b-4e5c-9082-3cc427a6875d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/31cad750-475b-4e5c-9082-3cc427a6875d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Create a .env file (see Environment Variables Setup below)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/31cad750-475b-4e5c-9082-3cc427a6875d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Environment Variables Setup

This project requires environment variables to run properly. Follow these steps:

1. Create a new file named `.env` in the root directory of the project
2. Copy and paste the following template into the `.env` file:

```env
# Contact Information
VITE_CONTACT_EMAIL=your_contact_email@example.com
VITE_CONTACT_PHONE=your_contact_phone
VITE_CONTACT_BUSINESS_HOURS="your_business_hours"

# Social Media Links
VITE_INSTAGRAM_LINK=https://instagram.com/your_username
VITE_LINKEDIN_LINK=https://linkedin.com/in/your_username
VITE_FACEBOOK_LINK=https://facebook.com/your_username
VITE_TWITTER_LINK=https://twitter.com/your_username

# Supabase Configuration (Required for form submission)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_STORAGE_URL=your_supabase_storage_url
```

3. Replace the placeholder values with your actual configuration:
   - For contact information: Use your actual email and phone number
   - For social media: Use your actual social media profile URLs
   - For Supabase: Create a free account at [Supabase](https://supabase.com) and get your project credentials

4. Save the `.env` file

Note: The `.env` file is listed in `.gitignore` and should never be committed to the repository. This is for security reasons.

## Security Notes

1. The `.env` file is listed in `.gitignore` and should never be committed to the repository
2. Keep your environment variables secure and don't share them publicly
3. Use different environment variables for development and production environments
4. Regularly rotate sensitive keys and credentials

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are properly set in the `.env` file
2. Verify that Node.js and npm are installed correctly
3. Try deleting the `node_modules` folder and running `npm install` again
4. Check the console for any error messages
5. Make sure you're using the correct version of Node.js (recommended: v16 or higher)
