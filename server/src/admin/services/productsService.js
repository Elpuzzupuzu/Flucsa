import { supabase } from "../../../src/config/supabaseClient.js";
import { ProductsRepository } from "../../repositories/productsRepository.js";

// Obtener todos los productos
// export const getAllProducts = async () => {
//   const { data, error } = await supabase
//     .from("productos")
//     .select("*")
//     .order("nombre", { ascending: true })
//     .limit(50); // Limita a 50 registros

//   if (error) throw new Error("Error al obtener productos: " + error.message);
//   return data;
// };


export const getAllProducts = async (page = 1, limit = 10) => {
  try {
    const { products, total } = await ProductsRepository.getProductsPaginated(page, limit);
    return { products, total };
  } catch (error) {
    throw new Error("Error al obtener productos: " + error.message);
  }
};



// Obtener producto por ID
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
};

// Crear producto
export const createProduct = async (productData) => {
  const newProduct = {
    nombre: productData.nombre,
    descripcion: productData.descripcion || "",
    precio: productData.precio || 0,
    imagen: productData.imagen || null, // ahora se espera la URL ya subida
    categoria_principal_id: productData.categoria_principal_id || null,
    subcategoria_id: productData.subcategoria_id || null,
    ubicacion_id: productData.ubicacion_id || null,
    codigo: productData.codigo || null,
    marca: productData.marca || null,
    existencias: productData.existencias || 0,
    disponible: productData.disponible !== undefined ? productData.disponible : true,
    ventas_anuales: productData.ventas_anuales || 0,
  };

  const { data, error } = await supabase
    .from("productos")
    .insert([newProduct])
    .select()
    .single();

  if (error) throw new Error("Error al crear producto: " + error.message);
  return data;
};

// Actualizar producto
export const updateProduct = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("productos")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single(); // ahora retornamos un solo objeto actualizado

  if (error) {
    console.error("❌ Error en supabase update:", error);
    return null;
  }

  console.log("Producto actualizado en service:", data);
  return data;
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("❌ Error al eliminar producto:", error);
    return false;
  }

  return data.length > 0;
};
