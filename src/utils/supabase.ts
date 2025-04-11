import { createClient } from '@supabase/supabase-js';

// Supabase URL and key with fallbacks for production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rygfztbkeokngswshdoe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2Z6dGJrZW9rbmdzd3NoZG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzg4MzcsImV4cCI6MjA1OTg1NDgzN30.LGyhwHZSCR07d0ktfcfwOurd7sA7IV9pwOzRt-dN_fI';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    // Don't store auth session in local storage during SSR
    autoRefreshToken: typeof window !== 'undefined',
  },
}); 