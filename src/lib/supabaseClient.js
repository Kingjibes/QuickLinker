import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uqsxwlqzhfrlmnzcursx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxc3h3bHF6aGZybG1uemN1cnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MjAxMjcsImV4cCI6MjA2MzI5NjEyN30.YgIcWfiJT1qQfK11WqLwxlpKX1gSFSPkyQh9ZfpyTLM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);