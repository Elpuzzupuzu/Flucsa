// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
