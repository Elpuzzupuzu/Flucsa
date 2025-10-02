import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Para manejar errores async sin try/catch en cada ruta

import { supabase } from "./config/supabaseClient.js";
import productsRoutes from "./routes/productsRoutes.js"; // Importamos rutas de productos

// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares básicos
app.use(cors({
  origin: "http://localhost:5173", // Ajusta según tu client (React)
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor Flucsa corriendo...");
});

// Rutas de productos
app.use("/api/products", productsRoutes);

// Middleware de manejo de errores (centralizado)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// Test de conexión a DB (opcional, se puede quitar luego)
async function testDB() {
  const { data, error } = await supabase.from("productos").select("*").limit(1);
  if (error) console.error("❌ Error DB:", error);
  else console.log("✅ DB conectada, ejemplo de producto:", data);
}

testDB();
