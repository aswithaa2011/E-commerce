import axios from "axios";

// User API — auto-attaches user JWT
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-e0qu.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

// Admin API — auto-attaches admin JWT
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-e0qu.onrender.com/api",
});

adminApi.interceptors.request.use((config) => {
  const adminAuth = JSON.parse(localStorage.getItem("adminAuth") || "{}");
  if (adminAuth.token) {
    config.headers.Authorization = `Bearer ${adminAuth.token}`;
  }
  return config;
});

export default api;
