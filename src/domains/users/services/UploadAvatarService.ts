import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '@domains/users/infra/database/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UploadAvatarService {
  async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne(user_id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    if (userExists.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        userExists.avatar,
      );

      fs.promises
        .stat(userAvatarFilePath)
        .then(async () => {
          await fs.promises.unlink(userAvatarFilePath);
        })
        .catch(() => console.error("Avatar file doesn't exists"));
    }

    userExists.avatar = avatarFileName;

    await userRepository.save(userExists);

    return userExists;
  }
}

export default UploadAvatarService;
