import rateLimit from "express-rate-limit";
import { getRedisClient } from "../config/redis";
import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } from "../config/env";

const createRateLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs: windowMs * 60 * 1000,
    max,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    store: {
      async increment(key: string) {
        const client = getRedisClient();
        const count = await client.incr(key);
        if (count === 1) {
          await client.expire(key, windowMs * 60);
        }
        return {
          totalHits: count,
          resetTime: new Date(Date.now() + windowMs * 60 * 1000),
        };
      },
      async decrement(key: string) {
        const client = getRedisClient();
        await client.decr(key);
      },
      async resetKey(key: string) {
        const client = getRedisClient();
        await client.del(key);
      },
    },
  });
};

export const defaultLimiter = createRateLimiter(
  parseInt(RATE_LIMIT_WINDOW || "15"),
  parseInt(RATE_LIMIT_MAX || "100")
);
export const authLimiter = createRateLimiter(
  parseInt(RATE_LIMIT_WINDOW || "15"),
  parseInt(RATE_LIMIT_MAX || "5")
);
