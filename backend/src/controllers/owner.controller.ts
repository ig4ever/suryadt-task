import { Request, Response } from "express"
import { OwnerService } from "../services/owner.service"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

export const getOwners = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search } = req.query as any
  const result = await OwnerService.getAll({ page, limit, search })
  res.json(new ApiResponse(200, result, "Owners retrieved"))
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