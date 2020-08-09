import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isAfter } from 'date-fns';

import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import IHashProvider from '@domains/users/providers/HashProvider/interfaces/IHashProvider';
import User from '@domains/users/infra/database/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordService {
  constructor(
    @inject('RecoverPasswordRequestsMailRepository')
    private recoverPasswordRequestsMailRepository: IRecoverPasswordRequestsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<User> {
    const checkIfRequestExists = await this.recoverPasswordRequestsMailRepository.findByToken(
      token,
    );

    if (!checkIfRequestExists?.token) {
      throw new AppError("Token doesn't exists");
    }

    const checkIfRequestIsExpired = isAfter(
      Date.now(),
      checkIfRequestExists.expires_at,
    );

    if (checkIfRequestIsExpired) {
      throw new AppError('The recover password request is expired');
    }

    const checkIfUserExists = await this.usersRepository.findById(
      checkIfRequestExists.user_id,
    );

    if (!checkIfUserExists) {
      throw new AppError("User doesn't exists");
    }

    checkIfUserExists.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(checkIfUserExists);

    this.recoverPasswordRequestsMailRepository.delete(checkIfRequestExists?.id);

    return checkIfUserExists;
  }
}

export default ResetUserPasswordService;
