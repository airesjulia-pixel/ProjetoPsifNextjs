import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("URL SUPABASE:", supabaseUrl);
console.log(
  "CHAVE SUPABASE:",
  supabasePublishableKey ? "ENCONTRADA" : "NÃO ENCONTRADA"
);

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
