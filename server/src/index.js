import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors"; // Manejo de errores async
import path from "path";
import { fileURLToPath } from "url";

// Rutas
import productsRoutes from "./routes/productsRoutes.js";
import adminRouter from "../src/admin/routes/adminRoutes.js";
import imageRoutes from "../src/admin/routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import whishListRoutes from "./routes/wishListRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js"; // 
import orderRoutes from "./routes/orderRoutes.js"; // <<< AGREGADO


// =======================================================
// 🔧 CONFIGURACIÓN INICIAL
// =======================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// =======================================================
// 🚨 CONFIGURACIÓN CRÍTICA PARA RENDER / HTTPS / COOKIES
// =======================================================
// Permite que Express confíe en los encabezados "X-Forwarded-*"
// enviados por el proxy de Render. Esto es indispensable para
// que las cookies `secure` funcionen correctamente.
app.set("trust proxy", 1);

// =======================================================
// 🌐 CORS CONFIG
// =======================================================
const allowedOrigins = [
    "http://localhost:5173", // desarrollo local
];

const productionOrigins = process.env.FRONTEND_ORIGINS; // ej: "https://flucsa.onrender.com"

if (productionOrigins) {
    const prodOriginsArray = productionOrigins.split(",").map(url => url.trim());
    allowedOrigins.push(...prodOriginsArray);
} else {
    allowedOrigins.push("https://flucsa.onrender.com");
}

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // permite cookies cross-site
        optionsSuccessStatus: 200, // evita errores en preflight requests
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
app.use("/api/quotations", quotationRoutes); // <<< MONTAJE DE LA RUTA
app.use("/api/orders", orderRoutes); // <<< MONTAJE DE LA RUTA




// =======================================================
// 🧱 SERVIR FRONTEND (PRODUCCIÓN)
// =======================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
    // Servir archivos estáticos de React/Vite
    app.use(express.static(clientDistPath));

    // Redirigir cualquier ruta no-API al index.html (para React Router)
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
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    console.log("🌐 Orígenes permitidos:", allowedOrigins);
});