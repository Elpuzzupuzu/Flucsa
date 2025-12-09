import { configureStore } from "@reduxjs/toolkit";

// Slices existentes
import productsReducer from "../features/products/productsSlice";
import adminProductsReducer from "../features/products/adminProductsSlice";
import userReducer from "../features/user/usersSlice";
import wishlistReducer from "../features/wishlist/wishListSlice";
import pdfsReducer from "../features/pdfs/pdfSlice";
import cartReducer from "../features/cart/cartSlice";
import quoteReducer from "../features/quotations/quotationSlice";

// Slices adicionales
import mainCategoryReducer from "../features/mainCategory/mainCategorySlice";
import locationReducer from "../features/location/locationSlice";
import subCategoryReducer from "../features/subCategory/subCategorySlice";
import reviewReducer from "../features/reviews/reviewSlice";

// Nuevo slice de facturas
import facturasReducer from "../features/facturas/facturasSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    adminProducts: adminProductsReducer,
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    pdfs: pdfsReducer,
    quotations: quoteReducer,

    mainCategory: mainCategoryReducer,
    location: locationReducer,
    subCategory: subCategoryReducer,

    reviews: reviewReducer,

    // Agregado
    facturas: facturasReducer,
  },
});
