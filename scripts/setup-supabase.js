/**
 * This script demonstrates the SQL commands you need to run in Supabase SQL Editor
 * to create the necessary table structure for the waitlist application.
 * 
 * How to use:
 * 1. Go to your Supabase project dashboard
 * 2. Navigate to SQL Editor
 * 3. Create a new query
 * 4. Copy and paste the SQL commands below
 * 5. Run the query
 */

const waitlistTableSQL = `
-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  user_type TEXT NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
CREATE INDEX IF NOT EXISTS waitlist_user_type_idx ON waitlist (user_type);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at);

-- Add email uniqueness constraint to prevent duplicates
ALTER TABLE waitlist ADD CONSTRAINT waitlist_email_unique UNIQUE (email);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the waitlist form)
CREATE POLICY insert_policy ON waitlist FOR INSERT TO anon WITH CHECK (true);

-- Create policy to allow the authenticated users to view the data
CREATE POLICY select_policy ON waitlist FOR SELECT TO authenticated USING (true);
`;

console.log("=== SQL to create waitlist table in Supabase ===");
console.log(waitlistTableSQL);
console.log("\nRun this SQL in the Supabase SQL Editor to create the necessary table structure."); 