
import { configureStore } from "@reduxjs/toolkit";

// Slices
import productsReducer from "../features/products/productsSlice";
import adminProductsReducer from "../features/products/adminProductsSlice";
import userReducer from "../features/user/usersSlice";
import wishlistReducer from "../features/wishlist/wishListSlice";
import pdfsReducer from "../features/pdfs/pdfSlice"; // ✅ Importar
import cartReducer from "../features/cart/cartSlice"
import quoteReducer from "../features/quotations/quotationSlice"


export const store = configureStore({
  reducer: {
    products: productsReducer,
    adminProducts: adminProductsReducer,
    user: userReducer,
    cart :cartReducer,
    wishlist: wishlistReducer,
    pdfs: pdfsReducer,
    quotations : quoteReducer
  },
});
