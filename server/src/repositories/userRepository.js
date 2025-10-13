// src/repositories/userRepository.js
import { supabase } from '../config/supabaseClient.js';

export const UserRepository = {
  // Crear un usuario
  createUser: async (user) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([user])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Obtener usuario por correo
  getUserByEmail: async (correo) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .maybeSingle(); // <-- cambia single() por maybeSingle()
    if (error) throw error;
    return data; // será null si no existe
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .maybeSingle(); // <-- cambia single() por maybeSingle()
    if (error) throw error;
    return data; // será null si no existe
  },

  // Obtener lista de deseos de un usuario
  getWishlist: async (userId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .select('producto_id, deseado, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener historial de compras de un usuario
  getPurchaseHistory: async (userId) => {
    const { data, error } = await supabase
      .from('historial_compras')
      .select('producto_id, fecha_compra, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Obtener reseñas de un usuario
  getReviews: async (userId) => {
    const { data, error } = await supabase
      .from('reseñas')
      .select('producto_id, titulo_reseña, calificacion, fecha_reseña, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  }
};
