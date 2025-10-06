// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

// Slices
import productsReducer from "../features/products/productsSlice";
import adminProductsReducer from "../features/products/adminProductsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,        // Parte pública (usuarios)
    adminProducts: adminProductsReducer, // Panel de administración
  },
});
