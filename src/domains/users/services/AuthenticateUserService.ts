import { injectable, inject } from 'tsyringe';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@domains/users/providers/HashProvider/interfaces/IHashProvider';
import createTokens from '@shared/utils/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IAuthenticationResponse {
  user: User;
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private bcryptHashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticationResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    const errorMessage = 'Incorrect email/password combination';

    if (!userExists) {
      throw new AppError(errorMessage, 404);
    }

    const passwordMatch = await this.bcryptHashProvider.compareHash(
      password,
      userExists.password,
    );

    if (!passwordMatch) {
      throw new AppError(errorMessage);
    }

    const [token, refreshToken] = await createTokens(
      userExists.id,
      userExists.password,
    );

    return {
      token,
      user: userExists,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
