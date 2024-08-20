import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

console.info({ baseUrl });

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Device: "WEB",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("An error occurred");
  }
);

instance.interceptors.response.use(
  (config) => {
    if (config.config.url == "auth/login" && config.status == 201) {
      const token = config.data.access_token;
      localStorage.setItem("userToken", token);
    }
    return config;
  },
  (error) => {
    throw error;
    // return error;
  }
);
