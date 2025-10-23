// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Manejo de errores async

import productsRoutes from "./routes/productsRoutes.js"; // Rutas públicas de productos
import adminRouter from "../src/admin/routes/adminRoutes.js"; // Rutas de admin
import imageRoutes from "../src/admin/routes/imageRoutes.js"; // Ruta para subida de imágenes
import userRoutes from "./routes/userRoutes.js"; // Rutas de usuarios
import whishListRoutes from "./routes/wishListRoutes.js"; // Rutas de lista de deseos
import pdfRoutes from "./routes/pdfRoutes.js"; // Rutas para catálogo PDF
import cartRoutes from "./routes/cartRoutes.js"; // 🛒 NUEVO: Rutas del carrito de compras

// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --- 1. Definimos los orígenes permitidos (desarrollo) ---
const allowedOrigins = [
    "http://localhost:5173", // Origen local para desarrollo
];

// --- 2. Procesamos los orígenes de producción ---
const productionOrigins = process.env.FRONTEND_ORIGINS; // ¡Cambiamos el nombre de la variable!

if (productionOrigins) {
    // Dividimos la cadena por comas y eliminamos espacios en blanco
    const prodOriginsArray = productionOrigins.split(',').map(url => url.trim());
    // Agregamos todos los orígenes de producción a la lista permitida
    allowedOrigins.push(...prodOriginsArray);
} else {
    // Si no se define FRONTEND_ORIGINS, mantenemos el subdominio de Render como fallback
    allowedOrigins.push("https://flucsa.onrender.com");
}

// --- Middlewares - CORS ---
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("❌ Origen CORS no permitido:", origin);
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- Ruta raíz de prueba ---
app.get("/", (req, res) => {
    res.send("🚀 Servidor Flucsa corriendo...");
});

// --- Rutas públicas de productos ---
app.use("/api/products", productsRoutes);

// --- Rutas de subida de imágenes ---
app.use("/api/products", imageRoutes); // /upload-image

// --- 🔴 Rutas de Admin ---
app.use("/api/admin", adminRouter); // Todas las rutas admin bajo /api/admin/*

// --- Nuevas rutas: usuarios y lista de deseos ---
app.use("/api/users", userRoutes); // /api/users/*
app.use("/api/wishlist", whishListRoutes); // /api/wishlist/*

// --- 🛒 Nueva ruta: Carrito de Compras ---
app.use("/api/carrito", cartRoutes); // /api/carrito/*

// --- Rutas del catálogo PDF ---
app.use("/api/pdfs", pdfRoutes); // /api/pdfs/:fileName

//-------------------------------------------------------------------//

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
