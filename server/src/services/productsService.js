import { ProductsRepository } from "../repositories/productsRepository.js";

export const ProductsService = {
  // Obtener todos los productos
  async getAllProducts() {
    const products = await ProductsRepository.getAllProducts();
    // Aquí puedes filtrar, ordenar o hacer transformaciones si quieres
    return products;
  },

  // Obtener un producto por ID
  async getProductById(id) {
    const product = await ProductsRepository.getProductById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  },

  // Crear un nuevo producto
  async createProduct(productData) {
    // Validaciones básicas antes de insertar
    if (!productData.nombre || !productData.categoria_principal_id || !productData.subcategoria_id || !productData.ubicacion_id) {
      throw new Error("Faltan campos obligatorios para crear el producto");
    }
    return await ProductsRepository.createProduct(productData);
  },

  // Actualizar un producto existente
 async updateProduct(id, updates) {
  const existing = await ProductsRepository.getProductById(id);
  if (!existing) throw new Error("Producto no encontrado");
  const updated = await ProductsRepository.updateProduct(id, updates);
  console.log("Producto actualizado en service:", updated); // log de verificación
  return updated;
}

,

  // Eliminar un producto
  async deleteProduct(id) {
    const existing = await ProductsRepository.getProductById(id);
    if (!existing) throw new Error("Producto no encontrado");
    return await ProductsRepository.deleteProduct(id);
  }
};
