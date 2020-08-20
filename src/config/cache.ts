import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  provider: 'redis';
  configs: {
    redisConfig: RedisOptions;
  };
}

export const redisConfig: RedisOptions = {
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password:
    process.env.NODE_ENV === 'production'
      ? process.env.REDIS_PASSWORD
      : undefined,
};

const cacheConfig = {
  provider: process.env.CACHE_PROVIDER || 'redis',
  configs: {
    redisConfig,
  },
} as ICacheConfig;

export default cacheConfig;
