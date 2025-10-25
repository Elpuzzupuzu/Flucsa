import { UserService } from '../services/userService.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';

// 1. Configuración de seguridad BASE (para SameSite y Secure)
const cookieSecurityConfig = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
};


// const isProduction = process.env.NODE_ENV === 'production';

// // Modifica la configuración condicional:
// const cookieSecurityConfig = (maxAge) => {
//   if (isProduction) {
//     // EN PRODUCCIÓN (Render): Requiere HTTPS (secure: true)
//     // y SameSite: 'None' para funcionar entre dominios separados.
//     return {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'None', // Permite el envío cross-site
//       path: '/',
//       maxAge: maxAge,
//     };
//   } else {
//     // EN DESARROLLO (Local): Usamos 'Lax' o 'Strict' si es posible,
//     // y secure: false (porque local no usa HTTPS).
//     return {
//       httpOnly: true,
//       secure: false, // Desactivado para local (HTTP)
//       sameSite: 'Lax', // Más seguro que 'None'
//       path: '/',
//       maxAge: maxAge,
//     };
//   }
// };



// 2. Tiempos de vida (para reuso)
const ACCESS_TOKEN_MAX_AGE = 5 * 60 * 1000; // 5 minutos
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días

export const UserController = {
  // ===============================
  // Registro de usuario
  // ===============================
  register: async (req, res) => {
    try {
      const newUser = await UserService.registerUser(req.body);
      // Nota: Aquí podrías querer llamar a login para establecer las cookies.
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

      // CREACIÓN - Usamos la configuración de seguridad + maxAge
      res.cookie('accessToken', accessToken, { ...cookieSecurityConfig, maxAge: ACCESS_TOKEN_MAX_AGE });
      res.cookie('refreshToken', refreshToken, { ...cookieSecurityConfig, maxAge: REFRESH_TOKEN_MAX_AGE });

      res.status(200).json(user);
    } catch (error) {
      console.error('Error interno en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // ===============================
  // Verificación de sesión / refresh token
  // ===============================
  checkAuthStatus: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      if (accessToken) {
        try {
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          const user = await UserService.getUserProfile(decoded.id);
          return res.status(200).json(user);
        } catch (err) {
          if (err.name !== 'TokenExpiredError') throw err;
        }
      }

      if (refreshToken) {
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          const user = await UserService.getUserProfile(decodedRefresh.id);
          const newAccessToken = UserService.generateAccessToken({
            id: decodedRefresh.id,
            rol: user.rol,
          });

          res.cookie('accessToken', newAccessToken, {
            ...cookieSecurityConfig,
            maxAge: ACCESS_TOKEN_MAX_AGE,
          });

          return res.status(200).json(user);
        } catch {
          res.clearCookie('accessToken', cookieSecurityConfig);
          res.clearCookie('refreshToken', cookieSecurityConfig);
          return res.status(401).json({ error: 'Sesión expirada, por favor loguéate de nuevo' });
        }
      }

      return res.status(401).json({ error: 'No autorizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // ===============================
  // Perfil autenticado
  // ===============================
  getAuthProfile: (req, res) => {
    const { id, correo, nombre, apellido, rol } = req.user;
    res.status(200).json({ id, correo, nombre, apellido, rol });
  },

  // ===============================
  // Logout
  // ===============================
  logout: (req, res) => {
    res.clearCookie('accessToken', cookieSecurityConfig);
    res.clearCookie('refreshToken', cookieSecurityConfig);
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // ===============================
  // Perfil completo
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

      res.clearCookie('accessToken', cookieSecurityConfig);
      res.clearCookie('refreshToken', cookieSecurityConfig);

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
