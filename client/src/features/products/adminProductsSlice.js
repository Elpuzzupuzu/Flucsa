import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH productos paginados
// ===============================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 14 } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/products?page=${page}&limit=${limit}&timestamp=${Date.now()}`
      );
      return { ...response.data, page, limit };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener productos"
      );
    }
  }
);

// ===============================
// FETCH producto por ID
// ===============================
export const fetchAdminProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener producto"
      );
    }
  }
);

// ===============================
// UPDATE producto (con soporte de imagen)
// ===============================
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates, file }, thunkAPI) => {
    try {
      let imageUrl = updates.imagen || null;

      // Subir imagen si hay archivo
      if (file) {
        const formData = new FormData();
        formData.append("imagen", file);
        const uploadResponse = await api.post("/products/upload-image", formData);
        imageUrl = uploadResponse.data.imageUrl;
      }

      // Enviar JSON plano al backend
      const payloadToSend = { ...updates, imagen: imageUrl };
      const response = await api.put(`/products/${id}`, payloadToSend);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al actualizar producto"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    total: 0,
    page: 1,
    limit: 14,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 14;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      })

      // fetchProductById
      .addCase(fetchAdminProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        // Agregar a items si no existe
        const exists = state.items.find((p) => p.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(fetchAdminProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export const { clearError, clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
