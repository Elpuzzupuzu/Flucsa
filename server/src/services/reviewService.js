import { reviewRepository } from "../repositories/reviewRepository.js";
import { supabase } from "../config/supabaseClient.js";

export const reviewService = {
  async getAll() {
    return await reviewRepository.getAll();
  },

  async getById(id) {
    return await reviewRepository.getById(id);
  },

  async getByProductId(producto_id) {
    return await reviewRepository.getByProductId(producto_id);
  },

  async getByUserId(usuario_id) {
    return await reviewRepository.getByUserId(usuario_id);
  },

async create(data) {
  const { usuario_id, producto_id, calificacion } = data;

  // 1. Validar título no vacío
  if (!data.titulo_reseña || data.titulo_reseña.trim() === "") {
    throw new Error("Review title is required.");
  }

  // 2. Validar que exista calificación
  if (calificacion === undefined || calificacion === null) {
    throw new Error("Rating is required.");
  }

  // 3. Validar rango 1–5
  if (calificacion < 1 || calificacion > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  // 4. Validar que el producto exista
  const { data: product, error: productError } = await supabase
    .from("productos")
    .select("id")
    .eq("id", producto_id)
    .single();

  if (productError || !product) {
    throw new Error("Product not found.");
  }

  // 5. Validar que el usuario exista
  const { data: user, error: userError } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id", usuario_id)
    .single();

  if (userError || !user) {
    throw new Error("User not found.");
  }

  // 6. Validar reseña repetida
  const userReviews = await reviewRepository.getByUserId(usuario_id);
  const alreadyReviewed = userReviews.some(
    (r) => r.producto_id === producto_id
  );

  if (alreadyReviewed) {
    throw new Error("User has already reviewed this product.");
  }

  // 7. Auto-asignar fecha si no viene
  if (!data.fecha_reseña) {
    data.fecha_reseña = new Date().toISOString();
  }

  // 8. Crear la reseña
  return await reviewRepository.create(data);
}

,

  async update(id, updates) {
    return await reviewRepository.update(id, updates);
  },

  async delete(id) {
    return await reviewRepository.delete(id);
  },


  async getAverageRatingByProduct(producto_id) {
  return await reviewRepository.getAverageRatingByProduct(producto_id);
}
,


async hasUserReviewed(usuario_id, producto_id) {
  const userReviews = await reviewRepository.getByUserId(usuario_id);
  const alreadyReviewed = userReviews.some(
    (r) => r.producto_id === producto_id
  );
  return alreadyReviewed;
}

};
