import IStorageProvider from '../interfaces/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
  private uploads: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.uploads.push(file);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const fileIndex = this.uploads.findIndex(findFile => file === findFile);

    if (fileIndex) {
      this.uploads.splice(1, fileIndex);
    }
  }
}

export default FakeDiskStorageProvider;
