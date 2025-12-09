// src/features/facturas/facturasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================

// Obtener facturas de usuario con paginación y filtros
export const fetchFacturas = createAsyncThunk(
  "facturas/fetchFacturas",
  async ({ page = 1, pageSize = 10, filter = 'default', date = null }, thunkAPI) => {
    try {
      const params = { page, pageSize, filter };
      if (date) params.date = date;

      const response = await api.get("/facturas", { params });
      return response.data; // { ok, data, total, page, pageSize, totalPages }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error al obtener facturas" }
      );
    }
  }
);

// ===============================
// Slice
// ===============================

const facturasSlice = createSlice({
  name: "facturas",
  initialState: {
    items: [],
    loading: true,
    error: null,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    total: 0,
    filter: 'default',
    date: null,
  },
  reducers: {
    clearFacturas: (state) => {
      state.items = [];
      state.loading = true;
      state.error = null;
      state.page = 1;
      state.totalPages = 0;
      state.total = 0;
      state.filter = 'default';
      state.date = null;
    },
    setFacturasFilter: (state, action) => {
      const { filter, date } = action.payload;
      state.filter = filter ?? 'default';
      state.date = date ?? null;
      state.page = 1; // reiniciar paginado al cambiar filtro
    },
    setFacturasPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacturas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacturas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchFacturas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });
  }
});

export const { clearFacturas, setFacturasFilter, setFacturasPage } = facturasSlice.actions;
export default facturasSlice.reducer;
