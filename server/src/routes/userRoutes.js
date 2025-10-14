import express from 'express';
import { UserController } from '../controllers/userController.js';
import { authMiddleware, authRole } from '../middleware/authMiddleware.js';
// import { AuthController } from '../controllers/authController.js'; // (Manteniendo esta importación por si usas refreshToken)

const router = express.Router();

// Registrar nuevo usuario
router.post('/register', UserController.register);

// Login de usuario
router.post('/login', UserController.login);

// 💥 1. NUEVA RUTA: Cerrar Sesión (Limpia las cookies HttpOnly) 💥
// Tu frontend está llamando a POST /users/logout (o /auth/logout, dependiendo de tu prefijo)
router.post('/logout', UserController.logout);

// 💥 2. NUEVA RUTA: Verificar/Re-hidratar Sesión (Necesaria para persistencia) 💥
// El frontend llama a GET /users/profile (o /auth/profile) al cargar la app.
// El authMiddleware valida la cookie, y UserController.getAuthProfile devuelve los datos.
router.get('/profile', authMiddleware, UserController.getAuthProfile);

// Refresh token
// router.post('/refresh-token', AuthController.refreshToken); // Descomentar si usas AuthController

// Obtener perfil completo de usuario por ID
// NOTA: Si usas /profile para re-hidratar, es más seguro que esta ruta use solo el ID del token.
// Si necesitas que la ruta tenga el ID como parámetro, está bien así, pero asegúrate de que el middleware la proteja.
// ✅ Protegido: solo usuarios autenticados pueden acceder
router.get('/:id', authMiddleware, UserController.getProfile); 

// Ejemplo de ruta solo para admin (opcional)
// router.get('/admin-data', authMiddleware, authRole(['admin']), AdminController.getData);

export default router;