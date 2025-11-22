import { Router } from "express"
import jwt, { SignOptions } from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRE } from "../config/env"

const router = Router()

router.post("/login", (req, res) => {
  const { email = "user@example.com" } = req.body || {}
  const expires = JWT_EXPIRE && /^[0-9]+$/.test(JWT_EXPIRE) ? parseInt(JWT_EXPIRE) : (JWT_EXPIRE || "1h")
  const opts: SignOptions = { expiresIn: expires as any }
  const token = jwt.sign({ id: "1", email }, JWT_SECRET || "secret", opts)
  res.json({ accessToken: token })
})

export default router