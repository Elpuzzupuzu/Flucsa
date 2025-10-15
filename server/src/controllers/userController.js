// src/controllers/userController.js
import { UserService } from '../services/userService.js';

// OJO: La configuración de la cookie asume que tienes 'cookie-parser' configurado en tu app de Express.
const cookieConfig = {
  httpOnly: true, // No accesible desde JS
  secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
  sameSite: 'Lax',
};

export const UserController = {
  // ... (Métodos existentes: register, login, getAuthProfile, logout, getProfile)

  register: async (req, res) => { /* ... código existente ... */ 
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => { /* ... código existente ... */ 
    try {
      const { correo, contraseña } = req.body;
// ... (resto del código de login)
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

  getAuthProfile: (req, res) => { /* ... código existente ... */ 
    // Si el authMiddleware pasó, req.user ya está poblado.
    // Devolvemos el objeto de usuario que necesitamos para Redux.
    const { id, correo, nombre, apellido, rol } = req.user;
    res.status(200).json({ id, correo, nombre, apellido, rol });
  },

  logout: (req, res) => { /* ... código existente ... */ 
    // Limpiar las cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  getProfile: async (req, res) => { /* ... código existente ... */ 
    try {
      // Usamos req.user.id, que es más seguro que usar un parámetro
      const userId = req.user.id; 
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // 🚀 NUEVO: Actualizar perfil de usuario (nombre, apellido, etc.)
  updateProfile: async (req, res) => {
    try {
      // El ID proviene del token validado por el middleware (máxima seguridad)
      const userId = req.user.id; 
      const updatedUser = await UserService.updateUserProfile(userId, req.body);

      // Devolvemos los datos limpios para que el Redux Slice los actualice
      res.status(200).json(updatedUser);
    } catch (error) {
      // 400 Bad Request si no hay campos válidos o falla la validación
      res.status(400).json({ error: error.message });
    }
  },

  // 🚀 NUEVO: Actualizar contraseña
  updatePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
      }

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      // Si es exitoso, devolvemos un mensaje y el frontend sabrá que debe desloguear
      res.status(200).json({ message: 'Contraseña actualizada exitosamente. Por favor, vuelve a iniciar sesión.' });
    } catch (error) {
      // 401 Unauthorized si la contraseña actual es incorrecta
      if (error.message === 'Contraseña actual incorrecta') {
        return res.status(401).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  },
};