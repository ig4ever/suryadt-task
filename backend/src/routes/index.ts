import { Router } from "express";
import authRoutes from "./auth.routes";
import masterRoutes from "./master.routes";
import categoryRoutes from "./category.routes";
import petRoutes from "./pet.routes";
import {
  authLimiter,
  defaultLimiter,
} from "../middleware/rateLimit.middleware";

const router = Router();

router.use(defaultLimiter);
router.use("/auth", authLimiter, authRoutes);
router.use("/master", masterRoutes);
router.use("/category", categoryRoutes);
router.use("/pet", petRoutes);

export default router;
