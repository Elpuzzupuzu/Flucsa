import { UserService } from '../services/userService.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const ACCESS_TOKEN_MAX_AGE = 5 * 60 * 1000; // 5 minutos
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días
const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token';

// Configuración de cookies
const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
  maxAge,
});

export const UserController = {
  // ===============================
  // Registro de usuario
  // ===============================
  register: async (req, res) => {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  // ===============================
  // Inicio de sesión (LOGIN)
  // ===============================
  login: async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      if (!correo || !contraseña)
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });

      const { user, accessToken, refreshToken, errorType } =
        await UserService.loginUser(correo, contraseña);

      if (errorType === 'USER_NOT_FOUND') return res.status(404).json({ error: 'Usuario no encontrado' });
      if (errorType === 'INVALID_PASSWORD') return res.status(401).json({ error: 'Contraseña incorrecta' });

      // Setear cookies
      res.cookie(COOKIE_NAME, accessToken, cookieOptions(ACCESS_TOKEN_MAX_AGE));
      res.cookie('auth_refresh', refreshToken, cookieOptions(REFRESH_TOKEN_MAX_AGE));

      res.status(200).json(user);
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // ===============================
  // Logout
  // ===============================
  logout: (req, res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions(0));
    res.clearCookie('auth_refresh', cookieOptions(0));
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // ===============================
  // Perfil autenticado
  // ===============================
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ error: 'Perfil no encontrado' });
    }
  },

  // ===============================
  // Actualizar perfil
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
  // Actualizar contraseña
  // ===============================
  updatePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword)
        return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      // Limpiar cookies tras cambio de contraseña
      res.clearCookie(COOKIE_NAME, cookieOptions(0));
      res.clearCookie('auth_refresh', cookieOptions(0));

      res.status(200).json({
        message: 'Contraseña actualizada exitosamente. Por favor, vuelve a iniciar sesión.',
      });
    } catch (error) {
      if (error.message === 'Contraseña actual incorrecta') {
        return res.status(401).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  },
};
