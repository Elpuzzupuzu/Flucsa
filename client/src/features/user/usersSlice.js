// src/features/user/usersSlice.js
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

/**
 * NUEVA THUNK: Verifica la sesión persistente (Ajustada para silenciar 401/403).
 */
export const checkAuthStatus = createAsyncThunk(
    "user/checkAuthStatus",
    async (_, thunkAPI) => {
      try {
        const response = await api.get("/users/profile"); 
        return response.data; 
      } catch (error) {
        const status = error.response?.status;
        
        // 💥 CAMBIO CRUCIAL AQUÍ 💥
        // Si el error es 401 (Unauthorized) o 403 (Forbidden), es un error esperado.
        if (status === 401 || status === 403) {
            // Devolvemos un objeto especial para que el extraReducer lo ignore
            // y limpie el estado sin mostrar un error.
            return thunkAPI.rejectWithValue({ expected: true, status });
        }
        
        // Para cualquier otro error (ej: 500 Internal Server Error)
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
        // En caso de error del backend, forzamos el logout local.
        console.error("Error al limpiar cookies en el servidor. Forzando logout local.", error);
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
  },
  reducers: {
    // El 'logout' síncrono ahora solo limpia el estado. (Sin cambios)
    logoutSuccess: (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // registerUser (Sin cambios)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload); 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })
      
      // loginUser (Sin cambios)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.error = null; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // checkAuthStatus (Persistencia)
      .addCase(checkAuthStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.user = formatUserPayload(action.payload);
          state.error = null; 
      })
      // 💥 CAMBIO CLAVE EN REJECTED 💥
      .addCase(checkAuthStatus.rejected, (state, action) => {
          state.loading = false;
          
          // Si el payload tiene 'expected: true', ignoramos el error y solo limpiamos.
          if (action.payload?.expected === true) {
              state.user = null; // Limpieza normal de no-sesión
              state.error = null; // ⬅️ IMPORTANTE: Silenciamos el error
          } else {
              // Si es un error inesperado (ej: 500, network error)
              state.user = null; 
              state.error = action.payload?.error || "Error de conexión/servidor";
          }
      })

      // logoutUser (Sin cambios)
      .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.loading = false;
          state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
          state.user = null;
          state.loading = false;
          state.error = "Error al cerrar sesión, se limpió el estado local.";
      })
      
      // fetchUserProfile (Sin cambios)
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
      });
  },
});

export const { logoutSuccess } = userSlice.actions;
export default userSlice.reducer;