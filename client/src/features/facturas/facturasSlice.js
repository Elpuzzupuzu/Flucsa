// src/features/facturas/facturasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================

// Obtener facturas con paginación
export const fetchFacturas = createAsyncThunk(
  "facturas/fetchFacturas",
  async ({ page = 1, pageSize = 10, filter = 'default', date = null }, thunkAPI) => {
    try {
      const params = { page, pageSize, filter };
      if (date) params.date = date;

      const response = await api.get("/facturas", { params });
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Error al obtener facturas" }
      );
    }
  }
);


// ===============================
// Crear factura desde cotización
// ===============================
export const createFacturaFromQuotation = createAsyncThunk(
  "facturas/crear",
  async (invoicePayload, thunkAPI) => {
    try {
      console.log("Thunk - Enviando payload:", invoicePayload);

      const response = await api.post("/facturas/crear", invoicePayload);

      console.log("Thunk - Factura creada:", response.data);
      return response.data;   // { ok, message, factura, cotizacion_actualizada }

    } catch (error) {
      console.error("Thunk - Error al crear factura:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al crear la factura"
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

    // paginación
    page: 1,
    pageSize: 10,
    totalPages: 0,
    total: 0,
    filter: 'default',
    date: null,

    // estados de creación de factura
    creatingFactura: false,
    createSuccess: false,
    createError: null,
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
      state.page = 1;
    },

    setFacturasPage: (state, action) => {
      state.page = action.payload;
    },

    clearCreateFacturaState: (state) => {
      state.creatingFactura = false;
      state.createSuccess = false;
      state.createError = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // ===============================
      // Fetch facturas
      // ===============================
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
      })



      // ===============================
      // Crear factura desde cotización
      // ===============================
      .addCase(createFacturaFromQuotation.pending, (state) => {
        state.creatingFactura = true;
        state.createSuccess = false;
        state.createError = null;
      })

      .addCase(createFacturaFromQuotation.fulfilled, (state, action) => {
        state.creatingFactura = false;
        state.createSuccess = true;

        // Insertar la nueva factura al inicio de la lista
        if (action.payload?.factura) {
          state.items.unshift(action.payload.factura);
        }
      })

      .addCase(createFacturaFromQuotation.rejected, (state, action) => {
        state.creatingFactura = false;
        state.createSuccess = false;
        state.createError = action.payload;
      });
  }
});


export const { 
  clearFacturas, 
  setFacturasFilter, 
  setFacturasPage,
  clearCreateFacturaState
} = facturasSlice.actions;

export default facturasSlice.reducer;
