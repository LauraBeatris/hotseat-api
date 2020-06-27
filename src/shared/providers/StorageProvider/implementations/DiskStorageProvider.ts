import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../interfaces/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    const fileTemporaryPath = path.resolve(uploadConfig.tmpFolder, file);
    const fileUploadPath = path.resolve(uploadConfig.uploadFolder, file);

    await fs.promises.rename(fileTemporaryPath, fileUploadPath);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const fileUploadPath = path.resolve(uploadConfig.uploadFolder, file);

    const verifyIfFileExists = fs.promises.stat(
      path.resolve(uploadConfig.uploadFolder, file),
    );

    verifyIfFileExists.then(async () => {
      await fs.promises.unlink(fileUploadPath);
    });
  }
}

export default DiskStorageProvider;
