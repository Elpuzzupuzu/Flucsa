// src/store/slices/subCategorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH all subcategories
// ===============================
export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/sub-category`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener subcategorías"
      );
    }
  }
);

// ===============================
// FETCH subcategory by ID
// ===============================
export const fetchSubCategoryById = createAsyncThunk(
  "subCategories/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/sub-category/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener la subcategoría"
      );
    }
  }
);

// ===============================
// CREATE subcategory
// ===============================
export const createSubCategory = createAsyncThunk(
  "subCategories/create",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`/sub-category`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al crear subcategoría"
      );
    }
  }
);

// ===============================
// UPDATE subcategory
// ===============================
export const updateSubCategory = createAsyncThunk(
  "subCategories/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await api.put(`/sub-category/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al actualizar subcategoría"
      );
    }
  }
);

// ===============================
// DELETE subcategory
// ===============================
export const deleteSubCategory = createAsyncThunk(
  "subCategories/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/sub-category/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al eliminar subcategoría"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================
const subCategorySlice = createSlice({
  name: "subCategories",
  initialState: {
    items: [],
    selectedSubCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedSubCategory: (state) => {
      state.selectedSubCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchSubCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubCategory = action.payload;

        const exists = state.items.some((c) => c.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(fetchSubCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );

        if (state.selectedSubCategory?.id === action.payload.id) {
          state.selectedSubCategory = action.payload;
        }
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload;
        state.items = state.items.filter((c) => c.id !== deletedId);

        if (state.selectedSubCategory?.id === deletedId) {
          state.selectedSubCategory = null;
        }
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedSubCategory } = subCategorySlice.actions;

export default subCategorySlice.reducer;
