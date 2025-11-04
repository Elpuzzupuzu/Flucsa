// frontend/src/api/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Asegúrate de que estas variables de entorno estén disponibles en el proceso de construcción de React
// Generalmente, comienzan con REACT_APP_...
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; 
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_ANON_KEY; 

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Faltan variables de entorno de Supabase en el frontend (REACT_APP_...)");
}

// 🚨 Usamos la clave pública (Anon Key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);