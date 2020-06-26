import { hash, compare } from 'bcryptjs';
import IHashProvider from '../interfaces/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string, salt = 8): Promise<string> {
    const payloadHash = await hash(payload, salt);

    return payloadHash;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    const payloadMatch = await compare(payload, hashed);

    return payloadMatch;
  }
}

export default BCryptHashProvider;
