import redisConfig from './redis';

interface ICacheConfig {
  provider: 'redis';
  configs: {
    redisConfig: typeof redisConfig;
  };
}

const cacheConfig = {
  provider: process.env.CACHE_PROVIDER || 'redis',
  configs: {
    redisConfig,
  },
} as ICacheConfig;

export default cacheConfig;
