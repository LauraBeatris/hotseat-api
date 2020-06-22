import { Request, Response } from 'express';

import UploadAvatarService from '@domains/users/services/UploadAvatarService';
import container from '@shared/container';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const avatarFileName = request.file?.filename;

    if (!avatarFileName) {
      return response.status(400).json({ error: 'Please, send a avatar file' });
    }

    const uploadAvatarService = container.resolve(UploadAvatarService);

    const userWithAvatar = await uploadAvatarService.execute({
      user_id,
      avatarFileName,
    });

    delete userWithAvatar.password;

    return response.json(userWithAvatar);
  }
}
