import axios from "axios";
import { store } from "../app/store";
import { logoutUser, setNotificationMessage, setAccessToken } from "../features/user/usersSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // importante para cookies HttpOnly
});

// ===============================
// INTERCEPTOR DE SOLICITUDES
// ===============================
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

// ===============================
// INTERCEPTOR DE RESPUESTAS
// ===============================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // Solo intentar refresh si es 401/403 y no se ha reintentado esta request
        if ((status === 401 || status === 403) && !originalRequest._retry) {

            // Evitar reintento infinito en /users/refresh
            if (originalRequest.url === "/users/refresh") {
                store.dispatch(setNotificationMessage("Tu sesión expiró. Por favor, inicia sesión de nuevo."));
                store.dispatch(logoutUser());
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshResponse = await api.post("/users/refresh");
                const newToken = refreshResponse.data.accessToken;

                if (newToken) {
                    store.dispatch(setAccessToken(newToken));
                    processQueue(null, newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(setNotificationMessage("Tu sesión expiró. Por favor, inicia sesión de nuevo."));
                store.dispatch(logoutUser());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
