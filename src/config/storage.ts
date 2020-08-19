export interface IStorageConfig {
  provider: 'disk' | 's3';
}

const storageConfig: IStorageConfig = {
  provider: process.env.STORAGE_PROVIDER,
} as IStorageConfig;

export default storageConfig;
