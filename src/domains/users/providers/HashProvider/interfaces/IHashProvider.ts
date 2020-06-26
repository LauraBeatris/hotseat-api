export default interface IHashProvider {
  generateHash(payload: string, salt?: number): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
