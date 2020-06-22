import User from '@domains/users/infra/database/entities/User';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findByEmail(email: User['email']): Promise<User | undefined>;
  findById(id: User['id']): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
