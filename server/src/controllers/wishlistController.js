// src/controllers/wishlistController.js
import { WishlistService } from '../services/wishlistService.js';

export const WishlistController = {

  getWishlist: async (req, res) => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({ ok: false, message: "userId es requerido" });
      }

      const wishlist = await WishlistService.getWishlist(userId);

      return res.status(200).json({
        ok: true,
        message: "Wishlist obtenida correctamente",
        data: wishlist
      });

    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ ok: false, message: "userId y productId son requeridos" });
      }

      const result = await WishlistService.addProductToWishlist(userId, productId);

      return res.status(201).json({
        ok: true,
        message: "Producto agregado a la wishlist",
        data: result
      });

    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  removeProduct: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ ok: false, message: "userId y productId son requeridos" });
      }

      const result = await WishlistService.removeProductFromWishlist(userId, productId);

      return res.status(200).json({
        ok: true,
        message: "Producto eliminado de la wishlist",
        data: result
      });

    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  toggleProduct: async (req, res) => {
    try {
      const { userId, productId, deseado } = req.body;

      if (!userId || !productId || typeof deseado !== "boolean") {
        return res.status(400).json({ ok: false, message: "Datos inválidos" });
      }

      const result = await WishlistService.toggleWishlistProduct(userId, productId, deseado);

      return res.status(200).json({
        ok: true,
        message: "Estado de wishlist actualizado",
        data: result
      });

    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  }
};
