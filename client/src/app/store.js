// // src/app/store.js
// import { configureStore } from "@reduxjs/toolkit";

// // Slices
// import productsReducer from "../features/products/productsSlice";
// import adminProductsReducer from "../features/products/adminProductsSlice";
// import userReducer from "../features/user/usersSlice"; // <- NUEVO
// import wishlistReducer from "../features/wishlist/wishListSlice"; // <- NUEVO


// export const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     adminProducts: adminProductsReducer,
//     user: userReducer, // <- agregado
//       wishlist: wishlistReducer, // <- agregado
//   },
// });

// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

// Slices
import productsReducer from "../features/products/productsSlice";
import adminProductsReducer from "../features/products/adminProductsSlice";
import userReducer from "../features/user/usersSlice";
import wishlistReducer from "../features/wishlist/wishListSlice";
import pdfsReducer from "../features/pdfs/pdfSlice"; // ✅ Importar

export const store = configureStore({
  reducer: {
    products: productsReducer,
    adminProducts: adminProductsReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    // ✅ CORRECCIÓN: Agregar el slice de PDFs al store
    pdfs: pdfsReducer,
  },
});
