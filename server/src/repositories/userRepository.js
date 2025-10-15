// src/repositories/userRepository.js
import { supabase } from '../config/supabaseClient.js';

export const UserRepository = {
  // ... (Métodos existentes: createUser, getUserByEmail, getUserById, getWishlist, getPurchaseHistory, getReviews)

  // Crear un usuario (existente)
  createUser: async (user) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([user])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Obtener usuario por correo (existente)
  getUserByEmail: async (correo) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .maybeSingle(); 
    if (error) throw error;
    return data; 
  },

  // Obtener usuario por ID (existente)
  getUserById: async (id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .maybeSingle(); 
    if (error) throw error;
    return data; 
  },
    
  // 🚀 NUEVO: Actualizar el perfil del usuario (nombre, apellido, etc.)
  updateUser: async (userId, updateFields) => {
    const { data, error } = await supabase
      .from('usuarios')
      .update(updateFields)
      .eq('id', userId)
      .select(); // select() para devolver los datos actualizados
    if (error) throw error;
    return data[0];
  },

  // 🚀 NUEVO: Actualizar solo la contraseña (que es un campo más sensible)
  updateUserPassword: async (userId, hashedPassword) => {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ contraseña: hashedPassword })
      .eq('id', userId)
      .select('id, correo'); // Devolvemos un objeto ligero.
    if (error) throw error;
    return data[0];
  },

  // Obtener lista de deseos de un usuario (existente)
  getWishlist: async (userId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .select('producto_id, deseado, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener historial de compras de un usuario (existente)
  getPurchaseHistory: async (userId) => {
    const { data, error } = await supabase
      .from('historial_compras')
      .select('producto_id, fecha_compra, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener reseñas de un usuario (existente)
  getReviews: async (userId) => {
    const { data, error } = await supabase
      .from('reseñas')
      .select('producto_id, titulo_reseña, calificacion, fecha_reseña, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  }
};