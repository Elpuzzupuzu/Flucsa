// src/features/wishlist/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================

// Obtener lista de deseos de un usuario
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener lista de deseos"
      );
    }
  }
);

// Agregar producto a la wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProduct",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await api.post("/wishlist/add", { userId, productId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al agregar producto a wishlist"
      );
    }
  }
);

// Eliminar producto de la wishlist
export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProduct",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await api.delete("/wishlist/remove", {
        data: { userId, productId },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al eliminar producto de wishlist"
      );
    }
  }
);

// Marcar/desmarcar producto como deseado
export const toggleWishlistProduct = createAsyncThunk(
  "wishlist/toggleProduct",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await api.patch("/wishlist/toggle", { userId, productId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar producto de wishlist"
      );
    }
  }
);

// ===============================
// Slice
// ===============================
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })
      // addProductToWishlist
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.error = action.payload.error || action.payload;
      })
      // removeProductFromWishlist
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.producto_id !== action.payload.producto_id
        );
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.error = action.payload.error || action.payload;
      })
      // toggleWishlistProduct
      .addCase(toggleWishlistProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.producto_id === action.payload.producto_id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(toggleWishlistProduct.rejected, (state, action) => {
        state.error = action.payload.error || action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
