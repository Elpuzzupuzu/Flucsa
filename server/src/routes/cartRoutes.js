import express from 'express';
import { CarritoController } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Todas las rutas del carrito requieren autenticación
router.use(authMiddleware);

// Rutas del Carrito de Compras
// 1. Obtener el carrito completo del usuario
// GET /api/carrito
router.get('/', CarritoController.getCarrito);

// 2. Agregar un producto al carrito (o incrementar cantidad)
// POST /api/carrito/items
router.post('/items', CarritoController.addItem);

// 3. Actualizar la cantidad de un artículo específico
// PUT /api/carrito/items/:itemId
router.put('/items/:itemId', CarritoController.updateItemQuantity);

// 4. Eliminar un artículo específico del carrito
// DELETE /api/carrito/items/:itemId
router.delete('/items/:itemId', CarritoController.removeItem);

// 5. Vaciar todo el carrito del usuario
// DELETE /api/carrito
router.delete('/', CarritoController.clearCarrito);

export default router;