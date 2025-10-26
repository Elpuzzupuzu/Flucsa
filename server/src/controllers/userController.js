import { UserService } from '../services/userService.js';
import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';

// 1. Configuración de seguridad BASE (para SameSite y Secure)
// NOTA IMPORTANTE: Asume que app.set('trust proxy', 1) ya está en index.js
const cookieSecurityConfig = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    path: '/',
};


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
            res.status(201).json(newUser);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
            }
            res.status(400).json({ error: error.message });
        }
    },

    // ===============================
    // Inicio de sesión (LOGIN) - 🚀 MODIFICADO
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

            // 1. SOLO EL REFRESH TOKEN VA EN LA COOKIE (HttpOnly, Secure, SameSite=None)
            res.cookie('refreshToken', refreshToken, { ...cookieSecurityConfig, maxAge: REFRESH_TOKEN_MAX_AGE });
            // Eliminado: res.cookie('accessToken', ...)

            // 2. El Access Token (AT) se envía en el cuerpo JSON.
            // El frontend lo capturará y usará para el encabezado "Authorization".
            res.status(200).json({
                user,
                accessToken, // <-- Enviamos el AT aquí
            });
        } catch (error) {
            console.error('Error interno en login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // ===============================
    // Verificación de sesión / refresh token - 🔄 MODIFICADO
    // ===============================
    checkAuthStatus: async (req, res) => {
        try {
            // Ya no revisamos req.cookies.accessToken, asumimos que expiró si se llama a esto.
            const refreshToken = req.cookies.refreshToken;

            if (refreshToken) {
                try {
                    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    const user = await UserService.getUserProfile(decodedRefresh.id);
                    
                    // Generamos el nuevo Access Token
                    const newAccessToken = UserService.generateAccessToken({
                        id: decodedRefresh.id,
                        rol: user.rol,
                    });

                    // 🚨 NO SE USA res.cookie('accessToken', ...) 🚨

                    // Devolvemos el usuario y el nuevo AT en el cuerpo JSON
                    return res.status(200).json({
                        user,
                        accessToken: newAccessToken,
                    });
                } catch {
                    // Error al verificar el Refresh Token, limpiar la sesión
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
    // Logout - 🚪 MODIFICADO
    // ===============================
    logout: (req, res) => {
        // Solo limpiamos el Refresh Token de la cookie. El AT está en memoria (se borra en el frontend).
        res.clearCookie('refreshToken', cookieSecurityConfig);
        // Eliminado: res.clearCookie('accessToken', ...)
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
    // Actualizar contraseña - 🔒 MODIFICADO
    // ===============================
    updatePassword: async (req, res) => {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({ error: 'Contraseña actual y nueva son requeridas.' });
            }

            await UserService.updateUserPassword(userId, currentPassword, newPassword);

            // Limpiamos solo el Refresh Token, forzando un nuevo inicio de sesión.
            res.clearCookie('refreshToken', cookieSecurityConfig);
            // Eliminado: res.clearCookie('accessToken', ...)

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