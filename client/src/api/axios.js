import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend base
  withCredentials: true, // importante si usas cookies en auth
});

export default api;
