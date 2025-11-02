import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Asumimos que 'api' es tu instancia de axios configurada
import api from "../../api/axios"; 

// ===============================
// THUNKS (Acciones Asíncronas)
// ===============================

/**
 * Genera una nueva cotización a partir del carrito activo del usuario.
 * POST /api/quotations
 */
export const createQuotation = createAsyncThunk(
    "quotation/createQuotation",
    async (_, thunkAPI) => {
        try {
            const response = await api.post('/quotations');
            return response.data.cotizacion; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al generar la cotización"
            );
        }
    }
);

/**
 * Obtiene la lista de cotizaciones del usuario o todas (si es admin).
 * GET /api/quotations
 */
export const fetchQuotations = createAsyncThunk(
    "quotation/fetchQuotations",
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/quotations');
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al obtener las cotizaciones"
            );
        }
    }
);

/**
 * 🚨 NUEVO THUNK: Obtiene los detalles de una cotización específica.
 * GET /api/quotations/:id
 */
export const fetchQuotationById = createAsyncThunk(
    "quotation/fetchQuotationById",
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/quotations/${id}`);
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al obtener el detalle de la cotización"
            );
        }
    }
);


/**
 * Actualiza el estado de una cotización específica.
 * PATCH /api/quotations/:id/status
 */
export const updateQuotationStatus = createAsyncThunk(
    "quotation/updateQuotationStatus",
    async ({ id, estado }, thunkAPI) => {
        try {
            const response = await api.patch(`/quotations/${id}/status`, { estado });
            return response.data.cotizacion; // Retorna la cotización actualizada
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al actualizar el estado de la cotización"
            );
        }
    }
);

/**
 * Elimina o cancela una cotización (la lógica se maneja en el servicio del backend).
 * DELETE /api/quotations/:id
 */
export const deleteQuotation = createAsyncThunk(
    "quotation/deleteQuotation",
    async (quotationId, thunkAPI) => {
        try {
            await api.delete(`/quotations/${quotationId}`);
            return quotationId; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al eliminar/cancelar la cotización"
            );
        }
    }
);

// ===============================
// SLICE
// ===============================

const quotationSlice = createSlice({
    name: "quotation",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearQuotationError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- createQuotation ---
            .addCase(createQuotation.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(createQuotation.fulfilled, (state, action) => {
                state.loading = false;
                state.list.unshift(action.payload); // Agrega al inicio
            })
            .addCase(createQuotation.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo la creación de la cotización";
            })
            
            // --- fetchQuotations ---
            .addCase(fetchQuotations.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(fetchQuotations.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload; // Reemplaza la lista
            })
            .addCase(fetchQuotations.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo al cargar las cotizaciones";
            })

            // --- fetchQuotationById (NUEVO HANDLER) ---
            .addCase(fetchQuotationById.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(fetchQuotationById.fulfilled, (state, action) => {
                state.loading = false;
                const detailedQuotation = action.payload;
                
                // Actualiza o agrega el ítem detallado a la lista (útil para la caché y el detalle)
                const index = state.list.findIndex(q => q.id === detailedQuotation.id);
                if (index !== -1) {
                    state.list[index] = detailedQuotation;
                } else {
                    state.list.push(detailedQuotation);
                }
            })
            .addCase(fetchQuotationById.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo al cargar el detalle";
            })
            
            // --- updateQuotationStatus ---
            .addCase(updateQuotationStatus.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(updateQuotationStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedQuotation = action.payload;
                const index = state.list.findIndex(q => q.id === updatedQuotation.id);
                if (index !== -1) {
                    state.list[index] = updatedQuotation;
                }
            })
            .addCase(updateQuotationStatus.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo al actualizar el estado";
            })

            // --- deleteQuotation ---
            .addCase(deleteQuotation.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(deleteQuotation.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter(q => q.id !== deletedId);
            })
            .addCase(deleteQuotation.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo la eliminación/cancelación";
            });
    },
});

export const { clearQuotationError } = quotationSlice.actions;

export default quotationSlice.reducer;