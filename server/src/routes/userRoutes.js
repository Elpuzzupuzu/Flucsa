// src/routes/userRoutes.js
import express from 'express';
import { UserController } from '../controllers/userController.js';
import { authMiddleware, authRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas de Autenticación y Registro (Sin Middleware)
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// Rutas de Perfil (Requieren authMiddleware)
// 2. NUEVA RUTA: Verificar/Re-hidratar Sesión
router.get('/profile', authMiddleware, UserController.getAuthProfile);

// 🚀 NUEVA RUTA: Actualizar información de perfil
router.put('/profile', authMiddleware, UserController.updateProfile);

// 🚀 NUEVA RUTA: Actualizar contraseña
router.put('/password', authMiddleware, UserController.updatePassword);

// Obtener perfil completo de usuario
// NOTA: Cambié el uso del ID de req.params a req.user.id en el controller para más seguridad.
router.get('/:id', authMiddleware, UserController.getProfile); 

// Ejemplo de ruta solo para admin (opcional)
// router.get('/admin-data', authMiddleware, authRole(['admin']), AdminController.getData);

export default router;