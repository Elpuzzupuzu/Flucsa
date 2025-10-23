import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Middleware que verifica el accessToken
export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken || null;

    if (!token) {
      return res.status(401).json({ error: "No token proporcionado" });
    }

    const decoded = jwt.verify(token, ACCESS_SECRET);
    const user = await UserRepository.getUserById(decoded.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    req.user = { id: user.id, rol: user.rol };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    res.status(403).json({ error: "No autorizado" });
  }
};

// Middleware para validar roles específicos
export const authRole = (roles = []) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
};

// Generar tokens
export const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, rol: user.rol }, ACCESS_SECRET, { expiresIn: "5m" });

export const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
