import express from "express";
import { ProductsController } from "../controllers/productsController.js";

const router = express.Router();

// === 1. RUTAS FIJAS / CONSULTAS ESPECÍFICAS (Ordenadas por especificidad) ===

// 1.1 Top Ventas (NUEVA RUTA)
router.get("/top-ventas", ProductsController.getTopSellingProductsController); 

// 1.2 Búsqueda de productos por nombre (ruta fija)
router.get("/search", ProductsController.searchProducts); 

// 1.3 Filtrado de productos por cuerpo (POST)
router.post("/filter", ProductsController.filterProducts);


// === 2. RUTAS DE COLECCIÓN Y DINÁMICAS (CRUD) ===

// 2.1 Obtener todos los productos (Paginación base)
router.get("/", ProductsController.getAllProducts); 

// 2.2 Obtener un producto por ID (Ruta dinámica)
router.get("/:id", ProductsController.getProductById);

// 2.3 Creación, Actualización y Eliminación
router.post("/", ProductsController.createProduct);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

export default router;