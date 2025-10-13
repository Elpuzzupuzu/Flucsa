// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================

// Registro de usuario
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al registrar usuario"
      );
    }
  }
);

// Login de usuario
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/users/login", credentials);
      return response.data; // { user, accessToken, refreshToken }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al iniciar sesión"
      );
    }
  }
);

// Obtener perfil de usuario
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener perfil"
      );
    }
  }
);

// ===============================
// Slice
// ===============================
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
