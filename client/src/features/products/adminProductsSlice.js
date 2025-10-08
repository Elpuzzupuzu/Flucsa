import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH todos los productos
// ===============================
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/products");
      console.log("📦 Productos obtenidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener productos"
      );
    }
  }
);

// ===============================
// FETCH un solo producto
// ===============================
export const fetchAdminProductById = createAsyncThunk(
  "adminProducts/fetchAdminProductById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}`);
      console.log("📦 Producto obtenido:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener producto:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener producto"
      );
    }
  }
);

// ===============================
// ACTUALIZAR producto con soporte de imagen
// ===============================
export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateAdminProduct",
  async ({ id, updates, file }, thunkAPI) => {
    try {
      let imageUrl = updates.imagen || null;

      // Subir imagen si hay archivo nuevo
      if (file) {
        const formData = new FormData();
        formData.append("imagen", file);

        console.log("📤 Subiendo imagen al backend:", file.name);
        const uploadResponse = await api.post("/products/upload-image", formData);
        imageUrl = uploadResponse.data.imageUrl;
        console.log("✅ Imagen subida, URL:", imageUrl);
      }

      const payloadToSend = { ...updates, imagen: imageUrl };
      console.log("📤 Enviando actualización de producto:", payloadToSend);

      const response = await api.put(`/products/${id}`, payloadToSend);
      console.log("✅ Respuesta backend update:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al actualizar producto"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================
const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    selectedProduct: null, // para fetchAdminProductById
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
      // ===== Fetch all =====
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error desconocido al obtener productos";
      })

      // ===== Fetch one =====
      .addCase(fetchAdminProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        const exists = state.products.find((p) => p.id === action.payload.id);
        if (!exists) {
          state.products.push(action.payload);
        }
      })
      .addCase(fetchAdminProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error desconocido al obtener producto";
      })

      // ===== Update =====
      .addCase(updateAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error desconocido al actualizar producto";
      });
  },
});

export const { clearError, clearSelectedProduct } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
