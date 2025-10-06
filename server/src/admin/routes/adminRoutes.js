import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// ===============================
// RUTAS DE PRODUCTOS
// ===============================
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);

// Ahora la creación y actualización ya no suben la imagen directamente
router.post('/products', productsController.createProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

// ===============================
// RUTA DE SUBIDA DE IMAGEN
// ===============================
router.post('/upload-image', upload.single('imagen'), productsController.uploadProductImage);

export default router;
