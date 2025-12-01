import express from 'express';
import { WishlistController } from '../controllers/wishlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Todas las rutas deben estar autenticadas
router.use(authMiddleware);

// Middleware reutilizable para validar propiedad de la wishlist
const validateOwner = (req, res, next) => {
  const userId = req.params.userId || req.body.userId;

  if (!userId) {
    return res.status(400).json({ ok: false, message: "userId es requerido" });
  }

  if (req.user.id !== userId) {
    return res.status(403).json({
      ok: false,
      message: "No puedes acceder o modificar la lista de deseos de otro usuario"
    });
  }

  next();
};

// ======================================================
// 📌 Obtener lista de deseos
// GET /api/wishlist/:userId
// ======================================================
router.get('/:userId', validateOwner, WishlistController.getWishlist);

// ======================================================
// ➕ Agregar producto
// POST /api/wishlist/add
// body: { userId, productId }
// ======================================================
router.post('/add', validateOwner, WishlistController.addProduct);

// ======================================================
// ❌ Eliminar producto
// DELETE /api/wishlist/remove
// body: { userId, productId }
// ======================================================
router.delete('/remove', validateOwner, WishlistController.removeProduct);

// ======================================================
// 🔄 Toggle deseado/no-deseado
// PATCH /api/wishlist/toggle
// body: { userId, productId, deseado }
// ======================================================
router.patch('/toggle', validateOwner, WishlistController.toggleProduct);

export default router;
