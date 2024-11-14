import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kdszgooutjwoddbpezjs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc3pnb291dGp3b2RkYnBlempzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MTMzMzksImV4cCI6MjA0NzA4OTMzOX0.qR35K1YXOOKXwAmpEcAHsOOkN6ph5SgqZQEOJC-_ONw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;