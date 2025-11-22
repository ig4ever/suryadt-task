import apiClient from "./api.service";
import { Pet } from "../types/api.types";

export const petService = {
  async getByMaster(masterId: string, page: number = 1, limit: number = 10): Promise<Pet[]> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      masterId,
    });
    const { data } = await apiClient.get(`/pet?${params.toString()}`);
    return data as Pet[];
  },
};