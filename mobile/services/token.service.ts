import { storageService } from "./storage.service";

export const tokenService = {
  async getAccessToken(): Promise<string | null> {
    return storageService.getItem("accessToken");
  },

  async setAccessToken(token: string): Promise<void> {
    await storageService.setItem("accessToken", token);
  },

  async getRefreshToken(): Promise<string | null> {
    return storageService.getItem("refreshToken");
  },

  async setRefreshToken(token: string): Promise<void> {
    await storageService.setItem("refreshToken", token);
  },

  async clear(): Promise<void> {
    await storageService.removeItem("accessToken");
    await storageService.removeItem("refreshToken");
  },
};
