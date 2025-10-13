// src/controllers/wishlistController.js
import { WishlistService } from '../services/wishlistService.js';

export const WishlistController = {
  getWishlist: async (req, res) => {
    try {
      const userId = req.params.userId;
      const wishlist = await WishlistService.getWishlist(userId);
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const result = await WishlistService.addProductToWishlist(userId, productId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  removeProduct: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const result = await WishlistService.removeProductFromWishlist(userId, productId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  toggleProduct: async (req, res) => {
    try {
      const { userId, productId, deseado } = req.body;
      const result = await WishlistService.toggleWishlistProduct(userId, productId, deseado);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
