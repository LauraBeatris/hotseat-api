import { injectable, inject } from 'tsyringe';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  user_id: string;
  email: string;
  name: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail && findUserWithSameEmail.id !== user_id) {
      throw new AppError('This email is already being used');
    }

    user.email = email;
    user.name = name;

    if (password) {
      if (!old_password) {
        throw new AppError(
          'The old password should provided in order to update the current one',
        );
      }

      const passwordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!passwordMatch) {
        throw new AppError('The old password provided is invalid');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
