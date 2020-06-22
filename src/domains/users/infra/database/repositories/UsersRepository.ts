import { Repository, getRepository } from 'typeorm';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/database/entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: User['email']): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ email });
    return user;
  }

  async findById(id: User['id']): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }
}
