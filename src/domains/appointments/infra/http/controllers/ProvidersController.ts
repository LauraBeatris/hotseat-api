import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@domains/appointments/services/ListProvidersService';
import User from '@domains/users/infra/typeorm/entities/User';
import container from '@shared/container';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response<User[]>> {
    const { id: user_id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      exceptUserId: user_id,
    });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
