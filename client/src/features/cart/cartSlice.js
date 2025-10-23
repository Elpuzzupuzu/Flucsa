import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// THUNKS ASÍNCRONOS (No necesitan cambios, solo limpieza de comentarios)
// ===============================

// 1. Obtener el carrito completo del usuario
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      // Ruta: GET /carrito
      const response = await api.get("/carrito"); 
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
      // Ruta: POST /carrito/items
      const response = await api.post("/carrito/items", itemData);
      // Backend retorna: { item: item_completo_anidado }
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
      // Ruta: PUT /carrito/items/:itemId
      const response = await api.put(`/carrito/items/${itemId}`, { cantidad });
      
      // El backend devuelve { item: item_anidado } o si eliminó, { message } y status 200.
      // Basado en el controlador, si la cantidad era <= 0, el servicio devuelve { id, deleted: true } al controlador,
      // y el controlador retorna un mensaje. Aquí asumimos que el controlador devuelve:
      if (response.data.item) return response.data.item;
      
      // Si el controlador eliminó el ítem (cant <= 0) y no devolvió un 'item',
      // asumimos que fue una eliminación exitosa del ítem con ese ID
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
      // Ruta: DELETE /carrito/items/:itemId
      await api.delete(`/carrito/items/${itemId}`);
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
      // Ruta: DELETE /carrito
      await api.delete("/carrito");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Error al vaciar el carrito."
      );
    }
  }
);

// ===============================
// SLICE (Ajuste en addItemToCart)
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
        // El backend ahora garantiza que cada ítem tiene la data de producto anidada.
        state.items = action.payload; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- ADD ITEM (Corregido para buscar por el ID del ítem, no solo producto_id) ---
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Producto agregado/actualizado en el carrito.";

        const newItem = action.payload;
        
        // La búsqueda debe hacerse por el ID de la tabla carrito_items (newItem.id) 
        // si existe, o por producto_id si se está insertando un nuevo producto.
        // Usaremos el producto_id como identificador para la lógica de reemplazo.
        const existingIndex = state.items.findIndex(
           // Usamos el ID del producto como el identificador único en la interfaz
          (item) => item.producto_id === newItem.producto_id 
        );

        if (existingIndex !== -1) {
          // Reemplaza el ítem existente por la nueva versión completa de la API
          state.items[existingIndex] = newItem; 
        } else {
          // Si es un ítem nuevo, lo añade al principio
          state.items.unshift(newItem);
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- UPDATE ITEM (Mantiene la lógica de reemplazo/eliminación) ---
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.deleted) {
          // Si el servicio indicó eliminación
          state.items = state.items.filter((item) => item.id !== action.payload.id);
          state.successMessage = "Artículo eliminado del carrito.";
        } else {
          // Si el servicio devolvió el ítem actualizado
          const updatedItem = action.payload;
          const index = state.items.findIndex((item) => item.id === updatedItem.id);
          if (index !== -1) {
            // Reemplaza el ítem por la nueva versión completa
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