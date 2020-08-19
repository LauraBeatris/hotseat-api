import { ObjectCannedACL } from 'aws-sdk/clients/s3';

export interface IStorageConfig {
  provider: 'disk' | 's3';
  s3: {
    bucket: string;
    ACL: ObjectCannedACL;
  };
}

const storageConfig: IStorageConfig = {
  provider: process.env.STORAGE_PROVIDER || 'disk',
  s3: {
    bucket: process.env.S3_BUCKET_NAME,
    ACL: 'public-read',
  },
} as IStorageConfig;

export default storageConfig;
