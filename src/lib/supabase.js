import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfixeszjwwhyhyfjnzsb.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmaXhlc3pqd3doeWh5ZmpuenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NTE2MjQsImV4cCI6MjEwMjAyNzYyNH0.EQ-azFImwxXkY-VpxqCcPpRz1LuTkz4yb_CJ-AlxzEA';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);