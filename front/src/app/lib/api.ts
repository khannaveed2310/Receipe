import axios from "axios";
import { error } from "console";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Sending Token", token)
    }
  }
  return config;
}, (error) => {
    return Promise.reject(error)
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('refresh');
        const res = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh,
        });
        const newAccess = res.data.access;
        localStorage.setItem('token', newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default api;