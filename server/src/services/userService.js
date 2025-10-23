// src/services/userService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository.js';

export const UserService = {
  // ===============================
  // Registro de usuario
  // ===============================
  registerUser: async (user) => {
    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.contraseña, salt);
    user.contraseña = hashedPassword;

    // Crear usuario en DB
    return await UserRepository.createUser(user);
  },

  // ===============================
  // Inicio de sesión
  // ===============================
  loginUser: async (correo, password) => {
    const user = await UserRepository.getUserByEmail(correo);

    // Usuario no encontrado
    if (!user) return { errorType: 'USER_NOT_FOUND' };

    // Contraseña incorrecta
    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid) return { errorType: 'INVALID_PASSWORD' };

    // Generar tokens JWT
    const accessToken = UserService.generateAccessToken({ id: user.id, rol: user.rol });
    const refreshToken = UserService.generateRefreshToken({ id: user.id, rol: user.rol });

    return {
      user: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
        foto_perfil: user.foto_perfil
      },
      accessToken,
      refreshToken
    };
  },

  // ===============================
  // Generación de Tokens
  // ===============================
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '5m' }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d' }
    );
  },

  refreshAccessToken: async (userId) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return UserService.generateAccessToken({ id: user.id, rol: user.rol });
  },

  // ===============================
  // Obtener perfil completo
  // ===============================
  getUserProfile: async (userId) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const { contraseña, ...userWithoutPassword } = user;
    const wishlist = await UserRepository.getWishlist(userId);
    const history = await UserRepository.getPurchaseHistory(userId);
    const reviews = await UserRepository.getReviews(userId);

    return {
      ...userWithoutPassword,
      wishlist,
      history,
      reviews
    };
  },

  // ===============================
  // Actualizar perfil
  // ===============================
  updateUserProfile: async (userId, updateData) => {
    const allowedFields = ['nombre', 'apellido', 'correo'];
    const filteredData = Object.keys(updateData).reduce((obj, key) => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        obj[key] = updateData[key];
      }
      return obj;
    }, {});

    if (Object.keys(filteredData).length === 0) {
      throw new Error('No hay campos válidos para actualizar');
    }

    const updatedUser = await UserRepository.updateUser(userId, filteredData);
    const { contraseña, ...safeUser } = updatedUser;

    return safeUser;
  },

  // ===============================
  // Actualizar contraseña
  // ===============================
  updateUserPassword: async (userId, currentPassword, newPassword) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(currentPassword, user.contraseña);
    if (!valid) throw new Error('Contraseña actual incorrecta');

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    return await UserRepository.updateUserPassword(userId, newHashedPassword);
  }
};
