// src/services/userService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository.js';

export const UserService = {
  registerUser: async (user) => {
    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.contraseña, salt);
    user.contraseña = hashedPassword;

    // Crear usuario
    return await UserRepository.createUser(user);
  },

  loginUser: async (correo, password) => {
    const user = await UserRepository.getUserByEmail(correo);

    // Usuario no encontrado
    if (!user) {
      return { errorType: 'USER_NOT_FOUND' };
    }

    // Contraseña incorrecta
    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid) {
      return { errorType: 'INVALID_PASSWORD' };
    }

    // Generar tokens JWT
    const accessToken = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Login exitoso
    return {
      user: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol
      },
      accessToken,
      refreshToken
    };
  },

  getUserProfile: async (userId) => {
    const user = await UserRepository.getUserById(userId);
    const wishlist = await UserRepository.getWishlist(userId);
    const history = await UserRepository.getPurchaseHistory(userId);
    const reviews = await UserRepository.getReviews(userId);

    return {
      ...user,
      wishlist,
      history,
      reviews
    };
  }
};
