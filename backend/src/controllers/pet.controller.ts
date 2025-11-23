import { Request, Response } from "express";
import { PetService } from "../services/pet.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getPets = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, masterId, categoryId, search } = req.query as any;
  const result = await PetService.getAll({
    page,
    limit,
    masterId,
    categoryId,
    search,
  });
  const data = result.data.map((p: any) => ({
    masterId: String(p.masterId),
    categoryId: String(p.categoryId),
    name: p.name,
    dob: p.dob,
  }));
  const qp: any = { ...req.query };
  const base = `${req.baseUrl}${req.path}`;
  const build = (p: number) => {
    qp.page = String(p);
    qp.limit = String(result.pagination.limit);
    const s = new URLSearchParams(qp as any).toString();
    return `${base}?${s}`;
  };
  const next =
    result.pagination.page < result.pagination.totalPages
      ? build(result.pagination.page + 1)
      : null;
  const prev =
    result.pagination.page > 1 ? build(result.pagination.page - 1) : null;
  res.json({ ...result.pagination, next, prev, data });
});

export const getPet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.getById(req.params.id);
  res.json(new ApiResponse(200, pet, "Pet retrieved"));
});

export const createPet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.create(req.body);
  res.status(201).json(new ApiResponse(201, pet, "Pet created"));
});

export const updatePet = asyncHandler(async (req: Request, res: Response) => {
  const pet = await PetService.update(req.params.id, req.body);
  res.json(new ApiResponse(200, pet, "Pet updated"));
});

export const deletePet = asyncHandler(async (req: Request, res: Response) => {
  await PetService.delete(req.params.id);
  res.json(new ApiResponse(200, null, "Pet deleted"));
});
