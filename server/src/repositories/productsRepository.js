import { supabase } from "../config/supabaseClient.js";

export const ProductsRepository = {
  // Obtener todos los productos
  async getAllProducts() {
    const { data, error } = await supabase
      .from("productos")
      .select("*");
    if (error) throw error;
    return data;
  },

  // Obtener un producto por ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

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
      .select()
      .single();
    if (error) throw error;
    return data;
  },

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
