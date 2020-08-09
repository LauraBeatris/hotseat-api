import User from '@domains/users/infra/database/entities/User';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '@domains/users/dtos/IFindProvidersDTO';

export default interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;

  findByEmail(email: User['email']): Promise<User | undefined>;

  findById(id: User['id']): Promise<User | undefined>;

  findProviders(findProviderData: IFindProvidersDTO): Promise<User[]>;

  save(user: User): Promise<User>;
}
