// client/src/features/user/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Configurado con withCredentials: true

// ===============================
// Helper: Formatear payload completo (CORREGIDO)
// ===============================
const formatUserPayload = (apiResponse) => {
  // 1. Identificar si la respuesta tiene la estructura anidada o plana.
  // La respuesta del login es: { accessToken, user: { ...datos } }
  // La respuesta de checkAuth/fetchUserProfile podría ser solo: { ...datos }
  const userData = apiResponse.user || apiResponse;

  // Si no hay datos relevantes, retornamos null
  if (!userData || !userData.id) return null;

  // 2. Retornar el objeto plano y añadir isAdmin
  return {
    // Campos esenciales para tu app
    id: userData.id,
    nombre: userData.nombre,
    apellido: userData.apellido,
    correo: userData.correo,

    // Campos de rol y perfil
    rol: userData.rol,
    foto_perfil: userData.foto_perfil,

    // CAMBIO CRUCIAL: Agregar la propiedad isAdmin 🚨
    isAdmin: userData.rol === "admin",

    // Campos compuestos o de autenticación
    name:
      userData.nombre && userData.apellido
        ? `${userData.nombre} ${userData.apellido}`
        : undefined,

    // Aseguramos que el accessToken siempre se incluya si existe en el payload principal
    accessToken: apiResponse.accessToken || null,
  };
};

// ===============================
// THUNKS
// ===============================

// Registro de usuario
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al registrar usuario");
    }
  }
);

// Login de usuario
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/users/login", credentials);
      // Guardamos el accessToken si el backend lo devuelve
      if (response.data?.accessToken) {
        thunkAPI.dispatch(setAccessToken(response.data.accessToken));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al iniciar sesión");
    }
  }
);

// Verifica la sesión persistente (F5) - Ruta Ligera
export const checkAuthStatus = createAsyncThunk(
  "user/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/auth");
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

// Logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/users/logout");
      return true;
    } catch (error) {
      console.error("Error al limpiar cookies en el servidor. Forzando logout local.", error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Obtener perfil completo
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/full-profile");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al obtener perfil");
    }
  }
);




// Actualizar perfil
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updateData, thunkAPI) => {
    try {
      const response = await api.put("/users/profile", updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al actualizar perfil");
    }
  }
);

// Cambiar contraseña
export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await api.put("/users/password", passwordData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error al cambiar contraseña");
    }
  }
);

// Renovar Access Token usando refresh token
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/users/refresh");
      // Guardamos accessToken si viene en la respuesta
      if (response.data?.accessToken) {
        thunkAPI.dispatch(setAccessToken(response.data.accessToken));
      }
      return response.data;
    } catch (error) {
      // Si falla, el usuario se desloguea
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data || "Error al renovar token");
    }
  }
);


// =============================================================
// 🔹 Obtener el historial de compras del usuario
// =============================================================
export const fetchUserPurchaseHistory = createAsyncThunk(
  "user/fetchUserPurchaseHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/purchase-history/${userId}`);

      return res.data.data; // historial completo
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener historial"
      );
    }
  }
);

// 🔹 Obtener reseñas del usuario
export const fetchUserReviews = createAsyncThunk(
  "user/fetchUserReviews",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/reviews/${userId}`);
      return res.data.data; // array de reseñas
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error al obtener reseñas");
    }
  }
);


// ===============================
// SLICE
// ===============================
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    accessToken: null, // nuevo campo para token en Redux
    loading: false,
    authChecked: false,
    profileLoaded: false, // 💡 CAMBIO 1: Nueva bandera de estado
    error: null,
    successMessage: null,
    notificationMessage: null,
    purchaseHistory: [],   // 🟦 agregamos esto
     reviews: [],
    

  },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.authChecked = true;
      state.profileLoaded = false; // 💡 CAMBIO 2: Resetear al hacer logout
      state.error = null;
      state.successMessage = null;
      state.notificationMessage = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
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
        state.authChecked = true;
        state.profileLoaded = false; // Perfil cargado parcialmente (solo los datos de registro)
        state.successMessage = "Registro exitoso. ¡Bienvenido!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
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
        state.authChecked = true;
        state.profileLoaded = false; // Perfil cargado parcialmente (solo los datos de login)
        state.successMessage = "Inicio de sesión exitoso.";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
        state.error = action.payload.error || action.payload;
      })

      // checkAuthStatus (Ruta Ligera)
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.authChecked = true;
        state.profileLoaded = false; // Se cargó el perfil ligero, no el completo
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.authChecked = true;
        state.user = null;
        state.profileLoaded = false; // Resetear
        state.error = action.payload?.expected ? null : action.payload?.error || "Error de conexión/servidor";
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.authChecked = true;
        state.profileLoaded = false; // Resetear
        state.error = null;
        state.successMessage = "Sesión cerrada correctamente.";
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.authChecked = true;
        state.profileLoaded = false; // Resetear
        state.error = "Error al cerrar sesión, se limpió el estado local.";
      })

      // fetchUserProfile (Ruta Completa)
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.profileLoaded = true; // 💡 CAMBIO 3: Marcar como cargado
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileLoaded = false;
        state.error = action.payload.error || action.payload;
      })

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = formatUserPayload(action.payload);
        state.profileLoaded = true; // El perfil actualizado se considera completo
        state.successMessage = "¡Perfil actualizado exitosamente!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // updateUserPassword
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Contraseña cambiada exitosamente. Por seguridad, vuelve a iniciar sesión.";
        state.user = null;
        state.accessToken = null;
        state.profileLoaded = false; // Resetear
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || action.payload;
      })

      // refreshAccessToken
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.profileLoaded = false; // Resetear
        state.error = action.payload.error || action.payload;
      }).addCase(fetchUserPurchaseHistory.pending, (state) => {
    state.loading = true;
    state.error = null;
      })
      .addCase(fetchUserPurchaseHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.purchaseHistory = action.payload || [];
      })
      .addCase(fetchUserPurchaseHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.purchaseHistory = [];
      }).addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  logoutSuccess,
  clearSuccessMessage,
  setAuthChecked,
  setNotificationMessage,
  setAccessToken, // nueva acción
} = userSlice.actions;

export default userSlice.reducer;
