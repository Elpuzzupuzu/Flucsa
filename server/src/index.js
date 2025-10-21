import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Manejo de errores async

import productsRoutes from "./routes/productsRoutes.js"; // Rutas públicas de productos
import adminRouter from "../src/admin/routes/adminRoutes.js"; // Rutas de admin
import imageRoutes from "../src/admin/routes/imageRoutes.js"; // Ruta para subida de imágenes
import userRoutes from "./routes/userRoutes.js"; // NUEVO: Rutas de usuarios
import whishListRoutes from "./routes/wishListRoutes.js"; // NUEVO: Rutas de lista de deseos
import pdfRoutes from "./routes/pdfRoutes.js"; // Rutas para catálogo PDF


// Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// // 1. Definimos los orígenes permitidos
// const allowedOrigins = [
//   "http://localhost:5173", // Origen local para desarrollo
// ];

// // 2. Agregamos el origen de producción si está definido en las variables de entorno (Render)
// const productionOrigin = process.env.FRONTEND_ORIGIN || "https://flucsa.onrender.com";
// if (productionOrigin) {
//     allowedOrigins.push(productionOrigin); 
// }



// ...
// 1. Definimos los orígenes permitidos (desarrollo)
const allowedOrigins = [
  "http://localhost:5173", // Origen local para desarrollo
];

// 2. Procesamos los orígenes de producción, soportando múltiples URLs
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
// ...

// Middlewares - CORS
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

// NUEVAS RUTAS: usuarios y lista de deseos
app.use("/api/users", userRoutes); // /api/users/*
app.use("/api/wishlist", whishListRoutes); // /api/wishlist/*

//rutas para los pdfs
// Rutas del catálogo PDF
app.use("/api/pdfs", pdfRoutes); // /api/pdfs/:fileName







//-------------------------------------------------------------------////

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
