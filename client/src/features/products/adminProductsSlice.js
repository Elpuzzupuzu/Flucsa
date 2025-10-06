import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH productos
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
        error.response?.data || "Error al obtener productos"
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

      // 1️⃣ Subir imagen si hay un archivo nuevo
      if (file) {
        const formData = new FormData();
        formData.append("imagen", file);

        console.log("📤 Subiendo imagen al backend:", file.name);
        const uploadResponse = await api.post("/products/upload-image", formData); 
        // ✅ No headers manuales

        imageUrl = uploadResponse.data.imageUrl;
        console.log("✅ Imagen subida, URL:", imageUrl);
      }

      // 2️⃣ Preparar payload final
      const payloadToSend = {
        ...updates,
        imagen: imageUrl,
      };

      console.log("📤 Enviando actualización de producto:", payloadToSend);
      const response = await api.put(`/products/${id}`, payloadToSend);
      console.log("✅ Respuesta backend update:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar producto"
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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAdminProducts
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
        state.error = action.payload;
      })
      // updateAdminProduct
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        if (!action.payload) return;
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminProductsSlice.reducer;
