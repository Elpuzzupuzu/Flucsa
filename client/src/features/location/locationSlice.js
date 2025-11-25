// src/store/slices/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// FETCH all locations
// ===============================
export const fetchLocations = createAsyncThunk(
  "locations/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/location`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener ubicaciones"
      );
    }
  }
);

// ===============================
// FETCH location by ID
// ===============================
export const fetchLocationById = createAsyncThunk(
  "locations/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/location/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al obtener una ubicación"
      );
    }
  }
);

// ===============================
// CREATE location
// ===============================
export const createLocation = createAsyncThunk(
  "locations/create",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`/location`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al crear ubicación"
      );
    }
  }
);

// ===============================
// UPDATE location
// ===============================
export const updateLocation = createAsyncThunk(
  "locations/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await api.put(`/location/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al actualizar ubicación"
      );
    }
  }
);

// ===============================
// DELETE location
// ===============================
export const deleteLocation = createAsyncThunk(
  "locations/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/location/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al eliminar ubicación"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================
const locationSlice = createSlice({
  name: "locations",
  initialState: {
    items: [],
    selectedLocation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedLocation: (state) => {
      state.selectedLocation = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocation = action.payload;

        const exists = state.items.some((loc) => loc.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.map((loc) =>
          loc.id === action.payload.id ? action.payload : loc
        );

        if (state.selectedLocation?.id === action.payload.id) {
          state.selectedLocation = action.payload;
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload;
        state.items = state.items.filter((loc) => loc.id !== id);

        if (state.selectedLocation?.id === id) {
          state.selectedLocation = null;
        }
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedLocation } = locationSlice.actions;

export default locationSlice.reducer;
