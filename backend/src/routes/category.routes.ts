import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", requireAuth, createCategory);
router.get("/:id", getCategory);
router.patch("/:id", requireAuth, updateCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
