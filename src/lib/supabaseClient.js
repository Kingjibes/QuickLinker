import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yomtjzdejdiplgpkymqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbXRqemRlamRpcGxncGt5bXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjUzMzUsImV4cCI6MjA2MzQ0MTMzNX0.eM7LnNKbVVuVGyKJWsoPFj4a9vJ8QD6YAY8TpGU4syI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
