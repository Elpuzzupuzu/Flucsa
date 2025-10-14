// src/controllers/userController.js
import { UserService } from '../services/userService.js';

// OJO: La configuración de la cookie asume que tienes 'cookie-parser' configurado en tu app de Express.
const cookieConfig = {
  httpOnly: true, // No accesible desde JS
  secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
  sameSite: 'Lax',
};

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

      // El servicio ahora devuelve { user, accessToken, refreshToken }
      const { user, accessToken, refreshToken, errorType } = await UserService.loginUser(correo, contraseña);

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

      // 3. Login exitoso: Devolver SOLO los datos del usuario al frontend para Redux
      res.status(200).json(user);

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // NUEVO ENDPOINT: Usado al cargar la aplicación para re-hidratar la sesión
  getAuthProfile: (req, res) => {
    // Si el authMiddleware pasó, req.user ya está poblado.
    // Devolvemos el objeto de usuario que necesitamos para Redux.
    const { id, correo, nombre, apellido, rol } = req.user;
    res.status(200).json({ id, correo, nombre, apellido, rol });
  },

  // NUEVO ENDPOINT: Usado para cerrar sesión
  logout: (req, res) => {
    // Limpiar las cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // Obtener perfil de usuario
  getProfile: async (req, res) => {
    try {
      // Idealmente, usarías req.user.id ya validado por el middleware
      const userId = req.user ? req.user.id : req.params.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
