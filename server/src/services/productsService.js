import { ProductsRepository } from "../repositories/productsRepository.js";

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

  async createProduct(productData) {
    if (!productData.nombre || !productData.categoria_principal_id || !productData.subcategoria_id || !productData.ubicacion_id) {
      throw new Error("Faltan campos obligatorios para crear el producto");
    }
    return await ProductsRepository.createProduct(productData);
  },

  async updateProduct(id, updates) {
    const existing = await ProductsRepository.getProductById(id);
    if (!existing) throw new Error("Producto no encontrado");
    return await ProductsRepository.updateProduct(id, updates);
  },

  async deleteProduct(id) {
    const existing = await ProductsRepository.getProductById(id);
    if (!existing) throw new Error("Producto no encontrado");
    return await ProductsRepository.deleteProduct(id);
  },
};
