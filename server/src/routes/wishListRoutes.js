import express from 'express';
import { WishlistController } from '../controllers/wishlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Todas las rutas protegidas por token de acceso
router.use(authMiddleware);

// Obtener lista de deseos de un usuario
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;

  // Validación: solo el usuario dueño puede ver su wishlist
  if (req.user.id !== userId) {
    return res.status(403).json({ error: "No puedes acceder a la lista de deseos de otro usuario" });
  }
  WishlistController.getWishlist(req, res, next);
});

// Agregar producto a la lista de deseos
router.post('/add', (req, res, next) => {
  const { userId } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "No puedes agregar productos a la lista de otro usuario" });
  }
  WishlistController.addProduct(req, res, next);
});

// Eliminar producto de la lista de deseos
router.delete('/remove', (req, res, next) => {
  const { userId } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "No puedes eliminar productos de la lista de otro usuario" });
  }
  WishlistController.removeProduct(req, res, next);
});

// Marcar o desmarcar producto como deseado
router.patch('/toggle', (req, res, next) => {
  const { userId } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ error: "No puedes modificar la lista de deseos de otro usuario" });
  }
  WishlistController.toggleProduct(req, res, next);
});

export default router;
