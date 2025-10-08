import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Manejo de errores async

import { supabase } from "./config/supabaseClient.js";
import productsRoutes from "./routes/productsRoutes.js"; // Rutas públicas de productos
import adminRouter from "../src/admin/routes/adminRoutes.js"; // Rutas de admin
import imageRoutes from "../src/admin/routes/imageRoutes.js"; // Nueva ruta para subida de imágenes

// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --- INICIO: CAMBIOS EN LA LÓGICA DE CORS ---

// 1. Definimos los orígenes permitidos
const allowedOrigins = [
  "http://localhost:5173", // Origen local para desarrollo
];

// 2. Agregamos el origen de producción si está definido en las variables de entorno (Render)
const productionOrigin = process.env.FRONTEND_ORIGIN;
if (productionOrigin) {
    // Esto agrega 'https://flucsa.onrender.com' a la lista
    allowedOrigins.push(productionOrigin); 
}

// Middlewares - CORS
app.use(cors({
  origin: function(origin, callback) {
    // Permite solicitudes sin origin (por ejemplo, Postman o curl)
    if (!origin) return callback(null, true);
    
    // Verifica si el origin está en la lista de permitidos
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Origen CORS no permitido:", origin);
      callback(new Error("Origen no permitido por CORS"));
    }
  },
  credentials: true // ¡IMPORTANTE! Necesario para el manejo de cookies/tokens de autenticación
}));

// --- FIN: CAMBIOS EN LA LÓGICA DE CORS ---

app.use(express.json());
app.use(cookieParser());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor Flucsa corriendo...");
});

// Rutas públicas de productos
app.use("/api/products", productsRoutes);

// Rutas de subida de imágenes
app.use("/api/products", imageRoutes); // /upload-image

// Rutas de admin
app.use("/api", adminRouter); // Todas las rutas admin bajo /api/admin/*

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});