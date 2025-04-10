import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env.local file.');
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://rygfztbkeokngswshdoe.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2Z6dGJrZW9rbmdzd3NoZG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzg4MzcsImV4cCI6MjA1OTg1NDgzN30.LGyhwHZSCR07d0ktfcfwOurd7sA7IV9pwOzRt-dN_fI'
); 