import fs from 'fs';
import { getType } from 'mime';
import aws, { S3 } from 'aws-sdk';

import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import getFileTemporaryPath from '@shared/utils/getFileTemporaryPath';
import storageConfig from '@config/storage';
import AppError from '@shared/errors/AppError';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(filename: string): Promise<string> {
    const fileTemporaryPath = getFileTemporaryPath(filename);

    const fileContent = await fs.promises.readFile(fileTemporaryPath);

    const ContentType = getType(fileTemporaryPath);

    if (!ContentType) {
      throw new AppError('This file has no content type');
    }

    await this.client
      .putObject({
        Key: filename,
        Body: fileContent,
        ACL: storageConfig.s3.ACL,
        Bucket: storageConfig.s3.bucket,
        ContentType,
        ContentDisposition: `inline; filename=${filename}`,
      })
      .promise();

    await fs.promises.unlink(fileTemporaryPath);

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.s3.bucket,
        Key: filename,
      })
      .promise();
  }
}

export default S3StorageProvider;
