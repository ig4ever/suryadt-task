import { Router } from "express"
import { getPets, getPet, createPet, updatePet, deletePet } from "../controllers/pet.controller"
import { requireAuth } from "../middleware/auth.middleware"

const router = Router()

router.get("/", getPets)
router.post("/", requireAuth, createPet)
router.get("/:id", getPet)
router.patch("/:id", requireAuth, updatePet)
router.delete("/:id", requireAuth, deletePet)

export default router