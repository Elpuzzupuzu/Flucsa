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
      return response.data; // { ok, message, data }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error al obtener lista de deseos" }
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
      return response.data; // { ok, message, data }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error al agregar producto" }
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
        error.response?.data || { message: "Error al eliminar producto" }
      );
    }
  }
);

// Marcar/desmarcar producto como deseado
export const toggleWishlistProduct = createAsyncThunk(
  "wishlist/toggleProduct",
  async ({ userId, productId, deseado }, thunkAPI) => {
    try {
      const response = await api.patch("/wishlist/toggle", {
        userId,
        productId,
        deseado,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error al actualizar producto" }
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
    loading: true, // ⬅️ ARREGLO CRÍTICO: inicia en true después de recargar
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
      state.loading = true; // ⬅️ Esto evita errores al hacer logout → login
    },
  },
  extraReducers: (builder) => {
    builder
      // ===============================
      // fetchWishlist
      // ===============================
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      })

      // ===============================
      // addProductToWishlist
      // ===============================
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      })

      // ===============================
      // removeProductFromWishlist
      // ===============================
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        const removedId = action.payload.data.producto_id;
        state.items = state.items.filter(item => item.producto_id !== removedId);
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      })

      // ===============================
      // toggleWishlistProduct
      // ===============================
      .addCase(toggleWishlistProduct.fulfilled, (state, action) => {
        const newItem = action.payload.data;
        const index = state.items.findIndex(i => i.producto_id === newItem.producto_id);

        if (index !== -1) {
          state.items[index] = newItem;
        } else {
          state.items.push(newItem);
        }
      })
      .addCase(toggleWishlistProduct.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
