import ICacheProvider from '../interfaces/ICacheProvider';

interface IFakeRedisClient {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private client: IFakeRedisClient = {};

  public async get<T>(key: string): Promise<T | null> {
    const payload = this.client[key];

    if (!payload) {
      return null;
    }

    const parsedPayload = JSON.parse(payload);

    return parsedPayload;
  }

  public async save<T>(key: string, value: T): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidateByPrefix(keyPrefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key =>
      key.startsWith(`${keyPrefix}:`),
    );

    keys.forEach(key => {
      delete this.client[key];
    });
  }
}

export default FakeCacheProvider;
