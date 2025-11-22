import { Request, Response } from "express"
import { PetService } from "../services/pet.service"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

export const getPets = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, owner, category, search } = req.query as any
  const result = await PetService.getAll({ page, limit, owner, category, search })
  res.json(new ApiResponse(200, result, "Pets retrieved"))
})

export const getPet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.getById(req.params.id)
  res.json(new ApiResponse(200, pet, "Pet retrieved"))
})

export const createPet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.create(req.body)
  res.status(201).json(new ApiResponse(201, pet, "Pet created"))
})

export const updatePet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.update(req.params.id, req.body)
  res.json(new ApiResponse(200, pet, "Pet updated"))
})

export const deletePet = asyncHandler(async (req: Request, res: Response) => {
  await PetService.delete(req.params.id)
  res.json(new ApiResponse(200, null, "Pet deleted"))
})