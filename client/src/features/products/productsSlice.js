import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
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
        error.response?.data || "Error al obtener productos"
      );
    }
  }
);

// Nuevo thunk para búsqueda
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, thunkAPI) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data; // esperamos un array de productos
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al buscar productos"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}?timestamp=${Date.now()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener el producto"
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

// ===============================
// Slice
// ===============================
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
    searchResults: [], // <-- para resultados del dropdown
    searchLoading: false,
    searchError: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchError = null;
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
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit || state.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
          state.total += 1;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += 1;
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

export const { clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;
