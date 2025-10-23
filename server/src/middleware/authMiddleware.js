// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // 1. INTENTAR OBTENER TOKEN DE COOKIE (MÉTODO SEGURO)
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // 2. Si no está en cookie, buscar en header (para herramientas de prueba/compatibilidad)
    if (!token) {
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: "No token proporcionado" });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);
    const user = await UserRepository.getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // ✅ CAMBIO CLAVE: Asignamos un objeto limpio con solo el id y el rol
    req.user = { 
        id: user.id, // Esto garantiza que el Controller solo reciba la propiedad 'id' limpia
        rol: user.rol 
    }; 
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    res.status(403).json({ error: "No autorizado" });
  }
};

export const authRole = (rolesPermitidos) => (req, res, next) => {
  if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
    return res.status(403).json({ error: "No tienes permisos para esta acción" });
  }
  next();
};

// Función para generar access token
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, rol: user.rol }, ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "5m" });
};

// Función para generar refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d" });
};