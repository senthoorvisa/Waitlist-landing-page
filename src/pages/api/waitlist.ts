import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

type WaitlistEntry = {
  name: string;
  email: string;
  user_type: string;
  agreed_to_terms: boolean;
  created_at?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, userType, agreedToTerms } = req.body;

    // Log request body for debugging
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    if (!name || !email || !userType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Processing waitlist submission:', { name, email, userType });
    
    // Prepare entry for database
    const entry: WaitlistEntry = {
      name,
      email,
      user_type: userType,
      agreed_to_terms: Boolean(agreedToTerms),
    };
    
    // Log the entry being submitted to Supabase
    console.log('Attempting to insert entry:', JSON.stringify(entry, null, 2));
    
    // First check if email already exists
    const { data: existingUser, error: lookupError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .maybeSingle();
      
    if (lookupError) {
      console.error('Error checking for existing email:', lookupError);
    }
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'This email is already registered on our waitlist',
        errorCode: 'EMAIL_EXISTS'
      });
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([entry]);
    
    if (error) {
      console.error('Error inserting to Supabase:', error);
      console.error('Error code:', error.code);
      console.error('Error details:', error.details);
      
      // Check for specific common errors
      if (error.code === '23505') {  // Unique violation
        return res.status(400).json({
          message: 'This email is already registered on our waitlist',
          errorCode: 'EMAIL_EXISTS'
        });
      }
      
      if (error.message.includes('relation "waitlist" does not exist')) {
        return res.status(500).json({
          message: 'Database table not found. Please create the "waitlist" table.',
          errorCode: 'TABLE_NOT_FOUND',
          errorDetails: error.message,
          sql: `
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
          `
        });
      }
      
      return res.status(500).json({ 
        message: 'Error saving to waitlist',
        errorCode: error.code || 'UNKNOWN_ERROR',
        errorDetails: error.message
      });
    }

    // Log success
    console.log('Successfully added to waitlist:', email);
    
    // Return success
    return res.status(200).json({ 
      message: 'Successfully added to waitlist',
      success: true
    });
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    return res.status(500).json({ 
      message: 'Error submitting to waitlist',
      errorDetails: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 