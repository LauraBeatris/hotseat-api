import { Request, Response } from 'express';

import SendRecoverPasswordMailService from '@domains/users/services/SendRecoverPasswordMailService';
import container from '@shared/container';

export default class RecoverPasswordRequestController {
  public async create(request: Request, response: Response): Promise<Response> {
    const sendRecoverPasswordMailService = container.resolve(
      SendRecoverPasswordMailService,
    );

    const { email } = request.body;

    await sendRecoverPasswordMailService.execute({ email });

    return response.status(204).send();
  }
}
