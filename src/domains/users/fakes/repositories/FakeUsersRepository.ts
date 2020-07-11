import { uuid } from 'uuidv4';

import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/database/entities/User';
import IFindProvidersDTO from '@domains/users/dtos/IFindProvidersDTO';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = Object.assign(new User(), {
      id: uuid(),
      ...userData,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: User['email']): Promise<User | undefined> {
    const userFound = this.users.find(user => user.email === email);

    return userFound;
  }

  async findById(id: User['id']): Promise<User | undefined> {
    const userFound = this.users.find(user => user.id === id);

    return userFound;
  }

  async findProviders({ expectUserId }: IFindProvidersDTO): Promise<User[]> {
    const providers = this.users.filter(
      user => user.id !== expectUserId && user.is_provider,
    );

    return providers;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}
