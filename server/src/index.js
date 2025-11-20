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
import contactRoutes from './routes/contactRoutes.js';

// =======================================================
// 🔧 CONFIGURACIÓN INICIAL
// =======================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// -------------------------------------------------------
// 🚨 1. CREACIÓN DEL SERVIDOR HTTP Y SOCKET.IO
// -------------------------------------------------------
const server = http.createServer(app);

const SOCKET_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://flucsa.onrender.com",
  "https://www.flucsa.com.mx",
  "https://flucsa.com.mx",
];

const allowedOrigins = SOCKET_ALLOWED_ORIGINS;

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  //  OPCIONES DE ESTABILIDAD 
  // Aumentado el tiempo que el servidor espera un pong (de 20s a 40s)
  pingTimeout: 40000, 
  // Reducimos el tiempo entre pings (de 25s a 20s) para mantener viva la conexión
  pingInterval: 20000, 
});

// Middleware para adjuntar io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Eventos de Socket.IO
io.on("connection", (socket) => {
  console.log(`✅ Socket conectado: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`❌ Socket desconectado: ${socket.id}`);
  });
});

// =======================================================
// 🌐 CONFIG CORS / COOKIES / EXPRESS
// =======================================================
app.set("trust proxy", 1);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
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
app.use('/api/contact', contactRoutes); // Monta las rutas de contacto
// =======================================================
// 🧱 SERVIR FRONTEND (PRODUCCIÓN O LOCAL TEST DE BUILD)
// =======================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../../client/dist");

// Servir archivos estáticos del frontend
app.use(express.static(clientDistPath));

// Redirigir TODAS las rutas no-API a React (index.html)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

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
server.listen(PORT, () => {
  console.log(`✅ Servidor Express y Socket.IO corriendo en el puerto ${PORT}`);
  console.log("🌐 Orígenes permitidos:", allowedOrigins);
});
