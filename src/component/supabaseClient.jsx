import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gysmarzcqizoogsgylty.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5c21hcnpjcWl6b29nc2d5bHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNTc5MDYsImV4cCI6MjA0NjczMzkwNn0.YiIHCOaSNOofL6bkGZkUQB9klWwe-NrT7UPNHdEXRGo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
