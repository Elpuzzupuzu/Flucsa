import { UserService } from '../services/userService.js';

// ===============================
// CORRECCIÓN: Declaración de isProduction
// ===============================
const isProduction = process.env.NODE_ENV === 'production';

// ===============================
// CONFIGURACIÓN DE LA COOKIE (CONDICIONALMENTE)
// ===============================
const cookieConfig = {
  httpOnly: true,
  // En producción (HTTPS), 'secure' debe ser true. En desarrollo (HTTP), debe ser false.
  secure: isProduction,
  // Si 'secure' es true, 'sameSite' debe ser 'None' (requiere secure). En desarrollo, usamos 'Lax'.
  sameSite: isProduction ? 'None' : 'Lax',
  // En localhost, no establezcas el dominio (undefined). En producción, usa el dominio base.
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
      // Manejo de errores específicos de Supabase/PostgreSQL (ej. llave duplicada)
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

      // El servicio devuelve { user, accessToken, refreshToken, errorType }
      const { user, accessToken, refreshToken, errorType } =
        await UserService.loginUser(correo, contraseña);

      if (errorType === 'USER_NOT_FOUND') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (errorType === 'INVALID_PASSWORD') {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // 1. CONFIGURAR COOKIE PARA ACCESS TOKEN (5 minutos de persistencia)
      res.cookie('accessToken', accessToken, {
        ...cookieConfig,
        maxAge: 5 * 60 * 1000, // 5 minutos (Persistencia corta)
      });

      // 2. CONFIGURAR COOKIE PARA REFRESH TOKEN (7 días de persistencia)
      res.cookie('refreshToken', refreshToken, {
        ...cookieConfig,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días (Persistencia larga)
      });

      // 3. Login exitoso: Devolver SOLO los datos del usuario al frontend
      res.status(200).json(user);
    } catch (error) {
      console.error('Error interno en login:', error);
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
    // Asegúrate de usar los mismos parámetros de configuración para clearCookie, 
    // ya que el dominio y path son importantes para que el navegador la encuentre y la borre.
    res.clearCookie('accessToken', { ...cookieConfig, maxAge: 0 });
    res.clearCookie('refreshToken', { ...cookieConfig, maxAge: 0 });
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },

  // ===============================
  // Obtener perfil de usuario
  // ===============================
  getProfile: async (req, res) => {
    try {
      // Usamos req.user.id que es más seguro
      const userId = req.user.id;
      const profile = await UserService.getUserProfile(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ error: 'Perfil no encontrado' });
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
        return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
      }

      await UserService.updateUserPassword(userId, currentPassword, newPassword);

      // Al cambiar la contraseña, eliminamos la sesión actual por seguridad
      res.clearCookie('accessToken', { ...cookieConfig, maxAge: 0 });
      res.clearCookie('refreshToken', { ...cookieConfig, maxAge: 0 });

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
