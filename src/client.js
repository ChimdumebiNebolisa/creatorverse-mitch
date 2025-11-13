import { createClient } from '@supabase/supabase-js';

const URL = 'https://yvmcpmjvgeqthwfwobmx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bWNwbWp2Z2VxdGh3ZndvYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Nzc5NjAsImV4cCI6MjA3ODU1Mzk2MH0.DbcP7DoNWo4zcHNPJ_iKEko-GGwqmfUH-aEpYCxWE3k';

export const supabase = createClient(URL, API_KEY);

