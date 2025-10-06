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

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // Ajusta según tu frontend
  credentials: true
}));
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
