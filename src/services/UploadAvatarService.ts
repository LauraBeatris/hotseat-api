import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UploadAvatarService {
  async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne(user_id);

    if (!userExists) {
      throw Error('User not found');
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
