// src/services/wishlistService.js
import { WishlistRepository } from '../repositories/wishlistRepository.js';

export const WishlistService = {
  getWishlist: async (userId) => {
    return await WishlistRepository.getWishlistByUser(userId);
  },

  addProductToWishlist: async (userId, productId) => {
    return await WishlistRepository.addProduct(userId, productId);
  },

  removeProductFromWishlist: async (userId, productId) => {
    return await WishlistRepository.removeProduct(userId, productId);
  },

  toggleWishlistProduct: async (userId, productId, deseado) => {
    return await WishlistRepository.toggleProduct(userId, productId, deseado);
  }
};
