// src/services/userService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository.js';

export const UserService = {
  // ... (Métodos existentes: registerUser, loginUser, getUserProfile)
    
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
    if (!user) throw new Error('Usuario no encontrado');

    // Excluimos la contraseña antes de devolver el objeto
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

  // 🚀 NUEVO: Actualizar información de perfil
  updateUserProfile: async (userId, updateData) => {
    // Opcional: Filtra los campos permitidos para evitar actualizar 'rol' o 'contraseña'
    const allowedFields = ['nombre', 'apellido', 'correo'];
    const filteredData = Object.keys(updateData)
      .reduce((obj, key) => {
        if (allowedFields.includes(key) && updateData[key] !== undefined) {
          obj[key] = updateData[key];
        }
        return obj;
      }, {});

    if (Object.keys(filteredData).length === 0) {
      throw new Error('No hay campos válidos para actualizar');
    }

    // La actualización devuelve el objeto de usuario actualizado
    const updatedUser = await UserRepository.updateUser(userId, filteredData);
    
    // Eliminamos la contraseña del objeto de respuesta antes de enviarlo al controller
    const { contraseña, ...safeUser } = updatedUser;

    return safeUser;
  },
    
  // 🚀 NUEVO: Actualizar contraseña
  updateUserPassword: async (userId, currentPassword, newPassword) => {
    // 1. Obtener el usuario para verificar la contraseña actual
    const user = await UserRepository.getUserById(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Verificar la contraseña actual
    const valid = await bcrypt.compare(currentPassword, user.contraseña);
    if (!valid) {
      throw new Error('Contraseña actual incorrecta');
    }

    // 3. Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Actualizar en el repositorio
    return await UserRepository.updateUserPassword(userId, newHashedPassword);
  },
};