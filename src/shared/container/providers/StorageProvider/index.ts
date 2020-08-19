import { container } from 'tsyringe';

import storageConfig from '@config/storage';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './interfaces/IStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const mapStorageProviders = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  mapStorageProviders[storageConfig.provider],
);
