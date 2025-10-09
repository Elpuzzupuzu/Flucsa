import { ProductsService } from "../services/productsService.js";

export const ProductsController = {
  // Listar todos los productos
// async getAllProducts(req, res, next) {
//   try {
//     const products = await ProductsService.getAllProducts();

//     if (!products || products.length === 0) {
//       // No se encontraron productos
//       return res.status(404).json({ message: "No se encontraron productos" });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("❌ Error al obtener productos:", error);

//     // Creamos un error más específico para el middleware
//     let customError = { 
//       message: "Ocurrió un error al obtener productos", 
//       status: 500 
//     };

//     // Diferenciamos tipos de error
//     if (error.name === "SequelizeConnectionError" || error.name === "MongoNetworkError") {
//       customError.message = "Error de conexión a la base de datos";
//       customError.status = 503;
//     } else if (error.name === "ValidationError") {
//       customError.message = "Error de validación";
//       customError.details = error.message;
//       customError.status = 400;
//     }

//     next(customError); // Pasamos el error personalizado al middleware
//   }
// },


async getAllProducts(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;

    console.log("📄 Parámetros de paginación:", { page, limit }); // 👈 Log útil

    const products = await ProductsService.getAllProducts(Number(page), Number(limit));

    if (!products || products.products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error detallado al obtener productos:", error); // 👈 muestra el error real

    next({
      message: error.message || "Ocurrió un error al obtener productos",
      status: 500,
      stack: error.stack, // 👈 esto ayuda a depurar
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
