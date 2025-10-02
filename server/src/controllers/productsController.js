import { ProductsService } from "../services/productsService.js";

export const ProductsController = {
  // Listar todos los productos
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductsService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  // Obtener un producto por ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductsService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  // Crear un nuevo producto
  async createProduct(req, res, next) {
    try {
      const newProduct = await ProductsService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  // Actualizar un producto
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductsService.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  // Eliminar un producto
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductsService.deleteProduct(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
};
