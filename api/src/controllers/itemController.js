import * as itemService from '../services/itemService.js';
import { getPaginationParams, createPaginationResponse } from '../utils/pagination.js';
import { AppError } from '../middleware/errorHandler.js';

export const getItems = async (req, res) => {
  const { page, limit, offset } = getPaginationParams(req);
  const { search } = req.query;

  const { items, total } = await itemService.getItems({ offset, limit, search });

  res.json(createPaginationResponse(items, total, page, limit));
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  const item = await itemService.getItemById(id);

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  res.json({
    success: true,
    data: item,
  });
};

export const createItem = async (req, res) => {
  const item = await itemService.createItem(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await itemService.updateItem(id, req.body);

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  res.json({
    success: true,
    data: item,
  });
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  await itemService.deleteItem(id);

  res.status(204).send();
};
