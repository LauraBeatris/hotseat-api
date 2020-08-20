export default interface ICacheProvider {
  save<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidateByPrefix(keyPrefix: string): Promise<void>;
}
