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
// 1. Verificar/Re-hidratar Sesión (devuelve datos básicos)
router.get('/profile', authMiddleware, UserController.getAuthProfile);

// 2. 🚀 Actualizar información de perfil
router.put('/profile', authMiddleware, UserController.updateProfile);

// 3. 🚀 Actualizar contraseña
router.put('/password', authMiddleware, UserController.updatePassword);

// 4. Obtener perfil completo de usuario (detalles, historial, etc.)
// ❌ ¡ERROR CORREGIDO AQUÍ!
// Antes: router.get('/:id', authMiddleware, UserController.getProfile); 
// La ruta /:id causaba el conflicto al interpretar 'carrito' como un ID.
// SOLUCIÓN: Usamos una ruta estática para obtener el perfil del usuario AUTENTICADO.

router.get('/full-profile', authMiddleware, UserController.getProfile); 

// Puedes considerar eliminar la línea anterior y usar /profile si getAuthProfile y getProfile 
// se fusionan o tienen el mismo objetivo. Pero la clave es eliminar el /:id.

// Ejemplo de ruta solo para admin (opcional)
// router.get('/admin-data', authMiddleware, authRole(['admin']), AdminController.getData);

export default router;