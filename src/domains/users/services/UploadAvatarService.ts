import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UploadAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(userExists);

    return userExists;
  }
}

export default UploadAvatarService;
