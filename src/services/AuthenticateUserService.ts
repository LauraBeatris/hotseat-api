import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  token: string;
  user: User;
}

class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<AuthenticationResponse> {
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
