# Deployment Guide for Waitlist Landing Page

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account

## Steps to Deploy

### 1. Clone the Repository
```bash
git clone https://github.com/senthoorvisa/Waitlist-landing-page.git
cd Waitlist-landing-page
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy the project
vercel --prod
```

### 4. Configure Environment Variables
If the deployment fails, make sure to set these environment variables in your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL`: https://rygfztbkeokngswshdoe.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2Z6dGJrZW9rbmdzd3NoZG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzg4MzcsImV4cCI6MjA1OTg1NDgzN30.LGyhwHZSCR07d0ktfcfwOurd7sA7IV9pwOzRt-dN_fI

### 5. Troubleshooting

#### Environment Variables
- Verify that the environment variables have been correctly set in your Vercel project settings.
- The vercel.json file should already contain these variables, but it's a good idea to check.

#### Deployment Errors
- If there are issues with React 19 compatibility, you may need to downgrade to React 18 with:
  ```bash
  npm install react@18.2.0 react-dom@18.2.0
  ```

#### Manual Deployment via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure the necessary environment variables in the Vercel dashboard
4. Deploy your project

### 6. Accessing the Deployed Application
After a successful deployment, Vercel will provide a URL where your application can be accessed. 