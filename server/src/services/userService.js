// src/services/userService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRATION || "15m";
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRATION || "7d";

export const UserService = {
  // ===============================
  // Registro de usuario
  // ===============================
  registerUser: async (userData) => {
    // Verificar si el usuario ya existe
    const existingUser = await UserRepository.getUserByEmail(userData.correo);
    if (existingUser) throw new Error("El correo ya está registrado");

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.contraseña, salt);

    const newUser = await UserRepository.createUser({
      ...userData,
      contraseña: hashedPassword,
    });

    delete newUser.contraseña;
    return newUser;
  },

  // ===============================
  // Inicio de sesión
  // ===============================
  loginUser: async (correo, password) => {
    const user = await UserRepository.getUserByEmail(correo);
    if (!user) return { errorType: "USER_NOT_FOUND" };

    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid) return { errorType: "INVALID_PASSWORD" };

    const accessToken = UserService.generateAccessToken({ id: user.id, rol: user.rol });
    const refreshToken = UserService.generateRefreshToken({ id: user.id });

    // Datos del usuario seguros (sin contraseña)
    const userSafe = {
      id: user.id,
      correo: user.correo,
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
      foto_perfil: user.foto_perfil,
    };

    return { user: userSafe, accessToken, refreshToken };
  },

  // ===============================
  // Generación de Tokens
  // ===============================
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, rol: user.rol },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES }
    );
  },

  // ===============================
  // Renovar access token usando refresh token
  // ===============================
  refreshAccessToken: async (refreshToken) => {
    if (!refreshToken) throw new Error("No se proporcionó refresh token");

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const user = await UserRepository.getUserById(decoded.id);
      if (!user) throw new Error("Usuario no encontrado");

      const accessToken = UserService.generateAccessToken({ id: user.id, rol: user.rol });
      return { accessToken, user };
    } catch (err) {
      throw new Error("Refresh token inválido o expirado");
    }
  },

  // ===============================
  // Obtener perfil completo
  // ===============================
  getUserProfile: async (userId) => {
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const { contraseña, ...userSafe } = user;
    const wishlist = await UserRepository.getWishlist(userId);
    const history = await UserRepository.getPurchaseHistory(userId);
    const reviews = await UserRepository.getReviews(userId);

    return { ...userSafe, wishlist, history, reviews };
  },

  // ===============================
  // Actualizar perfil
  // ===============================
  updateUserProfile: async (userId, updateData) => {
    const allowedFields = ["nombre", "apellido", "correo", "direccion", "celular", "foto_perfil"];
    const filteredData = Object.keys(updateData).reduce((obj, key) => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        obj[key] = updateData[key];
      }
      return obj;
    }, {});

    if (Object.keys(filteredData).length === 0) {
      throw new Error("No hay campos válidos para actualizar");
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
    if (!user) throw new Error("Usuario no encontrado");

    const valid = await bcrypt.compare(currentPassword, user.contraseña);
    if (!valid) throw new Error("Contraseña actual incorrecta");

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    return await UserRepository.updateUserPassword(userId, newHashedPassword);
  },
};
