import { hash, compare } from 'bcryptjs';
import IHashProvider from '../interfaces/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string, salt = 8): Promise<string> {
    const payloadHash = await hash(payload, salt);

    return payloadHash;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const payloadMatch = await compare(payload, hashed);

    return payloadMatch;
  }
}

export default BCryptHashProvider;
