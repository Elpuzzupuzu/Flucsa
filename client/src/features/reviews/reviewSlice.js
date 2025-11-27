import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// =============================================================
// THUNKS (Sin cambios aquí, se mantienen las funciones)
// =============================================================

// 🔹 Obtener todas las reseñas
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/reviews");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Error fetching reviews");
    }
  }
);

// 🔹 Obtener reseña por ID
export const fetchReviewById = createAsyncThunk(
  "reviews/fetchReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Error fetching review");
    }
  }
);

// 🔹 Obtener reseñas de un producto
export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/producto/${productId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error fetching product reviews"
      );
    }
  }
);

// 🔹 Obtener reseñas de un usuario
export const fetchReviewsByUser = createAsyncThunk(
  "reviews/fetchReviewsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/usuario/${userId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error fetching user reviews"
      );
    }
  }
);

// 🔹 Verificar si un usuario ya reseñó un producto
export const checkHasReviewed = createAsyncThunk(
  "reviews/checkHasReviewed",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/has-reviewed/${userId}/${productId}`);
      return res.data.hasReviewed ?? res.data.reviewed ?? false;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error checking review status"
      );
    }
  }
);

// 🔹 Obtener promedio de calificaciones de un producto
export const fetchProductRating = createAsyncThunk(
  "reviews/fetchProductRating",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reviews/promedio/${productId}`);
      return res.data.promedio;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Error getting rating");
    }
  }
);

// 🔹 Crear reseña
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`/reviews`, formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error creating review"
      );
    }
  }
);

// 🔹 Actualizar reseña
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/reviews/${id}`, formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error updating review"
      );
    }
  }
);

// 🔹 Eliminar reseña
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/reviews/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Error deleting review"
      );
    }
  }
);

// =============================================================
// SLICE
// =============================================================

const initialState = {
  items: [],
  selectedReview: null,
  
  // 📝 CAMBIO: Propiedades de carga y error separadas
  loading: false, // para operaciones generales (ej: crear/actualizar)
  loadingReviews: false, // para fetching listas de reseñas
  loadingRating: false, // para fetching del rating
  error: null,

  // Extras para front
  productRating: null, // promedio de calificación
  totalReviews: 0,     // 📝 AÑADIDO: Conteo total de reseñas
  hasReviewed: false, // si el usuario ya reseñó
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedReview: (state) => {
      state.selectedReview = null;
    },
    clearHasReviewed: (state) => {
      state.hasReviewed = false;
    },
    clearProductRating: (state) => {
      state.productRating = null;
      state.totalReviews = 0; // También limpiamos el conteo
    },
  },
  extraReducers: (builder) => {
    builder
      // =============================================================
      // FETCH ALL
      // =============================================================
      .addCase(fetchReviews.pending, (state) => {
        state.loadingReviews = true; // 📝 CAMBIO: Usar loadingReviews
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.items = action.payload || [];
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.error = action.payload;
      })

      // =============================================================
      // FETCH BY ID
      // =============================================================
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReview = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================================================
      // FETCH BY PRODUCT (El foco de la corrección)
      // =============================================================
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loadingReviews = true; // 📝 CAMBIO: Usar loadingReviews
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.items = action.payload || [];
        state.totalReviews = action.payload?.length || 0; // 📝 AÑADIDO: Guardar el total
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.error = action.payload;
      })

      // =============================================================
      // FETCH BY USER
      // =============================================================
      .addCase(fetchReviewsByUser.pending, (state) => {
        state.loadingReviews = true; // 📝 CAMBIO: Usar loadingReviews
        state.error = null;
      })
      .addCase(fetchReviewsByUser.fulfilled, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.items = action.payload || [];
      })
      .addCase(fetchReviewsByUser.rejected, (state, action) => {
        state.loadingReviews = false; // 📝 CAMBIO: Usar loadingReviews
        state.error = action.payload;
      })

      // =============================================================
      // CHECK IF USER REVIEWED
      // =============================================================
      .addCase(checkHasReviewed.pending, (state) => {
        state.error = null;
      })
      .addCase(checkHasReviewed.fulfilled, (state, action) => {
        state.hasReviewed = !!action.payload;
      })
      .addCase(checkHasReviewed.rejected, (state, action) => {
        state.error = action.payload;
      })

      // =============================================================
      // AVERAGE RATING
      // =============================================================
      .addCase(fetchProductRating.pending, (state) => {
        state.loadingRating = true; // 📝 CAMBIO: Usar loadingRating
        state.error = null;
      })
      .addCase(fetchProductRating.fulfilled, (state, action) => {
        state.loadingRating = false; // 📝 CAMBIO: Usar loadingRating
        state.productRating = action.payload;
      })
      .addCase(fetchProductRating.rejected, (state, action) => {
        state.loadingRating = false; // 📝 CAMBIO: Usar loadingRating
        state.error = action.payload;
      })

      // =============================================================
      // CREATE
      // =============================================================
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        // Agregamos la nueva reseña y actualizamos el total
        state.items.push(action.payload);
        state.totalReviews = state.items.length; // 📝 AÑADIDO: Actualizar el total
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================================================
      // UPDATE
      // =============================================================
      .addCase(updateReview.pending, (state) => {
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((r) => (r.id === updated.id ? updated : r));
        if (state.selectedReview?.id === updated.id) {
          state.selectedReview = updated;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.error = action.payload;
      })

      // =============================================================
      // DELETE
      // =============================================================
      .addCase(deleteReview.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((r) => r.id !== id);
        state.totalReviews = state.items.length; // 📝 AÑADIDO: Actualizar el total
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSelectedReview,
  clearHasReviewed,
  clearProductRating,
} = reviewSlice.actions;
export default reviewSlice.reducer;