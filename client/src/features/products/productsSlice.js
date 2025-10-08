import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      // Evitar caché agregando un timestamp
      const response = await api.get(`/products?timestamp=${Date.now()}`);
      return response.data;
    } catch (error) {
      // Mensaje predeterminado
      let message = "Error al obtener productos";

      // Si el servidor respondió con un error
      if (error.response) {
        message = error.response.data?.message || `Error del servidor (${error.response.status})`;
      }
      // Si no hubo respuesta (problema de conexión)
      else if (error.request) {
        message = "No se pudo conectar al servidor. Revisa tu conexión.";
      }
      // Otros errores inesperados
      else if (error.message) {
        message = `Error inesperado: ${error.message}`;
      }

      return thunkAPI.rejectWithValue({ message, status: error.response?.status || null });
    }
  }
);


export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, thunkAPI) => {
    try {
      const response = await api.post("/products", newProduct);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al agregar producto");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates, file }, thunkAPI) => {
    try {
      const dataToSend = new FormData();

      if (updates.nombre) dataToSend.append("nombre", updates.nombre);
      if (updates.descripcion) dataToSend.append("descripcion", updates.descripcion);
      if (updates.precio) dataToSend.append("precio", updates.precio);
      if (file) dataToSend.append("imagen", file);

      const response = await api.put(`/products/${id}`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al actualizar producto");
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
