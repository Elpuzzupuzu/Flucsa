import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Asumo que esta es la instancia de Axios configurada

// ===============================
// THUNKS ASÍNCRONOS
// ===============================

// 1. Obtener el carrito completo del usuario
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/cart");
            return response.data;
        } catch (error) {
            // Si el carrito está vacío, el backend podría devolver 200 con array vacío, 
            // pero si hay error de auth/server, lo manejamos.
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || "Error al cargar el carrito."
            );
        }
    }
);

// 2. Agregar un producto al carrito (o incrementar cantidad)
export const addItemToCart = createAsyncThunk(
    "cart/addItemToCart",
    async (itemData, thunkAPI) => {
        try {
            // itemData debe contener { producto_id, cantidad (opcional) }
            const response = await api.post("/cart/items", itemData);
            
            // El backend devuelve { message, item: nuevo/actualizado }
            return response.data.item; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || "Error al agregar el producto al carrito."
            );
        }
    }
);

// 3. Actualizar la cantidad de un artículo
// Recibe { itemId, cantidad }
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ itemId, cantidad }, thunkAPI) => {
        try {
            const response = await api.put(`/cart/items/${itemId}`, { cantidad });

            // El backend devuelve { message, item: actualizado } o un mensaje de eliminación si cantidad <= 0
            if (response.data.item) {
                return response.data.item; 
            } else {
                // Si la cantidad fue 0 o menos, el servicio lo eliminó.
                // Devolvemos el itemId para que el reducer pueda eliminarlo del estado.
                return { id: itemId, deleted: true };
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || "Error al actualizar la cantidad del artículo."
            );
        }
    }
);

// 4. Eliminar un artículo específico del carrito
export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async (itemId, thunkAPI) => {
        try {
            await api.delete(`/cart/items/${itemId}`);
            // Devolvemos el ID para que el reducer sepa qué eliminar
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
            // No devuelve datos, solo confirmación de éxito
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
        items: [],       // Array de productos en el carrito
        loading: false,  // Estado de carga para operaciones asíncronas
        error: null,     // Mensaje de error
        successMessage: null, // Mensaje de éxito
    },
    reducers: {
        // Limpia el estado del carrito al hacer logout forzado
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
            // --- FETCH CART (GET) ---
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                // La respuesta es un array de items del carrito
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- ADD ITEM TO CART (POST) ---
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Producto agregado/actualizado en el carrito.";
                
                const newItem = action.payload;
                const existingIndex = state.items.findIndex(item => item.producto_id === newItem.producto_id);

                if (existingIndex !== -1) {
                    // Si ya existe, reemplazamos el item para actualizar la cantidad
                    state.items[existingIndex] = newItem;
                } else {
                    // Si es nuevo, lo agregamos al inicio (o al final, según la preferencia)
                    state.items.unshift(newItem); 
                }
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- UPDATE ITEM QUANTITY (PUT) ---
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                
                if (action.payload.deleted) {
                    // Lógica de eliminación si la cantidad era <= 0
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                    state.successMessage = "Artículo eliminado del carrito.";
                } else {
                    // Lógica de actualización normal
                    const updatedItem = action.payload;
                    const index = state.items.findIndex(item => item.id === updatedItem.id);
                    if (index !== -1) {
                        state.items[index] = updatedItem;
                    }
                    state.successMessage = "Cantidad actualizada.";
                }
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // --- REMOVE CART ITEM (DELETE) ---
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const itemId = action.payload;
                // Filtramos el array para eliminar el artículo
                state.items = state.items.filter(item => item.id !== itemId);
                state.successMessage = "Artículo eliminado del carrito.";
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- CLEAR CART (DELETE ALL) ---
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.items = []; // Vacía completamente el array
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