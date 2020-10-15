import { Request, Response } from 'express';

import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import container from '@shared/container';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token, refreshToken } = await authenticateUserService.execute(
      {
        email,
        password,
      },
    );

    return response.json({
      user: classToClass(user),
      token,
      refreshToken,
    });
  }
}
