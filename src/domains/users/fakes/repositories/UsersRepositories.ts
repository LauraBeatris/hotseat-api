import { uuid } from 'uuidv4';

import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/database/entities/User';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = Object.assign(new User(), {
      id: uuid(),
      ...userData,
    });

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

  async save(user: User): Promise<User> {
    return user;
  }
}
