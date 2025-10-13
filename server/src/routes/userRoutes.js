import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router();

// Registrar nuevo usuario
router.post('/register', UserController.register);

// Login de usuario
router.post('/login', UserController.login);

// Obtener perfil completo de usuario (wishlist, historial, reseñas)
router.get('/:id', UserController.getProfile);

export default router;
