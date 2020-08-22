import RedisClient, { Redis as RedisClientType } from 'ioredis';

import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import redisConfig from '@config/redis';

class RedisProvider implements ICacheProvider {
  private client: RedisClientType;

  constructor() {
    this.client = new RedisClient(redisConfig);
  }

  public async get<T>(key: string): Promise<T | null> {
    const payload = await this.client.get(key);

    if (!payload) {
      return null;
    }

    const parsedPayload = JSON.parse(payload);

    return parsedPayload;
  }

  public async save<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidateByPrefix(keyPrefix: string): Promise<void> {
    const keys = await this.client.keys(`${keyPrefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }
}

export default RedisProvider;
