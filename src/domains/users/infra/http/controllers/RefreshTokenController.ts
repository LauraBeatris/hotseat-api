import { Request, Response } from 'express';
import container from '@shared/container';
import RefreshTokenService from '@domains/users/services/RefreshTokenService';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const refreshToken = container.resolve(RefreshTokenService);

    const newTokens = await refreshToken.execute(request?.body?.refreshToken);

    return response.json(newTokens);
  }
}
