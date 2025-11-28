import { UserService } from '../services/userService.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
console.log("NODE_ENV:", process.env.NODE_ENV, "| isProduction:", isProduction);

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

// Configuración de cookies
const cookieConfig = {
  httpOnly: true,
  // En producción (HTTPS) es true, en desarrollo (HTTP) es false.
  secure: isProduction,
  // sameSite: 'None' requiere 'secure: true'. Usamos 'Lax' en desarrollo (HTTP)
  // ya que suele funcionar bien para peticiones GET.
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
};

export const UserController = {
  // Registro de usuario
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

  // Login (INICIO DE SESIÓN)
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

      // Opciones de la cookie final, incluyendo la duración de 7 días.
      const finalCookieOptions = {
        ...cookieConfig,
        maxAge: COOKIE_MAX_AGE,
      };

      // Guardamos refreshToken en cookie HttpOnly con duración
      res.cookie('auth_refresh', refreshToken, finalCookieOptions);

      // Enviamos accessToken en JSON
      res.status(200).json({ user, accessToken });
    } catch (error) {
      console.error('Error interno en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Refresh token
  refresh: async (req, res) => {
    const refreshToken = req.cookies.auth_refresh;
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await UserService.getUserProfile(decoded.id);

      const newAccessToken = UserService.generateAccessToken({ id: decoded.id, rol: user.rol });

      res.status(200).json({ accessToken: newAccessToken, user });
    } catch (err) {
      console.error('Refresh token inválido o expirado:', err);
      // Si falla, borramos la cookie para forzar un nuevo login
      res.clearCookie('auth_refresh', cookieConfig);
      return res.status(403).json({ error: "Refresh token inválido o expirado" });
    }
  },

  // Logout
  logout: (req, res) => {
    // Borramos la cookie usando la configuración base
    res.clearCookie('auth_refresh', cookieConfig);
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // Perfil ligero (usando datos de req.user inyectados por el middleware)
  getAuthProfile: (req, res) => {
    const { id, correo, nombre, apellido, rol, foto_perfil } = req.user;

    // 💡 LOG DE MONITOREO EN BACKEND
    console.log("✅ [BACKEND LOG] Datos de perfil enviados en /users/auth:", 
      { id, correo, nombre, apellido, rol, foto_perfil });

    res.status(200).json({ id, correo, nombre, apellido, rol, foto_perfil });
  },

  // Perfil completo
  // getProfile: async (req, res) => {
  //   try {
  //     const userId = req.user.id;
  //     const profile = await UserService.getUserProfile(userId);
  //     res.status(200).json(profile);
  //   } catch (error) {
  //     res.status(404).json({ error: 'Perfil no encontrado' });
  //   }
  // },


  getProfile: async (req, res) => {
  try {
    console.log("🟦 [Controller] getProfile() llamado");

    console.log("➡️ req.user recibido:", req.user);

    const userId = req.user?.id;
    console.log("🟩 ID extraído de req.user.id:", userId);

    if (!userId) {
      console.error("🟥 No se recibió user.id en req.user");
      return res.status(400).json({ error: "ID de usuario no válido" });
    }

    const profile = await UserService.getUserProfile(userId);

    console.log("🟦 [Controller] getUserProfile RESULT:", profile);

    res.status(200).json(profile);
  } catch (error) {
    console.error("🟥 [Controller] ERROR en getProfile:", error);
    res.status(404).json({ error: 'Perfil no encontrado' });
  }
},


  // Actualizar perfil
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedUser = await UserService.updateUserProfile(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar contraseña
  updatePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
      }

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      // Limpiamos cookie auth_refresh al cambiar contraseña por seguridad
      res.clearCookie('auth_refresh', cookieConfig);

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


  /// compras 
  getUserPurchaseHistory: async (req, res) => {
    try {
      const userId = req.params.userId;

      const history = await UserService.getUserPurchaseHistory(userId);

      return res.status(200).json({
        ok: true,
        message: "Historial de compras obtenido correctamente",
        data: history
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Error al obtener el historial de compras",
        error: err.message
      });
    }
  },

  /// reviews 
   getReviews: async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await UserService.getUserReviews(userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: err.message || 'Error al obtener las reseñas',
      });
    }
  },


};
