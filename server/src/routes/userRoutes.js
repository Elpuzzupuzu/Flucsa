import express from 'express';
import { UserController } from '../controllers/userController.js';
import { authMiddleware, authRole } from '../middleware/authMiddleware.js';
import { AuthController } from '../controllers/authController.js';

const router = express.Router();

// Registrar nuevo usuario
router.post('/register', UserController.register);

// Login de usuario
router.post('/login', UserController.login);

// Refresh token
router.post('/refresh-token', AuthController.refreshToken);

// Obtener perfil completo de usuario (wishlist, historial, reseñas)
// ✅ Protegido: solo usuarios autenticados pueden acceder
router.get('/:id', authMiddleware, UserController.getProfile);

// Ejemplo de ruta solo para admin (opcional)
// router.get('/admin-data', authMiddleware, authRole(['admin']), AdminController.getData);

export default router;
