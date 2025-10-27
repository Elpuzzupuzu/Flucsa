import dotenv from "dotenv";
dotenv.config(); // 🔹 Carga variables de entorno

import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "10m";
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "7d";
const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
const REFRESH_COOKIE_NAME = "auth_refresh";
const isProduction = process.env.NODE_ENV === "production";

// Opciones de cookie
const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
  path: "/",
  maxAge,
});

// Middleware principal
export const authMiddleware = async (req, res, next) => {
  try {
    const { [REFRESH_COOKIE_NAME]: refreshToken } = req.cookies;
    let accessToken = req.headers["authorization"]?.split(" ")[1]; // Esperamos Bearer token

    // 1️⃣ Validamos accessToken si viene en header
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, ACCESS_SECRET);
        const user = await UserRepository.getUserById(decoded.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        req.user = { id: user.id, rol: user.rol };
        return next();
      } catch (err) {
        if (err.name !== "TokenExpiredError") throw err;
        // Si expira, pasamos a refreshToken
      }
    }

    // 2️⃣ Usamos refreshToken en cookie para generar nuevo accessToken
    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await UserRepository.getUserById(decodedRefresh.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Generar nuevo accessToken
        const newAccessToken = jwt.sign(
          { id: user.id, rol: user.rol },
          ACCESS_SECRET,
          { expiresIn: ACCESS_TOKEN_EXPIRATION }
        );

        // Enviar nuevo accessToken en JSON para mobile / web
        res.setHeader("x-access-token", newAccessToken); // opcional, también se puede devolver en JSON

        req.user = { id: user.id, rol: user.rol };
        return next();
      } catch {
        // refreshToken inválido o expirado
        res.clearCookie(COOKIE_NAME, cookieOptions(0));
        res.clearCookie(REFRESH_COOKIE_NAME, cookieOptions(0));
        return res.status(401).json({ error: "Sesión expirada, por favor loguéate de nuevo" });
      }
    }

    return res.status(401).json({ error: "No autorizado" });
  } catch (error) {
    console.error("authMiddleware error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Middleware adicional para roles
export const authRole = (roles = []) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
};