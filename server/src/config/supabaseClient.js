//server/src/config/supabaseConfig.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Debes definir SUPABASE_URL y SUPABASE_KEY en .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
