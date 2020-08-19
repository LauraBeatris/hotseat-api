import { container } from 'tsyringe';

import cacheConfig from '@config/cache';

import RedisProvider from './implementations/RedisProvider';
import ICacheProvider from './interfaces/ICacheProvider';

const mapCacheProviders = {
  redis: RedisProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  mapCacheProviders[cacheConfig.provider],
);
