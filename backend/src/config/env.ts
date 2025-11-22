import dotenv from "dotenv";

dotenv.config();

export interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  MONGODB_PORT: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_ENABLED: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  RATE_LIMIT_WINDOW: string;
  RATE_LIMIT_MAX: string;
}

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const MONGODB_PORT = process.env.MONGODB_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_ENABLED = process.env.REDIS_ENABLED;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const RATE_LIMIT_WINDOW = process.env.RATE_LIMIT_WINDOW;
export const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX;
