import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; 

// ===============================
// THUNKS
// ===============================

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

export const fetchQuotations = createAsyncThunk(
    "quotation/fetchQuotations",
    async (params = {}, thunkAPI) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `/quotations${queryString ? '?' + queryString : ''}`;
            const response = await api.get(url);
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al obtener las cotizaciones"
            );
        }
    }
);

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

export const updateQuotationStatus = createAsyncThunk(
    "quotation/updateQuotationStatus",
    async ({ id, estado }, thunkAPI) => {
        try {
            const response = await api.patch(`/quotations/${id}/status`, { estado });
            return response.data.cotizacion;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al actualizar el estado"
            );
        }
    }
);

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
        currentQuotation: null,   // <-- NUEVO: detalle de cotización
        pagination: {
            totalItems: 0,
            pageSize: 5,
            currentPage: 1,
            totalPages: 1,
        },
        loading: false,
        error: null,
    },
    reducers: {
        clearQuotationError: (state) => {
            state.error = null;
        },
        resetQuotationUI: (state) => {
            state.loading = false;
            state.error = null;
            state.list = [];
            state.currentQuotation = null;  // <-- limpiar detalle
        },
        quotationAdded: (state, action) => {
            const newQuotation = action.payload;
            const exists = state.list.some(q => q.id === newQuotation.id);
            if (!exists) {
                state.list.unshift(newQuotation); 
            }
        },
        quotationUpdated: (state, action) => {
            const updatedQuotation = action.payload;
            const index = state.list.findIndex(q => q.id === updatedQuotation.id);
            if (index !== -1) {
                state.list[index] = updatedQuotation;
            }
        },
        quotationRemoved: (state, action) => {
            const deletedId = action.payload.id || action.payload;
            state.list = state.list.filter(q => q.id !== deletedId);
        },
    },
    extraReducers: (builder) => {
        builder
            // --- createQuotation ---
            .addCase(createQuotation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuotation.fulfilled, (state, action) => {
                state.loading = false;
                quotationSlice.caseReducers.quotationAdded(state, action);
            })
            .addCase(createQuotation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- fetchQuotations ---
            .addCase(fetchQuotations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuotations.fulfilled, (state, action) => {
                state.loading = false;
                const { data, pagination } = action.payload;
                state.list = data || [];
                state.pagination = pagination || state.pagination;
            })
            .addCase(fetchQuotations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.list = [];
                state.pagination = {
                    totalItems: 0,
                    pageSize: 10,
                    currentPage: 1,
                    totalPages: 1
                };
            })

            // --- fetchQuotationById ---
            .addCase(fetchQuotationById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentQuotation = null;
            })
            .addCase(fetchQuotationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentQuotation = action.payload;  // <-- detalle correcto
            })
            .addCase(fetchQuotationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.currentQuotation = null;
            })

            // --- updateQuotationStatus ---
            .addCase(updateQuotationStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuotationStatus.fulfilled, (state, action) => {
                state.loading = false;
                quotationSlice.caseReducers.quotationUpdated(state, action);
            })
            .addCase(updateQuotationStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- deleteQuotation ---
            .addCase(deleteQuotation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuotation.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter(q => q.id !== deletedId);
            })
            .addCase(deleteQuotation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export reducers
export const { 
    clearQuotationError, 
    resetQuotationUI, 
    quotationAdded, 
    quotationUpdated,
    quotationRemoved 
} = quotationSlice.actions;

export default quotationSlice.reducer;
