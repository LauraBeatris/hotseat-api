import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';

import jwtConfig from '@config/auth';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import createTokens from '@shared/utils/auth';

export interface IResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(refreshToken: string): Promise<IResponse> {
    let userId: string;

    try {
      const verifiedTokenPayload = jwt.decode(refreshToken);

      userId = verifiedTokenPayload?.sub;
    } catch (error) {
      throw new AppError(error?.message, 403);
    }

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError("User doesn't exists", 404);
    }

    const refreshSecret =
      jwtConfig.jwt.refreshTokenSecret + userExists.password;

    try {
      jwt.verify(refreshToken, refreshSecret);
    } catch (error) {
      throw new AppError(error?.message, 403);
    }

    const [newToken, newRefreshToken] = await createTokens(
      userExists.id,
      userExists.password,
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}

export default RefreshTokenService;
