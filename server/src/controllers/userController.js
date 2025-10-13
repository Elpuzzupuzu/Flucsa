// src/controllers/userController.js
import { UserService } from '../services/userService.js';

export const UserController = {
  register: async (req, res) => {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, contraseña } = req.body;

      if (!correo || !contraseña) {
        return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
      }

      const user = await UserService.loginUser(correo, contraseña);

      // El servicio puede devolver un objeto con error específico
      if (user.errorType === 'USER_NOT_FOUND') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      if (user.errorType === 'INVALID_PASSWORD') {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Login exitoso
      res.status(200).json(user);

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
