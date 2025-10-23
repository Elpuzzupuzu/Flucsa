// src/routes/userRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserController } from '../controllers/userController.js';
import { authMiddleware, authRole } from '../middleware/authMiddleware.js';
import { UserService } from '../services/userService.js';

const router = express.Router();

// ===============================
// Rutas de Autenticación y Registro (Sin Middleware)
// ===============================
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// ===============================
// Rehidratación de sesión
// Endpoint ligero que devuelve datos básicos del usuario autenticado
// ===============================
router.get('/auth', authMiddleware, UserController.getAuthProfile);

// ===============================
// Rutas de Perfil (Requieren authMiddleware)
// ===============================

// Actualizar información de perfil
router.put('/profile', authMiddleware, UserController.updateProfile);

// Actualizar contraseña
router.put('/password', authMiddleware, UserController.updatePassword);

// Obtener perfil completo de usuario (detalles, historial, etc.)
router.get('/full-profile', authMiddleware, UserController.getProfile);

// ===============================
// Refresh token (opcional)
// ===============================
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generar un nuevo access token
    const accessToken = UserService.generateAccessToken({
      id: decoded.id,
      rol: decoded.rol
    });

    // Configurar cookie de accessToken
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieConfig = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax',
      path: '/',
    };

    res.cookie('accessToken', accessToken, {
      ...cookieConfig,
      maxAge: 5 * 60 * 1000, // 5 minutos
    });

    res.status(200).json({ message: "Access token renovado" });
  } catch (err) {
    return res.status(403).json({ error: "Refresh token inválido o expirado" });
  }
});


export default router;
