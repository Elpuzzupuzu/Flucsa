import { UserService } from '../services/userService.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días

const cookieConfig = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
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
      if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
      }

      const { user, accessToken, refreshToken, errorType } =
        await UserService.loginUser(correo, contraseña);

      if (errorType === 'USER_NOT_FOUND') return res.status(404).json({ error: 'Usuario no encontrado' });
      if (errorType === 'INVALID_PASSWORD') return res.status(401).json({ error: 'Contraseña incorrecta' });

      // Guardamos solo refreshToken en cookie HttpOnly
      res.cookie('refreshToken', refreshToken, { ...cookieConfig, maxAge: COOKIE_MAX_AGE });

      // Enviamos accessToken en JSON
      res.status(200).json({ user, accessToken });
    } catch (error) {
      console.error('Error interno en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // ===============================
  // Refresh token
  // ===============================
  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await UserService.getUserProfile(decoded.id);
      const newAccessToken = UserService.generateAccessToken({ id: decoded.id, rol: user.rol });

      res.status(200).json({ accessToken: newAccessToken, user });
    } catch (err) {
      res.clearCookie('refreshToken', cookieConfig);
      return res.status(403).json({ error: "Refresh token inválido o expirado" });
    }
  },

  // ===============================
  // Logout
  // ===============================
  logout: (req, res) => {
    res.clearCookie('refreshToken', cookieConfig);
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // ===============================
  // Perfil ligero autenticado
  // ===============================
  getAuthProfile: (req, res) => {
    const { id, correo, nombre, apellido, rol } = req.user;
    res.status(200).json({ id, correo, nombre, apellido, rol });
  },

  // ===============================
  // Perfil completo (historial, wishlist, reviews)
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

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
      }

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      // Limpiamos cookie al cambiar contraseña
      res.clearCookie('refreshToken', cookieConfig);

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
