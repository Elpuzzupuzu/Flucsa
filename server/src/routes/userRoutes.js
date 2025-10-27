import express from 'express';
import jwt from 'jsonwebtoken';
import { UserController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { UserService } from '../services/userService.js';

const router = express.Router();
const COOKIE_NAME = 'auth_refresh'; // Siempre usamos auth_refresh
const ACCESS_TOKEN_MAX_AGE = 5 * 60 * 1000; // 5 minutos
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días
const isProduction = process.env.NODE_ENV === 'production';

// Configuración dinámica de cookies
const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,               // ⚡ Solo HTTPS en producción
  sameSite: isProduction ? 'None' : 'Lax', // Cross-origin seguro en prod
  path: '/',
  maxAge,
});

// ===============================
// Rutas de Autenticación y Registro
// ===============================
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// ===============================
// Rehidratación de sesión (perfil ligero)
// ===============================
router.get('/auth', authMiddleware, UserController.getAuthProfile);

// ===============================
// Rutas de Perfil
// ===============================
router.put('/profile', authMiddleware, UserController.updateProfile);
router.put('/password', authMiddleware, UserController.updatePassword);
router.get('/full-profile', authMiddleware, UserController.getProfile);

// ===============================
// Refresh token
// ===============================
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies[COOKIE_NAME];
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserService.getUserProfile(decoded.id);

    // Generar nuevo access token
    const accessToken = UserService.generateAccessToken({ id: decoded.id, rol: user.rol });

    res.status(200).json({ accessToken, user });
  } catch (err) {
    console.error('Error en refresh token:', err);
    res.clearCookie(COOKIE_NAME, cookieOptions(0));
    return res.status(403).json({ error: "Refresh token inválido o expirado" });
  }
});

export default router;
