import { ProductsService } from "../services/productsService.js";

export const ProductsController = {
  async getAllProducts(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      console.log("📄 Parámetros de paginación:", { page, limit });

      const products = await ProductsService.getAllProducts(Number(page), Number(limit));

      if (!products || products.products.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("❌ Error detallado al obtener productos:", error);
      next({
        message: error.message || "Ocurrió un error al obtener productos",
        status: 500,
        stack: error.stack,
      });
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductsService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const newProduct = await ProductsService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

// Controller - actualizar producto
async updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await ProductsService.updateProduct(id, updates);

    if (error) throw new Error(error.message);

    // Extraemos el primer elemento para enviar como objeto plano
    const updatedProduct = Array.isArray(data) ? data[0] : data;

    res.json(updatedProduct); // ✅ ahora React recibe un objeto
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    next({
      message: error.message || "Error al actualizar producto",
      status: 500,
      stack: error.stack,
    });
  }
}
,
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductsService.deleteProduct(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  },
};
