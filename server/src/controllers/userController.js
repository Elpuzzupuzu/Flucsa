// src/controllers/userController.js
import { UserService } from '../services/userService.js';

// OJO: La configuración de la cookie asume que tienes 'cookie-parser' configurado en tu app de Express.
// const cookieConfig = {
//   httpOnly: true, // No accesible desde JS
//   secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
//   sameSite: 'Lax',
// };
const cookieConfig = {
  httpOnly: true,
  secure: true,             // obligatorio en HTTPS
  sameSite: 'None',         // permite cookies entre dominios
  domain: '.onrender.com',  // 🔥 permite que funcione en subdominios
  path: '/',                // cookie disponible para toda la app
};


export const UserController = {
  // ===============================
  // Registro de usuario
  // ===============================
  register: async (req, res) => {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ===============================
  // Inicio de sesión
  // ===============================
  login: async (req, res) => {
    try {
      const { correo, contraseña } = req.body;

      if (!correo || !contraseña) {
        return res
          .status(400)
          .json({ error: 'Correo y contraseña son obligatorios' });
      }

      // El servicio devuelve { user, accessToken, refreshToken, errorType }
      const { user, accessToken, refreshToken, errorType } =
        await UserService.loginUser(correo, contraseña);

      if (errorType === 'USER_NOT_FOUND') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (errorType === 'INVALID_PASSWORD') {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // 1. CONFIGURAR COOKIE PARA ACCESS TOKEN (5 minutos)
      res.cookie('accessToken', accessToken, {
        ...cookieConfig,
        maxAge: 5 * 60 * 1000, // 5 minutos
      });

      // 2. CONFIGURAR COOKIE PARA REFRESH TOKEN (7 días)
      res.cookie('refreshToken', refreshToken, {
        ...cookieConfig,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      // 3. Login exitoso: Devolver SOLO los datos del usuario al frontend
      res.status(200).json(user);
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // ===============================
  // Obtener perfil autenticado
  // ===============================
  getAuthProfile: (req, res) => {
    // Si el authMiddleware pasó, req.user ya está poblado.
    const { id, correo, nombre, apellido, rol } = req.user;
    res.status(200).json({ id, correo, nombre, apellido, rol });
  },

  // ===============================
  // Cerrar sesión
  // ===============================
  logout: (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // ===============================
  // Obtener perfil de usuario
  // ===============================
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ===============================
  // 🚀 Actualizar perfil de usuario
  // ===============================
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedUser = await UserService.updateUserProfile(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ===============================
  // 🚀 Actualizar contraseña
  // ===============================
  updatePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: 'Contraseña actual y nueva son requeridas.' });
      }

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      res.status(200).json({
        message:
          'Contraseña actualizada exitosamente. Por favor, vuelve a iniciar sesión.',
      });
    } catch (error) {
      if (error.message === 'Contraseña actual incorrecta') {
        return res.status(401).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  },
};
