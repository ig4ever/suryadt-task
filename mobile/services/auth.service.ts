import axios from "axios";
import { Config } from "../constants/Config";
import { tokenService } from "./token.service";
import { jwtDecode } from "jwt-decode";
import { storageService } from "./storage.service";

export const authService = {
  async login(
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { data } = await axios.post(
      `${Config.API_URL}/auth/login`,
      { username, password },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    );
    const { accessToken, refreshToken } = data || {};
    if (accessToken) await tokenService.setAccessToken(accessToken);
    if (refreshToken) await tokenService.setRefreshToken(refreshToken);
    try {
      await storageService.setItem(
        "lastCredentials",
        JSON.stringify({ username, password })
      );
    } catch {}
    return { accessToken, refreshToken };
  },

  async refresh(): Promise<string | null> {
    const refreshToken = await tokenService.getRefreshToken();
    if (!refreshToken) {
      await tokenService.clear();
      throw new Error("No refresh token");
    }
    try {
      const { data } = await axios.post(
        `${Config.API_URL}/auth/refresh-token`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      );
      const { accessToken } = data || {};
      if (accessToken) await tokenService.setAccessToken(accessToken);
      return accessToken || null;
    } catch (e) {
      await tokenService.clear();
      try {
        const payload: any = jwtDecode(refreshToken);
        const uname = payload?.username || payload?.sub;
        const creds = await storageService.getItem("lastCredentials");
        if (creds) {
          const parsed = JSON.parse(creds || "{}");
          const u = parsed?.username;
          const p = parsed?.password;
          if (u && p && (!uname || uname === u)) {
            const res = await authService.login(u, p);
            return res?.accessToken || null;
          }
        }
      } catch {}
      return null;
    }
  },

  async logout(): Promise<void> {
    await tokenService.clear();
  },
};
