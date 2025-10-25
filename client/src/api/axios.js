// client/src/api.js
import axios from "axios";
import { store } from "../app/store"; // <- usar llaves, coincide con export nombrado
import { logoutUser, setNotificationMessage } from "../features/user/usersSlice";

// *** CAMBIO CLAVE AQUÍ: Usamos import.meta.env y el prefijo VITE_ ***
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Interceptor de respuesta para manejar expiración de token
api.interceptors.response.use(
    (response) => response, // Si todo bien, devuelve la respuesta
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            // Opcional: mostrar mensaje al usuario
            store.dispatch(setNotificationMessage("Tu sesión expiró. Por favor, inicia sesión de nuevo."));
            
            // Forzar logout en Redux
            store.dispatch(logoutUser());
        }

        return Promise.reject(error);
    }
);

export default api;
