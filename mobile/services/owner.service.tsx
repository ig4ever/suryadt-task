import apiClient from "./api.service";
import { Owner, ApiResponse } from "../types/api.types";

export const ownerService = {
  async getAll(
    page: number = 1,
    limit: number = 10,
    sortBy: "name" | "cats" = "name",
    search?: string
  ): Promise<Owner[]> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy,
    });
    if (search) params.append("search", search);
    const { data } = await apiClient.get(`/master?${params.toString()}`);
    return data?.data ?? data;
  },

  async getById(id: string): Promise<Owner> {
    const { data } = await apiClient.get(`/master/${id}`);
    return (data as ApiResponse<Owner>).data;
  },

  async create(owner: Partial<Owner>): Promise<Owner> {
    const { data } = await apiClient.post("/master", owner);
    return (data as ApiResponse<Owner>).data;
  },

  async update(id: string, owner: Partial<Owner>): Promise<Owner> {
    const { data } = await apiClient.patch(`/master/${id}`, owner);
    return (data as ApiResponse<Owner>).data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/master/${id}`);
  },

  async setMaster(id: string): Promise<Owner> {
    const { data } = await apiClient.post(`/master/${id}/make-master`);
    return (data as ApiResponse<Owner>).data;
  },

  async getCurrentMaster(): Promise<{
    id: string;
    firstName: string;
    lastName: string;
    description?: string;
    favorites: boolean;
  } | null> {
    const { data } = await apiClient.get(`/master/current`);
    return data;
  },
};
