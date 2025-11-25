// src/store/slices/mainCategorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH all main categories
// ===============================
export const fetchMainCategories = createAsyncThunk(
  "mainCategory/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/mainCategory`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener categorías principales"
      );
    }
  }
);

// ===============================
// FETCH main category by ID
// ===============================
export const fetchMainCategoryById = createAsyncThunk(
  "mainCategory/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/mainCategory/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener la categoría principal"
      );
    }
  }
);

// ===============================
// CREATE main category
// ===============================
export const createMainCategory = createAsyncThunk(
  "mainCategory/create",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`/mainCategory`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al crear categoría principal"
      );
    }
  }
);

// ===============================
// UPDATE main category
// ===============================
export const updateMainCategory = createAsyncThunk(
  "mainCategory/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await api.put(`/mainCategory/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al actualizar categoría principal"
      );
    }
  }
);

// ===============================
// DELETE main category
// ===============================
export const deleteMainCategory = createAsyncThunk(
  "mainCategory/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/mainCategory/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al eliminar categoría principal"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================
const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState: {
    items: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchMainCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;

        // añadir si no existe en items
        const exists = state.items.some((c) => c.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(fetchMainCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateMainCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMainCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );

        if (state.selectedCategory?.id === action.payload.id) {
          state.selectedCategory = action.payload;
        }
      })
      .addCase(updateMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteMainCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;

        state.items = state.items.filter((c) => c.id !== id);

        if (state.selectedCategory?.id === id) {
          state.selectedCategory = null;
        }
      })
      .addCase(deleteMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedCategory } = mainCategorySlice.actions;

export default mainCategorySlice.reducer;
