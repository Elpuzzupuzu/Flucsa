import express from 'express';
import { WishlistController } from '../controllers/wishlistController.js';

const router = express.Router();

// Obtener lista de deseos de un usuario
router.get('/:userId', WishlistController.getWishlist);

// Agregar producto a la lista de deseos
router.post('/add', WishlistController.addProduct);

// Eliminar producto de la lista de deseos
router.delete('/remove', WishlistController.removeProduct);

// Marcar o desmarcar producto como deseado
router.patch('/toggle', WishlistController.toggleProduct);

export default router;
