import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
  private uploads: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.uploads.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.uploads.findIndex(findFile => file === findFile);

    if (fileIndex) {
      this.uploads.splice(1, fileIndex);
    }
  }
}

export default FakeDiskStorageProvider;
