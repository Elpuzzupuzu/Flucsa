// src/repositories/wishlistRepository.js
import { supabase } from '../config/supabaseClient.js';

export const WishlistRepository = {
  // Obtener lista de deseos de un usuario
  getWishlistByUser: async (userId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .select('id, deseado, productos(*)')
      .eq('usuario_id', userId);
    if (error) throw error;
    return data;
  },

  // Agregar producto a la lista de deseos
  addProduct: async (userId, productId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .insert([{ usuario_id: userId, producto_id: productId, deseado: true }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Eliminar producto de la lista de deseos
  removeProduct: async (userId, productId) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .delete()
      .eq('usuario_id', userId)
      .eq('producto_id', productId)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Marcar o desmarcar producto como deseado
  toggleProduct: async (userId, productId, deseado) => {
    const { data, error } = await supabase
      .from('lista_deseados')
      .update({ deseado })
      .eq('usuario_id', userId)
      .eq('producto_id', productId)
      .select();
    if (error) throw error;
    return data[0];
  }
};
