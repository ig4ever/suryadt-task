import { Request, Response } from "express"
import { CategoryService } from "../services/category.service"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, search } = req.query as any
  const result = await CategoryService.getAll({ page, limit, search })
  const data = result.data.map((c: any) => ({ name: c.name }))
  res.json({ ...result.pagination, data })
})

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryService.getById(req.params.id)
  res.json(new ApiResponse(200, category, "Category retrieved"))
})

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryService.create(req.body)
  res.status(201).json(new ApiResponse(201, category, "Category created"))
})

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, category, "Category updated"))
})

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  await CategoryService.delete(req.params.id)
  res.json(new ApiResponse(200, null, "Category deleted"))
})