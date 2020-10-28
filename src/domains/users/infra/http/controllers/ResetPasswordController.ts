import { Request, Response } from 'express';

import ResetPasswordService from '@domains/users/services/ResetPasswordService';
import User from '@domains/users/infra/typeorm/entities/User';
import container from '@shared/container';

export default class ResetPasswordController {
  async update(request: Request, response: Response): Promise<Response<User>> {
    const resetPasswordService = container.resolve(ResetPasswordService);

    const { password, token } = request.body;

    const user = await resetPasswordService.execute({
      password,
      token,
    });

    return response.json(user);
  }
}
