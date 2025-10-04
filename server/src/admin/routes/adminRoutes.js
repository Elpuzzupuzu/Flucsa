// src/admin/routes/adminRoutes.js
import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';

const router = Router();

// Rutas de productos
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

export default router;
