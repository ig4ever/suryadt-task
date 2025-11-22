import { CacheService } from "./cache.service"
import { Pagination } from "../utils/pagination"
import { ApiError } from "../utils/ApiError"
import { Owner } from "../models/owner.model"

export class OwnerService {
  static async getAll(params: any) {
    const { page = "1", limit = "10", search } = params
    const cacheKey = `owners:${page}:${limit}:${search || "none"}`
    const cached = await CacheService.get<any>(cacheKey)
    if (cached) return cached

    let query = Owner.find({})
    if (search) query = query.where({ $text: { $search: search } })
    const total = await Owner.countDocuments(query.getFilter())
    const { query: q, page: p, limit: l } = Pagination.paginate(query, { page: parseInt(String(page)), limit: parseInt(String(limit)) })
    const data = await q.lean()
    const result = Pagination.createResponse(data, total, p, l)
    await CacheService.set(cacheKey, result, 300)
    return result
  }

  static async getById(id: string) {
    const cacheKey = `owner:${id}`
    const cached = await CacheService.get<any>(cacheKey)
    if (cached) return cached
    const owner = await Owner.findById(id).lean()
    if (!owner) throw new ApiError(404, "Owner not found")
    await CacheService.set(cacheKey, owner, 600)
    return owner
  }

  static async create(data: any) {
    const owner = await Owner.create(data)
    await CacheService.delPattern("owners:*")
    return owner
  }

  static async update(id: string, data: any) {
    const owner = await Owner.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    if (!owner) throw new ApiError(404, "Owner not found")
    await CacheService.del(`owner:${id}`)
    await CacheService.delPattern("owners:*")
    return owner
  }

  static async delete(id: string) {
    const owner = await Owner.findByIdAndDelete(id)
    if (!owner) throw new ApiError(404, "Owner not found")
    await CacheService.del(`owner:${id}`)
    await CacheService.delPattern("owners:*")
    return true
  }
}