import express from 'express';
import * as itemController from '../controllers/itemController.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { CACHE_TTL } from '../config/constants.js';

const router = express.Router();

router.get('/', cacheMiddleware(CACHE_TTL.SHORT), itemController.getItems);
router.get('/:id', cacheMiddleware(CACHE_TTL.MEDIUM), itemController.getItemById);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

export default router;
