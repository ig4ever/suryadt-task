import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { Config } from "../constants/Config";

const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: Config.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: any) => {
    return (async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {}
      return config;
    })();
  },
  (error: any) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
