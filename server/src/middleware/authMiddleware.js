import dotenv from "dotenv";
dotenv.config(); // 🔹 Carga variables de entorno

import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "10m";
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "7d";
const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
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
    const { [COOKIE_NAME]: accessToken, auth_refresh: refreshToken } = req.cookies;

    // 1️⃣ Intentamos validar accessToken
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

    // 2️⃣ Intentamos usar refreshToken para generar nuevo accessToken
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

        // Setear cookie nueva
        res.cookie(COOKIE_NAME, newAccessToken, cookieOptions(msFromJWT(ACCESS_TOKEN_EXPIRATION)));

        req.user = { id: user.id, rol: user.rol };
        return next();
      } catch {
        // refreshToken inválido o expirado
        res.clearCookie(COOKIE_NAME, cookieOptions(0));
        res.clearCookie("auth_refresh", cookieOptions(0));
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

// 🔹 Helper para convertir '10m', '7d' a milisegundos
function msFromJWT(jwtTime) {
  const num = parseInt(jwtTime);
  if (jwtTime.endsWith("s")) return num * 1000;
  if (jwtTime.endsWith("m")) return num * 60 * 1000;
  if (jwtTime.endsWith("h")) return num * 60 * 60 * 1000;
  if (jwtTime.endsWith("d")) return num * 24 * 60 * 60 * 1000;
  return num; // fallback en ms
}
