import { Repository, getRepository, Not } from 'typeorm';

import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/database/entities/User';
import IFindProvidersDTO from '@domains/users/dtos/IFindProvidersDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: User['email']): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  public async findById(id: User['id']): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findProviders({
    exceptUserId,
  }: IFindProvidersDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(exceptUserId),
        is_provider: true,
      },
    });

    return users;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }
}
