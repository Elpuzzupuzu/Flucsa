import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Configurado con withCredentials: true
// NOTA: Recuerda que api/axios.js debe ajustarse para leer el AT del store!

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
            // El backend ahora devuelve { user, accessToken }
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
            // Esta llamada usa la cookie de Refresh Token para obtener { user, newAccessToken }
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
            // Limpia la cookie de Refresh Token en el servidor
            await api.post("/users/logout"); 
            return true;
        } catch (error) {
            console.error("Error al limpiar cookies en el servidor. Forzando logout local.", error);
            // Aunque el servidor falle, forzamos el logout local.
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// Obtener perfil completo - Ruta Pesada
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

// ===============================
// SLICE
// ===============================

const formatUserPayload = (userData) => {
    if (!userData) return null;
    return {
        ...userData,
        // Crea la propiedad 'name' solo si 'nombre' y 'apellido' existen.
        name: userData.nombre && userData.apellido ? `${userData.nombre} ${userData.apellido}` : undefined,
        rol: userData.rol,
        foto_perfil: userData.foto_perfil,
        email: userData.correo,
    };
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        // 🎯 AÑADIDO: Almacena el Access Token de corta duración en memoria
        accessToken: null, 
        loading: false,
        authChecked: false,
        error: null,
        successMessage: null,
        notificationMessage: null,
    },
    reducers: {
        logoutSuccess: (state) => {
            state.user = null;
            state.accessToken = null; // 🎯 LIMPIEZA: Borra el Access Token de memoria
            state.loading = false;
            state.authChecked = true;
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
    },
    extraReducers: (builder) => {
        builder
            // registerUser (No requiere cambio en el fulfilled si el backend no devuelve tokens)
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = formatUserPayload(action.payload);
                state.authChecked = true;
                state.successMessage = "Registro exitoso. ¡Bienvenido!";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.authChecked = true;
                state.error = action.payload.error || action.payload;
            })

            // loginUser - 🎯 MODIFICADO
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = formatUserPayload(action.payload.user); // Carga el usuario
                state.accessToken = action.payload.accessToken;      // 🎯 Carga el Access Token
                state.authChecked = true;
                state.error = null;
                state.successMessage = "Inicio de sesión exitoso.";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.authChecked = true;
                state.error = action.payload.error || action.payload;
            })

            // checkAuthStatus (Renovación) - 🎯 MODIFICADO
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;              // Carga el usuario
                state.accessToken = action.payload.accessToken; // 🎯 Carga el nuevo Access Token
                state.authChecked = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.authChecked = true;
                state.user = null;
                state.accessToken = null; // Limpieza por seguridad si falla la renovación
                state.error = action.payload?.expected ? null : action.payload?.error || "Error de conexión/servidor";
            })

            // logoutUser - Usa el reducer `logoutSuccess`
            .addCase(logoutUser.fulfilled, (state) => {
                // Llama a logoutSuccess para limpiar el estado
                userSlice.caseReducers.logoutSuccess(state); 
                state.successMessage = "Sesión cerrada correctamente.";
            })
            .addCase(logoutUser.rejected, (state) => {
                // Llama a logoutSuccess para limpiar el estado
                userSlice.caseReducers.logoutSuccess(state);
                state.error = "Error al cerrar sesión, se limpió el estado local.";
            })

            // fetchUserProfile (No requiere cambio)
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

            // updateUserProfile (No requiere cambio)
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

            // updateUserPassword - Llama a logoutSuccess
            .addCase(updateUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateUserPassword.fulfilled, (state) => {
                state.loading = false;
                state.successMessage =
                    "Contraseña cambiada exitosamente. Por seguridad, vuelve a iniciar sesión.";
                // Llama a logoutSuccess para limpiar el estado
                userSlice.caseReducers.logoutSuccess(state);
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || action.payload;
            });
    },
});

export const { logoutSuccess, clearSuccessMessage, setAuthChecked, setNotificationMessage } = userSlice.actions;
export default userSlice.reducer;