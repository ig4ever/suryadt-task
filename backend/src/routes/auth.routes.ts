import { Router } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env";
import { User } from "../models/user.model";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }
  const existing = await User.findOne({ username }).lean();
  if (existing) {
    return res.status(409).json({ message: "username already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  return res.status(201).json({ message: "registered" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  const expires =
    JWT_EXPIRE && /^[0-9]+$/.test(JWT_EXPIRE)
      ? parseInt(JWT_EXPIRE)
      : JWT_EXPIRE || "1h";
  const opts: SignOptions = { expiresIn: expires as any };
  const accessToken = jwt.sign(
    { sub: username, username },
    JWT_SECRET || "secret",
    opts
  );
  const refreshToken = jwt.sign(
    { sub: username, type: "refresh" },
    JWT_SECRET || "secret",
    { expiresIn: "1m" }
  );
  res.json({ accessToken, refreshToken });
});

router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: "refreshToken is required" });
  }
  try {
    const payload: any = jwt.verify(refreshToken, JWT_SECRET || "secret");
    if (payload.type !== "refresh") {
      return res.status(400).json({ message: "invalid token type" });
    }
    const expires =
      JWT_EXPIRE && /^[0-9]+$/.test(JWT_EXPIRE)
        ? parseInt(JWT_EXPIRE)
        : JWT_EXPIRE || "1h";
    const opts: SignOptions = { expiresIn: expires as any };
    const accessToken = jwt.sign(
      { sub: payload.sub, username: payload.sub },
      JWT_SECRET || "secret",
      opts
    );
    return res.json({ accessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "invalid or expired refresh token" });
  }
});

export default router;
