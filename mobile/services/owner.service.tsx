import apiClient from "./api.service";
import { Owner, PaginatedResponse } from "../types/api.types";

export const ownerService = {
  async getAll(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Owner>> {
    const { data } = await apiClient.get(`/owners?page=${page}&limit=${limit}`);
    return data.data;
  },

  async getById(id: string): Promise<Owner> {
    const { data } = await apiClient.get(`/owners/${id}`);
    return data.data;
  },

  async create(owner: Partial<Owner>): Promise<Owner> {
    const { data } = await apiClient.post("/owners", owner);
    return data.data;
  },

  async update(id: string, owner: Partial<Owner>): Promise<Owner> {
    const { data } = await apiClient.put(`/owners/${id}`, owner);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/owners/${id}`);
  },
};
