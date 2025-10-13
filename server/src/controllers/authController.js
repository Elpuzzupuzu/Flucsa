// src/controllers/authController.js
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
import { generateAccessToken } from "../middleware/authMiddleware.js";

export const AuthController = {
  refreshToken: async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(401).json({ error: "No se proporcionó token" });

      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await UserRepository.getUserById(decoded.id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ error: "Refresh token inválido o expirado" });
    }
  }
};
