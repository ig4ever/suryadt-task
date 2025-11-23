import { CacheService } from "./cache.service";
import { Pagination } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { Category } from "../models/category.model";

export class CategoryService {
  static async getAll(params: any) {
    const { page = "1", limit = "10", search } = params;
    const cacheKey = `categories:${page}:${limit}:${search || "none"}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;
    let query = Category.find({});
    if (search) query = query.where({ $text: { $search: search } });
    const total = await Category.countDocuments(query.getFilter());
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
    const cacheKey = `category:${id}`;
    const cached = await CacheService.get<any>(cacheKey);
    if (cached) return cached;
    const category = await Category.findById(id).lean();
    if (!category) throw new ApiError(404, "Category not found");
    await CacheService.set(cacheKey, category, 600);
    return category;
  }
  static async create(data: any) {
    const category = await Category.create(data);
    await CacheService.delPattern("categories:*");
    return category;
  }
  static async update(id: string, data: any) {
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!category) throw new ApiError(404, "Category not found");
    await CacheService.del(`category:${id}`);
    await CacheService.delPattern("categories:*");
    return category;
  }
  static async delete(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new ApiError(404, "Category not found");
    await CacheService.del(`category:${id}`);
    await CacheService.delPattern("categories:*");
    return true;
  }
}
