import { Request, Response } from 'express';

import UploadAvatarService from '@domains/users/services/UploadAvatarService';
import container from '@shared/container';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const avatarFilename = request.file?.filename;

    if (!avatarFilename) {
      return response.status(400).json({ error: 'Please, send a avatar file' });
    }

    const uploadAvatarService = container.resolve(UploadAvatarService);

    const userWithAvatar = await uploadAvatarService.execute({
      user_id,
      avatarFilename,
    });

    delete userWithAvatar.password;

    return response.json(userWithAvatar);
  }
}
