export enum StorageProvider {
  DISK = 'DISK',
  S3 = 'S3',
}
export interface IStorageConfig {
  provider: StorageProvider;
}

export const getStorageProvider = (): StorageProvider =>
  process.env.NODE_ENV !== 'production'
    ? StorageProvider.DISK
    : StorageProvider.S3;

const storageConfig: IStorageConfig = {
  provider: getStorageProvider(),
};

export default storageConfig;
