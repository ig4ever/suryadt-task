import { Router } from "express"
import { getOwners, getOwner, createOwner, updateOwner, deleteOwner, makeMaster, getMaster } from "../controllers/owner.controller"
import { requireAuth } from "../middleware/auth.middleware"

const router = Router()

router.get("/", getOwners)
router.post("/", requireAuth, createOwner)
router.get("/:id", getOwner)
router.patch("/:id", requireAuth, updateOwner)
router.delete("/:id", requireAuth, deleteOwner)
router.post("/:id/make-master", requireAuth, makeMaster)
router.get("/current", getMaster)

export default router