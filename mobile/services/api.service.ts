import axios from "axios";
import { tokenService } from "./token.service";
import axiosOrig from "axios";

import { Config } from "../constants/Config";
import { authService } from "./auth.service";

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
      const token = await tokenService.getAccessToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    })();
  },
  (error: any) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const status = error?.response?.status;
    const original = error?.config;
    if (status === 401 && !original?._retry) {
      original._retry = true;
      return (async () => {
        const res: any = await authService.refresh();
        if (!res) {
          return Promise.reject(error);
        }
        try {
          console.log("refresh token success");
          const newAccess = res?.data?.accessToken;
          if (!newAccess) throw new Error("no token");
          await tokenService.setAccessToken(newAccess);
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newAccess}`;
          return apiClient(original);
        } catch (e) {
          await tokenService.clear();
          return Promise.reject(error);
        }
      })();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
