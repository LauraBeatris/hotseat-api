import fs from 'fs';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import getFileTemporaryPath from '@shared/utils/getFileTemporaryPath';
import getFileUploadPath from '@shared/utils/getFileUploadPath';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filename: string): Promise<string> {
    const fileTemporaryPath = getFileTemporaryPath(filename);
    const fileUploadPath = getFileUploadPath(filename);

    await fs.promises.rename(fileTemporaryPath, fileUploadPath);

    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const fileUploadPath = getFileUploadPath(filename);

    try {
      await fs.promises.stat(fileUploadPath);

      await fs.promises.unlink(fileUploadPath);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

export default DiskStorageProvider;
