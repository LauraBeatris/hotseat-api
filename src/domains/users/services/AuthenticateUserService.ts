import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@domains/users/infra/database/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IAuthenticationResponse {
  token: string;
  user: User;
}

class AuthenticateUserService {
  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticationResponse> {
    const userExists = await getRepository(User).findOne({
      where: {
        email,
      },
    });

    const errorMessage = 'Incorrect email/password combination';

    if (!userExists) {
      throw new AppError(errorMessage, 404);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError(errorMessage);
    }

    const token = sign(
      {
        sub: userExists.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
      authConfig.jwt.secret,
    );

    return {
      token,
      user: userExists,
    };
  }
}

export default AuthenticateUserService;
