import { Request, Response } from 'express';

import User from '@domains/users/infra/database/entities/User';
import CreateUserService from '@domains/users/services/CreateUserService';
import container from '@shared/container';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const createUserService = container.resolve(CreateUserService);

    const { name, email, password, is_provider } = request.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
      is_provider,
    });

    delete user.password;

    return response.json(user);
  }
}
