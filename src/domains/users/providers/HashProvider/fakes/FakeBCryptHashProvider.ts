import IHashProvider from '../interfaces/IHashProvider';

class FakeBCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeBCryptHashProvider;
