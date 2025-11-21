import redisClient from '../config/redis.js';
import { CACHE_TTL } from '../config/constants.js';

export const cacheMiddleware = (ttl = CACHE_TTL.MEDIUM) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      res.originalJson = res.json;
      res.json = function (data) {
        redisClient.setEx(key, ttl, JSON.stringify(data)).catch(console.error);
        res.originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};
