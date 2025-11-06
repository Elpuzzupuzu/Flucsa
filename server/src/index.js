import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Manejo de errores async
import path from "path";
import { fileURLToPath } from "url";
import http from "http"; // Módulo HTTP nativo
import { Server } from "socket.io"; // Socket.IO Server

// Rutas
import productsRoutes from "./routes/productsRoutes.js";
import adminRouter from "../src/admin/routes/adminRoutes.js";
import imageRoutes from "../src/admin/routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import whishListRoutes from "./routes/wishListRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js"; 
import orderRoutes from "./routes/orderRoutes.js"; 


// =======================================================
// 🔧 CONFIGURACIÓN INICIAL
// =======================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// -------------------------------------------------------
// 🚨 1. CREACIÓN DEL SERVIDOR HTTP Y SOCKET.IO
// -------------------------------------------------------
// El servidor HTTP debe envolver la aplicación Express
const server = http.createServer(app); 

// 🚨 CAMBIO CRÍTICO DE CORS: Array fijo y explícito de orígenes permitidos
const SOCKET_ALLOWED_ORIGINS = [
    "http://localhost:5173",        // Desarrollo local
    "https://flucsa.onrender.com",  // Dominio de Render (si lo usas como frontend)
    "https://www.flucsa.com.mx",    // Dominio con www
    "https://flucsa.com.mx",        // Dominio sin www
];

// Usamos esta lista para Express y Socket.IO
const allowedOrigins = SOCKET_ALLOWED_ORIGINS; 

const io = new Server(server, {
    cors: {
        origin: allowedOrigins, // Usa el array fijo
        methods: ["GET", "POST"],
        credentials: true // Necesario porque el cliente usa withCredentials: true
    }
});

// -------------------------------------------------------
// 🚨 2. INTEGRACIÓN: Hacer 'io' accesible en las rutas
// -------------------------------------------------------
// Creamos un middleware para adjuntar la instancia io al objeto req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// -------------------------------------------------------
//  3. MANEJO DE CONEXIONES SOCKET.IO (Lógica de Debug)
// -------------------------------------------------------
io.on('connection', (socket) => {
    console.log(`✅ Socket conectado: ${socket.id}`);

    // Opcional: Escuchar un evento de desconexión
    socket.on('disconnect', () => {
        console.log(`❌ Socket desconectado: ${socket.id}`);
    });
});


// =======================================================
//  CONFIGURACIÓN CRÍTICA PARA RENDER / HTTPS / COOKIES
// =======================================================
app.set("trust proxy", 1); // Indispensable para cookies `secure`

// =======================================================
// 🌐 CORS CONFIG (Express)
// =======================================================
app.use(
    cors({
        origin: allowedOrigins, // Usa el mismo array para Express
        credentials: true, 
        optionsSuccessStatus: 200,
    })
);

// =======================================================
// 🧩 MIDDLEWARES GLOBALES
// =======================================================
app.use(express.json());
app.use(cookieParser());

// =======================================================
// 🚀 RUTA DE PRUEBA RAÍZ
// =======================================================
app.get("/", (req, res) => {
    res.send("🚀 Servidor Flucsa corriendo correctamente...");
});

// =======================================================
// 📦 RUTAS DE LA API
// =======================================================
app.use("/api/products", productsRoutes);
app.use("/api/products", imageRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", whishListRoutes);
app.use("/api/carrito", cartRoutes);
app.use("/api/pdfs", pdfRoutes);
app.use("/api/quotations", quotationRoutes); 
app.use("/api/orders", orderRoutes); 


// =======================================================
// 🧱 SERVIR FRONTEND (PRODUCCIÓN)
// =======================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
    app.use(express.static(clientDistPath));

    app.get("*", (req, res) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(clientDistPath, "index.html"));
        }
    });
}

// =======================================================
// ⚠️ MANEJO CENTRALIZADO DE ERRORES
// =======================================================
app.use((err, req, res, next) => {
    console.error("❌ Error interno:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

// =======================================================
// 🚀 LEVANTAR SERVIDOR
// =======================================================
// Usamos 'server.listen' para que Socket.IO funcione
server.listen(PORT, () => {
    console.log(`✅ Servidor Express y Socket.IO corriendo en el puerto ${PORT}`);
    console.log("🌐 Orígenes permitidos:", allowedOrigins);
});