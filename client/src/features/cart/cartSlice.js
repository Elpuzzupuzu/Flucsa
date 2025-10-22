import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// THUNKS ASÍNCRONOS
// ===============================

// 1. Obtener el carrito completo del usuario
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/cart");
      // Se espera array de items con item.producto
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al cargar el carrito."
      );
    }
  }
);

// 2. Agregar producto o incrementar cantidad
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (itemData, thunkAPI) => {
    try {
      const response = await api.post("/cart/items", itemData);
      return response.data.item;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al agregar el producto al carrito."
      );
    }
  }
);

// 3. Actualizar cantidad de un artículo
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ itemId, cantidad }, thunkAPI) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { cantidad });
      // Si la API devuelve el item actualizado, lo retornamos.
      if (response.data.item) return response.data.item;
      // Si el backend manejó la eliminación (cantidad = 0), indicamos que fue eliminado.
      return { id: itemId, deleted: true }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al actualizar la cantidad del artículo."
      );
    }
  }
);

// 4. Eliminar un artículo específico
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, thunkAPI) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      return itemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al eliminar el artículo del carrito."
      );
    }
  }
);

// 5. Vaciar todo el carrito
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await api.delete("/cart");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al vaciar el carrito."
      );
    }
  }
);

// ===============================
// SLICE
// ===============================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
    clearCartMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH CART ---
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- ADD ITEM (CORRECCIÓN APLICADA) ---
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Producto agregado/actualizado en el carrito.";

        const newItem = action.payload;
        const existingIndex = state.items.findIndex(
          // Buscar por producto_id para saber si es un artículo ya en el carrito
          (item) => item.producto_id === newItem.producto_id
        );

        if (existingIndex !== -1) {
          // ✅ CORREGIDO: Reemplazar completamente el objeto para asegurar la inmutabilidad
          // y la actualización de todas las propiedades (ej. cantidad, id del item de carrito).
          state.items[existingIndex] = newItem; 
        } else {
          state.items.unshift(newItem);
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- UPDATE ITEM (CORRECCIÓN APLICADA) ---
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.deleted) {
          // Si el servidor indica que se eliminó (cantidad = 0)
          state.items = state.items.filter((item) => item.id !== action.payload.id);
          state.successMessage = "Artículo eliminado del carrito.";
        } else {
          const updatedItem = action.payload;
          // Buscar por el ID del item de carrito
          const index = state.items.findIndex((item) => item.id === updatedItem.id);
          if (index !== -1) {
            // ✅ CORREGIDO: Reemplazar completamente el objeto para evitar mezclas parciales.
            state.items[index] = updatedItem; 
          }
          state.successMessage = "Cantidad actualizada.";
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- REMOVE ITEM ---
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Filtrar el ítem que coincide con el itemId (payload)
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.successMessage = "Artículo eliminado del carrito.";
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CLEAR CART ---
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.successMessage = "Carrito vaciado exitosamente.";
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState, clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;