import { supabase } from "../config/supabaseClient.js";

export const ProductsRepository = {
  // Obtener productos con paginación
//  async getProductsPaginated(page = 1, limit = 10) {
//   const start = (page - 1) * limit;
//   const end = start + limit - 1;

//   const { data: products, count, error } = await supabase
//     .from("productos")
//     .select("*", { count: "exact" })
//     .order("nombre", { ascending: true })
//     .range(start, end);

//   if (error) throw new Error("Error al obtener productos: " + error.message);

//   return {
//     products: products || [],
//     total: count || 0,
//   };
// },
async getProductsPaginated(page = 1, limit = 10, mainCategoryId, subCategoryId, searchQuery) {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = supabase
        .from("productos")
        .select("*", { count: "exact" })
        .order("nombre", { ascending: true });

    // 1. Aplicar Filtro de Categoría Principal
    //    Este filtro usa la FK 'categoria_principal_id' de la tabla 'productos'.
    if (mainCategoryId) {
        query = query.eq("categoria_principal_id", mainCategoryId);
    }
    
    // 2. Aplicar Filtro de Subcategoría
    //    Este filtro usa la FK 'subcategoria_id' de la tabla 'productos'.
    if (subCategoryId) {
        query = query.eq("subcategoria_id", subCategoryId);
    }

    // 3. Aplicar Búsqueda de Texto
    if (searchQuery) {
        const searchPattern = `%${searchQuery}%`;
        
        // La búsqueda se realiza en las columnas 'nombre', 'descripcion' y 'codigo'
        // de la tabla 'productos'.
        query = query.or(
            `nombre.ilike.${searchPattern},descripcion.ilike.${searchPattern},codigo.ilike.${searchPattern}`
        );
    }

    // 4. Ejecutar la consulta y aplicar la Paginación
    const { data: products, count, error } = await query.range(start, end); 

    if (error) throw new Error("Error al obtener productos: " + error.message);

    return {
        products: products || [],
        total: count || 0,
    };
},










//// Search Products 

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

/// Search By Filter



async filterProducts({ categories = [], priceRange = '' }) {
  let query = supabase.from("productos").select("*");

  // Filtrar por categorías
  if (categories.length > 0) {
    query = query.in("categoria_principal_id", categories);
  }

  // Filtrar por rango de precio
  if (priceRange) {
    const [min, max] = priceRange.split("-");
    if (priceRange.endsWith("+")) {
      query = query.gte("precio", parseFloat(priceRange.replace("+", "")));
    } else if (min && max) {
      query = query.gte("precio", parseFloat(min)).lte("precio", parseFloat(max));
    }
  }

  const { data, error } = await query.order("nombre", { ascending: true });

  if (error) throw new Error("Error al filtrar productos: " + error.message);
  return { products: data || [] };
},


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
