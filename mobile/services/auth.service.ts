import axios from "axios";
import { Config } from "../constants/Config";
import { tokenService } from "./token.service";

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
    return { accessToken, refreshToken };
  },

  async refresh(): Promise<string | null> {
    const refreshToken = await tokenService.getRefreshToken();
    if (!refreshToken) {
      await tokenService.clear();
      throw new Error("No refresh token");
    }
    const { data } = await axios.post(
      `${Config.API_URL}/auth/refresh-token`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    );
    const { accessToken } = data || {};
    if (accessToken) await tokenService.setAccessToken(accessToken);
    return accessToken || null;
  },

  async logout(): Promise<void> {
    await tokenService.clear();
  },
};
