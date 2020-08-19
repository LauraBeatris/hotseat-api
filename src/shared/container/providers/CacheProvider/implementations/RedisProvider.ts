import RedisClient, { Redis as RedisClientType } from 'ioredis';

import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import cacheConfig from '@config/cache';

class RedisProvider implements ICacheProvider {
  private client: RedisClientType;

  constructor() {
    this.client = new RedisClient(cacheConfig.configs.redisConfig);
  }

  public async get(key: string): Promise<string | null> {
    const payload = await this.client.get(key);

    return payload;
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default RedisProvider;
