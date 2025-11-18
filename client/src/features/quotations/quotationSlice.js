import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Asumimos que 'api' es tu instancia de axios configurada
import api from "../../api/axios"; 
// 🚨 Nota: La importación de 'supabase' ha sido eliminada.

// ===============================
// THUNKS (Acciones Asíncronas)
// ===============================

/**
 * Genera una nueva cotización a partir del carrito activo del usuario.
 */
export const createQuotation = createAsyncThunk(
    "quotation/createQuotation",
    async (_, thunkAPI) => {
        try {
            console.log("➡️ [API] Intentando POST a '/quotations' para crear cotización."); 
            
            const response = await api.post('/quotations');
            
            console.log("⬅️ [API ÉXITO] Cotización creada. Respuesta recibida:", response.data); 
            
            // Retornamos el payload para actualizar Redux de forma instantánea.
            return response.data.cotizacion; 
        } catch (error) {
            console.error("❌ [API ERROR] Falló la creación de la cotización. Error:", error.response?.data || error.message); 
            
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al generar la cotización"
            );
        }
    }
);

/**
 * Obtiene la lista de cotizaciones del usuario o todas (si es admin).
 * Acepta parámetros de paginación y búsqueda.
 */
export const fetchQuotations = createAsyncThunk(
    "quotation/fetchQuotations",
    //  CAMBIO CLAVE: Acepta un objeto de parámetros (page, pageSize, search)
    async (params = {}, thunkAPI) => {
        try {
            // Construir la Query String (ej: ?page=1&pageSize=10&search=pendiente)
            const queryString = new URLSearchParams(params).toString();
            
            // Adjuntar la Query String a la URL
            const url = `/quotations${queryString ? '?' + queryString : ''}`;
            
            const response = await api.get(url);
            
            // El backend ahora devuelve { data: [...], pagination: {...} }
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al obtener las cotizaciones"
            );
        }
    }
);

/**
 * Obtiene los detalles de una cotización específica.
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
 * Elimina o cancela una cotización.
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

// 🚨 Thunk startRealtimeSubscription ha sido eliminado 🚨


// ===============================
// SLICE
// ===============================

const quotationSlice = createSlice({
    name: "quotation",
    initialState: {
        list: [],
        // 💡 CAMBIO CLAVE: Nuevo objeto para almacenar los metadatos de paginación
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
            state.list=[];
            // Opcional: También podrías resetear pagination aquí si fuera necesario
        },
        /**
         *  NUEVO: Añade una cotización recibida de Socket.IO (INSERT).
         * Usado por el Custom Hook para el evento 'nueva_cotizacion'.
         */
        quotationAdded: (state, action) => {
            const newQuotation = action.payload;
            const exists = state.list.some(q => q.id === newQuotation.id); 
            if (!exists) {
                // Solo añadir si el usuario está en la primera página o si la lógica lo permite
                state.list.unshift(newQuotation); 
            }
        },
        /**
         * Actualiza una cotización (Usado en fulfilled o por Socket.IO/Admin).
         */
        quotationUpdated: (state, action) => {
            const updatedQuotation = action.payload;
            const index = state.list.findIndex(q => q.id === updatedQuotation.id);
            if (index !== -1) { state.list[index] = updatedQuotation; }
        },
        /**
         * Elimina una cotización por ID (DELETE).
         */
        quotationRemoved: (state, action) => {
            const deletedData = action.payload; 
            const deletedId = deletedData.id || deletedData; 
            state.list = state.list.filter(q => q.id !== deletedId);
        },
    },
    extraReducers: (builder) => {
        builder
            // --- createQuotation ---
            .addCase(createQuotation.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(createQuotation.fulfilled, (state, action) => {
                state.loading = false;
                quotationSlice.caseReducers.quotationAdded(state, action); 
            })
            .addCase(createQuotation.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo la creación de la cotización";
            })
            
            // --- fetchQuotations ---
            .addCase(fetchQuotations.pending, (state) => {
                state.loading = true; state.error = null;
                // state.list = []; // Opcional: limpiar lista al cargar para evitar datos antiguos
            })
            .addCase(fetchQuotations.fulfilled, (state, action) => {
                state.loading = false;
                
                // 💡 CAMBIO CLAVE: Desestructurar la respuesta del backend
                const { data, pagination } = action.payload;

                state.list = data || []; // Asigna la lista paginada
                state.pagination = pagination; // Asigna los metadatos de paginación
            })
            .addCase(fetchQuotations.rejected, (state, action) => {
                state.loading = false; state.error = action.payload || "Fallo al cargar las cotizaciones";
                // Opcional: Limpiar la lista y resetear paginación en caso de error
                state.list = [];
                state.pagination = { totalItems: 0, pageSize: 10, currentPage: 1, totalPages: 1 };
            })

            // --- fetchQuotationById ---
            .addCase(fetchQuotationById.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchQuotationById.fulfilled, (state, action) => {
                state.loading = false;
                quotationSlice.caseReducers.quotationUpdated(state, action);
            })
            .addCase(fetchQuotationById.rejected, (state, action) => { state.loading = false; state.error = action.payload || "Fallo al cargar el detalle"; })
            
            // --- updateQuotationStatus ---
            .addCase(updateQuotationStatus.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateQuotationStatus.fulfilled, (state, action) => {
                state.loading = false;
                quotationSlice.caseReducers.quotationUpdated(state, action);
            })
            .addCase(updateQuotationStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload || "Fallo al actualizar el estado"; })

            // --- deleteQuotation ---
            .addCase(deleteQuotation.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteQuotation.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter(q => q.id !== deletedId);
                // Nota: Para ser 100% preciso, deberías forzar una nueva llamada a fetchQuotations 
                // para rellenar la lista con el siguiente elemento de la página.
            })
            .addCase(deleteQuotation.rejected, (state, action) => { state.loading = false; state.error = action.payload || "Fallo la eliminación/cancelación"; });
    },
});

export const { 
    clearQuotationError, 
    resetQuotationUI, 
    quotationAdded, 
    quotationUpdated,
    quotationRemoved 
} = quotationSlice.actions;

export default quotationSlice.reducer;