import { RedisOptions } from 'ioredis';

const redisConfig: RedisOptions = {
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_PASSWORD
      : undefined,
};

export default redisConfig;
