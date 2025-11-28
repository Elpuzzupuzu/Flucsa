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
  // getUserById: async (id) => {
  //   const { data, error } = await supabase
  //     .from('usuarios')
  //     .select('*')
  //     .eq('id', id)
  //     .maybeSingle();
  //   if (error) throw error;
  //   return data;
  // },


  getUserById: async (id) => {
  // console.log("🟦 [Repository] Buscando usuario con ID:", id);

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  // console.log("🟨 [Repository] Resultado data:", data);
  // console.log("🟥 [Repository] Error:", error);

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

 

  getUserPurchaseHistory: async (userId) => {
  // console.log("🟦 [Repository] Buscando historial de compras para usuario:", userId);

  try {
    // 1️⃣ Obtener todas las compras del usuario
    const { data: compras, error: comprasError } = await supabase
      .from('compras')
      .select('*')
      .eq('usuario_id', userId)
      .order('fecha_compra', { ascending: false });

    // console.log("🟨 [Repository] Compras encontradas:", compras);
    // console.log("🟥 [Repository] Error Compras:", comprasError);

    if (comprasError) throw comprasError;
    if (!compras || compras.length === 0) return [];

    // 2️⃣ Obtener todos los IDs de compras
    const compraIds = compras.map(c => c.id);

    // 3️⃣ Obtener todos los detalles de esas compras
    const { data: detalles, error: detallesError } = await supabase
      .from('compras_items')
      .select(`
        *,
        productos:producto_id (
          id,
          nombre,
          descripcion,
          precio,
          imagen
        )
      `)
      .in('compra_id', compraIds);

    // console.log("🟨 [Repository] Detalles encontrados:", detalles);
    // console.log("🟥 [Repository] Error Detalles:", detallesError);

    if (detallesError) throw detallesError;

    // 4️⃣ Unir compras + detalles en un solo objeto
    const comprasConDetalles = compras.map(compra => ({
      ...compra,
      detalles: detalles.filter(d => d.compra_id === compra.id)
    }));

    return comprasConDetalles;

  } catch (err) {
    // console.error("❌ [Repository] Error en getUserPurchaseHistory:", err);
    throw err;
  }
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