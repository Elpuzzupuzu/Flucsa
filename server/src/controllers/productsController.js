import { ProductsService } from "../services/productsService.js";

export const ProductsController = {

// async getAllProducts(req, res, next) {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     console.log("📄 Parámetros de paginación:", { page, limit }); // 👈 Log útil

//     const products = await ProductsService.getAllProducts(Number(page), Number(limit));

//     if (!products || products.products.length === 0) {
//       return res.status(404).json({ message: "No se encontraron productos" });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("❌ Error detallado al obtener productos:", error); // 👈 muestra el error real

//     next({
//       message: error.message || "Ocurrió un error al obtener productos",
//       status: 500,
//       stack: error.stack, // 👈 esto ayuda a depurar
//     });
//   }
// },





// Buscar productos por nombre


async getAllProducts(req, res, next) {
    try {
        const { 
            page = 1, 
            limit = 10,
            mainCategoryId, 
            subCategoryId,
            searchQuery // 👈 Nuevo: Término de búsqueda
        } = req.query;

        console.log("📄 Parámetros de consulta:", { page, limit, mainCategoryId, subCategoryId, searchQuery });

        // Pasar el nuevo parámetro al Servicio
        const products = await ProductsService.getAllProducts(
            Number(page), 
            Number(limit), 
            mainCategoryId, 
            subCategoryId,
            searchQuery 
        );

        if (!products || products.products.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos con estos criterios" });
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





async searchProducts(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") return res.status(400).json({ message: "Query vacío" });

    const results = await ProductsService.searchProducts(q.trim());
    res.json(results);
  } catch (error) {
    next(error);
  }
},



// search by filters


async filterProducts(req, res, next) {
  try {
    const filters = req.body; // { categories: [], priceRange: '0-100' }
    const results = await ProductsService.filterProducts(filters);

    if (!results || results.products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos con los filtros especificados" });
    }

    res.status(200).json(results);
  } catch (error) {
    next({
      message: error.message || "Error al filtrar productos",
      status: 500,
      stack: error.stack,
    });
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
