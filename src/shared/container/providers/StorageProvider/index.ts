import { container } from 'tsyringe';

import storageConfig from '@config/storage';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './interfaces/IStorageProvider';

const mapStorageProviders = {
  DISK: DiskStorageProvider,
  S3: DiskStorageProvider, // TODO - Add S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  mapStorageProviders[storageConfig.provider],
);
