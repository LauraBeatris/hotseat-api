import redis from 'redis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import redisConfig from '@config/redis';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 6,
  duration: 1,
  blockDuration: 10,
});

const rateLimiterMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      await rateLimiter.consume(request.ip);
    }

    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
};

export default rateLimiterMiddleware;
