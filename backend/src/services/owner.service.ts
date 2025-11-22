import { CacheService } from "./cache.service"
import { Pagination } from "../utils/pagination"
import { ApiError } from "../utils/ApiError"
import { Owner } from "../models/owner.model"

export class OwnerService {
  static async getAll(params: any) {
    const { page = "1", limit = "10", search, sortBy } = params
    const cacheKey = `owners:${page}:${limit}:${search || "none"}:${sortBy || "none"}`
    const cached = await CacheService.get<any>(cacheKey)
    if (cached) return cached

    if (sortBy === 'cats') {
      const pipeline: any[] = []
      const match: any = {}
      if (search) match.$text = { $search: search }
      if (Object.keys(match).length) pipeline.push({ $match: match })
      pipeline.push(
        {
          $lookup: {
            from: 'pets',
            localField: '_id',
            foreignField: 'masterId',
            as: 'pets'
          }
        },
        { $addFields: { catCount: { $size: '$pets' } } },
        { $project: { pets: 0 } },
        { $sort: { catCount: -1, firstName: 1, lastName: 1 } }
      )
      const totalAgg = await Owner.aggregate([...(Object.keys(match).length ? [{ $match: match }] : []), { $count: 'count' }])
      const total = totalAgg[0]?.count || 0
      const { page: p, limit: l, skip } = Pagination.paginate(Owner.find({}), { page: parseInt(String(page)), limit: parseInt(String(limit)) })
      const data = await Owner.aggregate([...pipeline, { $skip: skip }, { $limit: l }])
      const result = Pagination.createResponse(data, total, p, l)
      await CacheService.set(cacheKey, result, 300)
      return result
    }

    let query = Owner.find({})
    if (search) query = query.where({ $text: { $search: search } })
    if (sortBy === 'name') query = query.sort({ firstName: 1, lastName: 1 })
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

  static async setMaster(id: string) {
    const existing = await Owner.findById(id)
    if (!existing) throw new ApiError(404, "Owner not found")
    await Owner.updateMany({ isMaster: true }, { $set: { isMaster: false } })
    const updated = await Owner.findByIdAndUpdate(id, { isMaster: true }, { new: true, runValidators: true })
    await CacheService.delPattern("owners:*")
    return updated
  }

  static async getCurrentMaster() {
    const master = await Owner.findOne({ isMaster: true }).lean()
    return master
  }
}