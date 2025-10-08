// client/src/api.js
import axios from "axios";

// *** CAMBIO CLAVE AQUÍ: Usamos import.meta.env y el prefijo VITE_ ***
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default api;