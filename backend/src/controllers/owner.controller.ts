import { Request, Response } from "express"
import { OwnerService } from "../services/owner.service"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

export const getOwners = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search, sortBy } = req.query as any
  const result = await OwnerService.getAll({ page, limit, search, sortBy })
  const data = result.data.map((o: any) => ({
    id: String(o._id),
    firstName: o.firstName,
    lastName: o.lastName,
    description: o.description,
    favorites: Boolean(o.favorites),
    isMaster: Boolean(o.isMaster),
  }))
  const qp: any = { ...req.query }
  const base = `${req.baseUrl}${req.path}`
  const build = (p: number) => {
    qp.page = String(p)
    qp.limit = String(result.pagination.limit)
    const s = new URLSearchParams(qp as any).toString()
    return `${base}?${s}`
  }
  const next = result.pagination.page < result.pagination.totalPages ? build(result.pagination.page + 1) : null
  const prev = result.pagination.page > 1 ? build(result.pagination.page - 1) : null
  res.json({ ...result.pagination, next, prev, data })
})

export const getOwner = asyncHandler(async (req: Request, res: Response) => {
  const owner = await OwnerService.getById(req.params.id)
  res.json(new ApiResponse(200, owner, "Owner retrieved"))
})

export const createOwner = asyncHandler(async (req: Request, res: Response) => {
  const owner = await OwnerService.create(req.body)
  res.status(201).json(new ApiResponse(201, owner, "Owner created"))
})

export const updateOwner = asyncHandler(async (req: Request, res: Response) => {
  const owner = await OwnerService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, owner, "Owner updated"))
})

export const deleteOwner = asyncHandler(async (req: Request, res: Response) => {
  await OwnerService.delete(req.params.id)
  res.json(new ApiResponse(200, null, "Owner deleted"))
})

export const makeMaster = asyncHandler(async (req: Request, res: Response) => {
  const owner = await OwnerService.setMaster(req.params.id)
  res.json(new ApiResponse(200, owner, "Master set"))
})

export const getMaster = asyncHandler(async (_req: Request, res: Response) => {
  const master = await OwnerService.getCurrentMaster()
  if (!master) return res.json(null)
  return res.json({
    firstName: master.firstName,
    lastName: master.lastName,
    description: master.description,
    favorites: Boolean(master.favorites),
    id: String((master as any)._id),
  })
})