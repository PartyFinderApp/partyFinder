import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
// connect to my supabase 
const supabaseUrl = 'https://gkwknbvvkllntjwqmydq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrd2tuYnZ2a2xsbnRqd3FteWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2OTY0MDAsImV4cCI6MjAxNTI3MjQwMH0.CJEj4s__IWDwCSVNd02YZeHRbQjZg35QFremj2xXfV8';
//export so i can use supabase 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


