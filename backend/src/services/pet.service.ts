import { CacheService } from "./cache.service";
import { Pagination } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { Pet } from "../models/pet.model";

export class PetService {
  static async getAll(params: any) {
    const { page = "1", limit = "10", masterId, categoryId, search } = params;
    const cacheKey = `pets:${page}:${limit}:${masterId || "all"}:${
      categoryId || "all"
    }:${search || "none"}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;
    let query = Pet.find({});
    if (masterId) query = query.where("masterId").equals(masterId);
    if (categoryId) query = query.where("categoryId").equals(categoryId);
    if (search) query = query.where({ $text: { $search: search } });
    const total = await Pet.countDocuments(query.getFilter());
    const {
      query: q,
      page: p,
      limit: l,
    } = Pagination.paginate(query, {
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
    });
    const data = await q.lean();
    const result = Pagination.createResponse(data, total, p, l);
    await CacheService.set(cacheKey, result, 300);
    return result;
  }
  static async getById(id: string) {
    const cacheKey = `pet:${id}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;
    const pet = await Pet.findById(id).lean();
    if (!pet) throw new ApiError(404, "Pet not found");
    await CacheService.set(cacheKey, pet, 600);
    return pet;
  }
  static async create(data: any) {
    const pet = await Pet.create(data);
    await CacheService.delPattern("pets:*");
    return pet;
  }
  static async update(id: string, data: any) {
    const pet = await Pet.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!pet) throw new ApiError(404, "Pet not found");
    await CacheService.del(`pet:${id}`);
    await CacheService.delPattern("pets:*");
    return pet;
  }
  static async delete(id: string) {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) throw new ApiError(404, "Pet not found");
    await CacheService.del(`pet:${id}`);
    await CacheService.delPattern("pets:*");
    return true;
  }
}
