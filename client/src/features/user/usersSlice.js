import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================

// Registro de usuario (Sin cambios)
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

// Login de usuario (Sin cambios)
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/users/login", credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al iniciar sesión"
      );
    }
  }
);

// Verifica la sesión persistente (Sin cambios)
export const checkAuthStatus = createAsyncThunk(
  "user/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/profile");
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        return thunkAPI.rejectWithValue({ expected: true, status });
      }
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Logout (Sin cambios)
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/users/logout");
      return true;
    } catch (error) {
      console.error(
        "Error al limpiar cookies en el servidor. Forzando logout local.",
        error
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Obtener perfil completo (Sin cambios)
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

// 🚀 NUEVA THUNK: Actualizar información de perfil
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updateData, thunkAPI) => {
    try {
      const response = await api.put("/users/profile", updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar perfil"
      );
    }
  }
);

// 🚀 NUEVA THUNK: Actualizar contraseña
export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await api.put("/users/password", passwordData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al cambiar contraseña"
      );
    }
  }
);

// ===============================
// Slice
// ===============================

// Función auxiliar para construir el objeto de usuario con la propiedad 'name' (Sin cambios)
const formatUserPayload = (userData) => {
  if (userData.nombre && userData.apellido) {
    return {
      ...userData,
      name: `${userData.nombre} ${userData.apellido}`,
    };
  }
  return userData;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    successMessage: null, // 🚀 Añadimos estado para mensajes de éxito
  },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.successMessage = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.successMessage = "Registro exitoso. ¡Bienvenido!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.error = null;
        state.successMessage = "Inicio de sesión exitoso.";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // checkAuthStatus
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.expected === true) {
          state.user = null;
          state.error = null;
        } else {
          state.user = null;
          state.error = action.payload?.error || "Error de conexión/servidor";
        }
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.successMessage = "Sesión cerrada correctamente.";
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.error = "Error al cerrar sesión, se limpió el estado local.";
      })

      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // 🚀 updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.successMessage = "¡Perfil actualizado exitosamente!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // 🚀 updateUserPassword
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage =
          "Contraseña cambiada exitosamente. Por seguridad, por favor vuelve a iniciar sesión.";
        state.user = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      });
  },
});

export const { logoutSuccess, clearSuccessMessage } = userSlice.actions;
export default userSlice.reducer;
