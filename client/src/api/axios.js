// client/src/api.js (o donde hayas definido Axios)
import axios from "axios";

// 🚀 AJUSTE CLAVE: Lee la variable de entorno para la baseURL.
// - En Render, process.env.REACT_APP_API_BASE_URL tendrá 'https://flucsa-backend.onrender.com/api'
// - En local, usará 'http://localhost:4000/api'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // importante si usas cookies en auth
});

export default api;