// src/repositories/userRepository.js
import { supabase } from '../config/supabaseClient.js';

export const UserRepository = {
  // Crear un nuevo usuario
  createUser: async (user) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([user])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Obtener usuario por correo (para login)
  getUserByEmail: async (correo) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .maybeSingle(); // Retorna un solo registro o null
    if (error) throw error;
    return data;
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  // Actualizar información general del usuario
  updateUser: async (userId, updateFields) => {
    const { data, error } = await supabase
      .from('usuarios')
      .update(updateFields)
      .eq('id', userId)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Actualizar solo la contraseña (campo sensible)
  updateUserPassword: async (userId, hashedPassword) => {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ contraseña: hashedPassword })
      .eq('id', userId)
      .select('id, correo');
    if (error) throw error;
    return data[0];
  },

  // Obtener lista de deseos del usuario
  getWishlist: async (userId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .select('producto_id, deseado, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener historial de compras
  getPurchaseHistory: async (userId) => {
    const { data, error } = await supabase
      .from('historial_compras')
      .select('producto_id, fecha_compra, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener reseñas realizadas por el usuario
  getReviews: async (userId) => {
    const { data, error } = await supabase
      .from('reseñas')
      .select('producto_id, titulo_reseña, calificacion, fecha_reseña, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },
};
