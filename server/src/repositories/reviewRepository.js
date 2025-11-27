import { supabase } from "../config/supabaseClient.js";
const TABLA_USUARIOS = 'usuarios'
const TABLA_RESEÑAS = 'reseñas';



export const reviewRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("reseñas")
      .select("*")
      .order("fecha_reseña", { ascending: false });

    if (error) throw new Error("Error fetching reviews: " + error.message);
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("reseñas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error fetching review: " + error.message);
    return data || null;
  },


  /// obtener reviews por id 
  // async getByProductId(producto_id) {
  //   const { data, error } = await supabase
  //     .from("reseñas")
  //     .select("*")
  //     .eq("producto_id", producto_id)
  //     .order("fecha_reseña", { ascending: false });

  //   if (error) throw new Error("Error fetching product reviews: " + error.message);
  //   return data || [];
  // },

  async getByProductId(producto_id) {
    // 1. Especifica las columnas que quieres de la tabla 'reseñas' (*)
    // 2. Utiliza el formato 'nombre_de_la_relacion(columnas)' para hacer el JOIN y traer datos del usuario.
    //    En este caso, la relación se crea por la clave foránea 'usuario_id'
    //    y la tabla 'usuarios' debe ser la relación de referencia.
    //    El formato es: 'nombre_de_la_tabla_foránea(columna_1, columna_2, ...)'
    
    const { data, error } = await supabase
        .from(TABLA_RESEÑAS)
        .select(`
            *,
            ${TABLA_USUARIOS}(nombre, apellido,foto_perfil) 
        `)
        .eq("producto_id", producto_id)
        .order("fecha_reseña", { ascending: false });

    if (error) throw new Error("Error fetching product reviews: " + error.message);
    
    // El resultado tendrá una estructura como esta para cada reseña:
    /*
    {
      "id": 1,
      "producto_id": 123,
      "usuario_id": "...",
      "contenido": "...",
      // ... otras columnas de 'reseñas'
      "usuarios": { // Supabase usa el nombre de la tabla relacionada (usuarios)
        "nombre": "Juan",
        "apellido": "Pérez"
      }
    }
    */
    
    return data || [];
},



  async getByUserId(usuario_id) {
    const { data, error } = await supabase
      .from("reseñas")
      .select("*")
      .eq("usuario_id", usuario_id)
      .order("fecha_reseña", { ascending: false });

    if (error) throw new Error("Error fetching user reviews: " + error.message);
    return data || [];
  },

  async create(payload) {
    const { usuario_id, producto_id, titulo_reseña, calificacion } = payload;

    // --------------------------------------------------------------------
    // 1. Validar título
    // --------------------------------------------------------------------
    if (!titulo_reseña || titulo_reseña.trim() === "") {
      throw new Error("Review title is required.");
    }

    // --------------------------------------------------------------------
    // 2. Validar calificación
    // --------------------------------------------------------------------
    if (calificacion == null) {
      throw new Error("Rating is required.");
    }
    if (calificacion < 1 || calificacion > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    // --------------------------------------------------------------------
    // 3. Validar que el producto exista
    // --------------------------------------------------------------------
    const { data: producto, error: prodError } = await supabase
      .from("productos")
      .select("id")
      .eq("id", producto_id)
      .single();

    if (prodError || !producto) {
      throw new Error("Product not found.");
    }

    // --------------------------------------------------------------------
    // 4. Validar que el usuario exista
    // --------------------------------------------------------------------
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .select("id")
      .eq("id", usuario_id)
      .single();

    if (userError || !usuario) {
      throw new Error("User not found.");
    }

    // --------------------------------------------------------------------
    // 5. Validar que el usuario compró el producto
    // compras + compras_items
    // --------------------------------------------------------------------
    const { data: compra, error: compraError } = await supabase
      .from("compras")
      .select(`
        id,
        compras_items!inner (producto_id)
      `)
      .eq("usuario_id", usuario_id)
      .eq("compras_items.producto_id", producto_id)
      .limit(1);

    if (compraError) {
      throw new Error("Error validating purchase.");
    }

    if (!compra || compra.length === 0) {
      throw new Error("User has not purchased this product.");
    }

    // --------------------------------------------------------------------
    // 6. Validar que no exista reseña previa
    // --------------------------------------------------------------------
    const { data: existingReview, error: dupError } = await supabase
      .from("reseñas")
      .select("id")
      .eq("usuario_id", usuario_id)
      .eq("producto_id", producto_id)
      .maybeSingle();

    if (dupError) throw new Error("Error validating duplicate review.");

    if (existingReview) {
      throw new Error("User has already reviewed this product.");
    }

    // --------------------------------------------------------------------
    // 7. Auto fecha
    // --------------------------------------------------------------------
    if (!payload.fecha_reseña) {
      payload.fecha_reseña = new Date().toISOString();
    }

    // --------------------------------------------------------------------
    // 8. Crear reseña
    // --------------------------------------------------------------------
    const { data, error } = await supabase
      .from("reseñas")
      .insert([payload])
      .select()
      .single();

    if (error) throw new Error("Error creating review: " + error.message);

    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from("reseñas")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error updating review: " + error.message);
    return data || null;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("reseñas")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error deleting review: " + error.message);
    return data || null;
  },


  
  async getAverageRatingByProduct(producto_id) {
  const { data, error } = await supabase
    .from("reseñas")
    .select("calificacion")
    .eq("producto_id", producto_id);

  if (error) throw new Error("Error fetching average rating: " + error.message);

  if (!data || data.length === 0) return 0;

  const avg =
    data.reduce((sum, r) => sum + r.calificacion, 0) / data.length;

  return Number(avg.toFixed(2));
}
};
