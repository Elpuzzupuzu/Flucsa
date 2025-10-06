import { supabase } from "../config/supabaseClient.js";

export const ProductsRepository = {
  // Obtener todos los productos
  // async getAllProducts() {
  //   const { data, error } = await supabase
  //     .from("productos")
  //     .select("*");
  //   if (error) throw error;
  //   return data;
  // },

  async getAllProducts() {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .limit(50); // Limita la consulta a 50 registros
    if (error) throw error;
    return data;
  },




  // Obtener un producto por ID
async getProductById(id) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id);

  if (error) throw error;
  return data[0] || null;
}
,

  // Crear un nuevo producto
  async createProduct(product) {
    const { data, error } = await supabase
      .from("productos")
      .insert([product])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Actualizar un producto
async updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("productos")
    .update(updates)
    .eq("id", id)
    .select(); // devuelve array de objetos

  if (error) throw error;

  if (!data || data.length === 0) return null; // si no actualizó nada
  return data[0]; // devolver el primer objeto actualizado
}
,



  // Eliminar un producto
  async deleteProduct(id) {
    const { data, error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
