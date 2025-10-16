import express from "express";
import { ProductsController } from "../controllers/productsController.js";

const router = express.Router();

// Endpoints CRUD
router.get("/", ProductsController.getAllProducts);
router.get("/search", ProductsController.searchProducts);
router.get("/:id", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:id", ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

export default router;
