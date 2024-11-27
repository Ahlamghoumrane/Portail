import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cexlfrmvultokpjomvvg.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNleGxmcm12dWx0b2twam9tdnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjQ4MTAsImV4cCI6MjA0ODIwMDgxMH0.S9E3ruUcUsCmDPJUunpfnike7M7Mg0JPqo9XWcUyKtw"; 

export const supabase = createClient(supabaseUrl, supabaseKey);
