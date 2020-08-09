import { injectable, inject } from 'tsyringe';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@domains/users/providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  is_provider?: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private bcryptHashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    is_provider,
  }: IRequest): Promise<User> {
    const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail) {
      throw new AppError('An user with that email already exists');
    }

    const passwordHash = await this.bcryptHashProvider.generateHash(
      password,
      8,
    );

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      is_provider,
    });

    return user;
  }
}

export default CreateUserService;
