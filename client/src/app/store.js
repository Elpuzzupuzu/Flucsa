// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

// Slices
import productsReducer from "../features/products/productsSlice";
import adminProductsReducer from "../features/products/adminProductsSlice";
import userReducer from "../features/user/usersSlice"; // <- NUEVO
import wishlistReducer from "../features/wishlist/wishListSlice"; // <- NUEVO


export const store = configureStore({
  reducer: {
    products: productsReducer,
    adminProducts: adminProductsReducer,
    user: userReducer, // <- agregado
      wishlist: wishlistReducer, // <- agregado
  },
});
