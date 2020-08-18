type StorageProvider = 'disk' | 's3';

export interface IStorageConfig {
  provider: StorageProvider;
}

export const storageProviders: Record<string, StorageProvider> = {
  disk: 'disk',
  s3: 's3',
};

export const getStorageProvider = (): StorageProvider =>
  process.env.NODE_ENV !== 'production'
    ? storageProviders.disk
    : storageProviders.s3;

const storageConfig: IStorageConfig = {
  provider: getStorageProvider(),
};

export default storageConfig;
