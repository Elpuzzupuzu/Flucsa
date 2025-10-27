// client/src/api.js
import axios from "axios";
import { store } from "../app/store";
import { logoutUser, setNotificationMessage } from "../features/user/usersSlice"; // nombres consistentes

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // ⚡ Importante para cookies HttpOnly
});

// =======================================================
// 🚀 INTERCEPTOR DE SOLICITUDES
// Adjunta el Access Token del estado de Redux al header Authorization
// =======================================================
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.user.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =======================================================
// INTERCEPTOR DE RESPUESTA
// Maneja expiración y errores de autenticación (401/403)
// =======================================================
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            // Mostrar mensaje al usuario
            store.dispatch(
                setNotificationMessage("Tu sesión expiró. Por favor, inicia sesión de nuevo.")
            );

            // Limpiar estado local
            store.dispatch(logoutUser());
        }

        return Promise.reject(error);
    }
);

export default api;
