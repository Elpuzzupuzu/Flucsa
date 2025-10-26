// client/src/api.js
import axios from "axios";
import { store } from "../app/store"; // <- Importamos el store de Redux
import { logoutUser, setNotificationMessage } from "../features/user/usersSlice";

// *** CAMBIO CLAVE AQUÍ: Usamos import.meta.env y el prefijo VITE_ ***
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// =======================================================
// 🚀 INTERCEPTOR DE SOLICITUDES (NUEVO)
// Adjunta el Access Token del estado de Redux al encabezado Authorization.
// =======================================================
api.interceptors.request.use(
    (config) => {
        // Obtenemos el Access Token del estado actual de Redux
        const state = store.getState();
        const accessToken = state.user.accessToken;

        // Si existe un Access Token, lo adjuntamos al encabezado Authorization
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// =======================================================
// INTERCEPTOR DE RESPUESTA (EXISTENTE)
// Maneja la expiración y errores de autenticación (401/403).
// =======================================================
api.interceptors.response.use(
    (response) => response, // Si todo bien, devuelve la respuesta
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            // Opcional: mostrar mensaje al usuario
            store.dispatch(setNotificationMessage("Tu sesión expiró. Por favor, inicia sesión de nuevo."));
            
            // Forzar logout en Redux (esto limpia el estado local y el Access Token de memoria)
            store.dispatch(logoutUser());
        }

        return Promise.reject(error);
    }
);

export default api;