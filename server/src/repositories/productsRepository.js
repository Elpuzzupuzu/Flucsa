import { supabase } from "../config/supabaseClient.js";

export const ProductsRepository = {
  // Obtener productos con paginación
 async getProductsPaginated(page = 1, limit = 10) {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data: products, count, error } = await supabase
    .from("productos")
    .select("*", { count: "exact" })
    .order("nombre", { ascending: true })
    .range(start, end);

  if (error) throw new Error("Error al obtener productos: " + error.message);

  return {
    products: products || [],
    total: count || 0,
  };
},

async searchProducts(query) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .ilike("nombre", `%${query}%`)
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return { products: data || [] };
}
,




  // Obtener un producto por ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data || null;
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

  // Actualizar producto
  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from("productos")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data || null;
  },

  // Eliminar producto
  async deleteProduct(id) {
    const { data, error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data || null;
  },
};
