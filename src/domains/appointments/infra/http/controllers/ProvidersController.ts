import { Request, Response } from 'express';

import ListProvidersService from '@domains/appointments/services/ListProvidersService';
import User from '@domains/users/infra/database/entities/User';
import container from '@shared/container';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response<User[]>> {
    const { id: user_id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      exceptUserId: user_id,
    });

    return response.json(providers);
  }
}

export default ProvidersController;
