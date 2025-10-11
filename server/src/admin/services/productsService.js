import { ProductsRepository } from "../../repositories/productsRepository.js";

export const ProductsService = {
  // Obtener productos paginados
  async getAllProducts(page = 1, limit = 10) {
    const { products, total } = await ProductsRepository.getProductsPaginated(page, limit);
    return { products, total };
  },

  async getProductById(id) {
    const product = await ProductsRepository.getProductById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  },

 async updateProduct(id, updates) {
  const existing = await ProductsRepository.getProductById(id);
  if (!existing) throw new Error("Producto no encontrado");

  const result = await ProductsRepository.updateProduct(id, updates);

  // Supongamos que result.data es el array devuelto por Supabase
  if (Array.isArray(result.data)) {
    return result.data[0]; // ✅ devolvemos un objeto plano
  }

  return result; // en caso de que no sea array
}
,


  async deleteProduct(id) {
    const existing = await ProductsRepository.getProductById(id);
    if (!existing) throw new Error("Producto no encontrado");
    return await ProductsRepository.deleteProduct(id);
  },
};
