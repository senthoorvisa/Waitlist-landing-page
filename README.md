# Dimension 12 Waitlist Landing Page

A modern, responsive landing page for Dimension 12 AI incubation and deployment platform with waitlist functionality.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Animated UI components with Framer Motion
- Mobile-optimized header with smooth transitions
- Waitlist form with validation and database integration
- Supabase backend for storing waitlist entries

## Technology Stack

- Next.js 15.3
- React 19.1
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Supabase for backend data storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/senthoorvisa/Waitlist-landing-page.git
cd Waitlist-landing-page
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

The site will be available at http://localhost:3000

## Database Setup

Create a `waitlist` table in your Supabase project with the following SQL:

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Production Build

```bash
npm run build
npm start
```

## License

ISC 