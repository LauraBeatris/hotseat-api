import { Request, Response } from 'express';

import UpdateUserService from '@domains/users/services/UpdateUserService';
import ShowProfileService from '@domains/users/services/ShowProfileService';
import User from '@domains/users/infra/typeorm/entities/User';
import container from '@shared/container';

export default class ProfileController {
  async update(request: Request, response: Response): Promise<Response<User>> {
    const { id: user_id } = request.user;
    const { name, email, password, old_password } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response<User>> {
    const { id: user_id } = request.user;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({
      user_id,
    });

    return response.json(user);
  }
}
