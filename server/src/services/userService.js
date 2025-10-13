// src/services/userService.js
import bcrypt from 'bcrypt';
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
    if (!user) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid) throw new Error('Contraseña incorrecta');

    return user;
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
