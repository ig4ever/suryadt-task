import { createClient, RedisClientType } from "redis";
import { REDIS_HOST, REDIS_PORT, REDIS_ENABLED } from "./env";

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<any> => {
  const enabled = String(REDIS_ENABLED || "false").toLowerCase() === "true";
  if (enabled) {
    redisClient = createClient({
      socket: {
        host: REDIS_HOST || "127.0.0.1",
        port: parseInt(REDIS_PORT || "6379"),
      },
    });
    redisClient.on("error", (err: any) =>
      console.error("Redis Client Error", err)
    );
    redisClient.on("connect", () =>
      console.log("Redis connected successfully")
    );
    await redisClient.connect();
    return redisClient as RedisClientType;
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && typeof redisClient.quit === "function") {
    await redisClient.quit();
    console.log("Redis disconnected");
  }
};
