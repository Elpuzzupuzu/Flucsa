import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/products?page=${page}&limit=${limit}&timestamp=${Date.now()}`
      );
      return { ...response.data, page, limit }; // incluimos page y limit
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener productos"
      );
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
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al agregar producto"
      );
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
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar producto"
      );
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,    // total de productos
    page: 1,     // página actual
    limit: 10,   // cantidad por página
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
        state.items = action.payload.products; // productos
        state.total = action.payload.total;    // total de productos
        state.page = action.payload.page;      // página actual
        state.limit = action.payload.limit || state.limit; // limit
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += 1; // actualizamos total
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
