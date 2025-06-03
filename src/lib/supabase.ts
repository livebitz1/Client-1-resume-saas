
import { createClient } from '@supabase/supabase-js';

// Hard-coded values as fallback for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qnodnumbbumgbatolsrg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFub2RudW1iYnVtZ2JhdG9sc3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODIzMDMsImV4cCI6MjA2MjU1ODMwM30.lYofd1dNNTQFJZlMs7-eW0ptY-dtf3KUL_gykSMVMJo';

// Log to help with debugging
console.log('Initializing Supabase client with:', { 
  supabaseUrl, 
  keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0 
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
