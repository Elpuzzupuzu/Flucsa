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
// 🆕 CREATE producto (con soporte de imagen)
// ===============================

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      let imageUrl = productData.imagen || null;
      const file = productData.file;

      // Subir imagen si hay archivo
      if (file) {
        const formData = new FormData();
        formData.append("imagen", file);
        const uploadResponse = await api.post("/products/upload-image", formData);
        imageUrl = uploadResponse.data.imageUrl;
        console.log("✅ Imagen subida a Cloudinary:", imageUrl);
      }

      // Preparar payload
      const payloadToSend = { ...productData, imagen: imageUrl };
      delete payloadToSend.file; // remover file antes de enviar al backend
      console.log("🚀 Payload enviado al backend:", payloadToSend);

      const response = await api.post("/products", payloadToSend);
      console.log("🟢 Respuesta del backend:", response.data);

      return response.data;
    } catch (error) {
      console.error("💥 Error al crear producto:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Error al crear producto"
      );
    }
  }
);


// ===============================
// 🆕 DELETE producto por ID
// ===============================
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      // Usamos DELETE para eliminar
      await api.delete(`/products/${id}`);
      return id; // Devolvemos el ID para saber qué eliminar del estado
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al eliminar producto"
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
      })

      // 🆕 createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Agregamos el nuevo producto al inicio del array de items
        state.items.unshift(action.payload);
        // Incrementamos el total de productos
        state.total += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al crear producto";
      })
      
      // 🆕 deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        // Filtramos el producto eliminado del estado
        state.items = state.items.filter((p) => p.id !== deletedId);
        state.total -= 1;
        // Si el producto eliminado era el seleccionado, lo limpiamos
        if (state.selectedProduct?.id === deletedId) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al eliminar producto";
      });
  },
});

export const { clearError, clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;