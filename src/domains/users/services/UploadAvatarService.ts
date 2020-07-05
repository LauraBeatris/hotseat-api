import { injectable, inject } from 'tsyringe';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UploadAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    const userAlreadyHasAvatar = !!userExists.avatar;
    if (userAlreadyHasAvatar) {
      this.storageProvider.deleteFile(userExists.avatar);
    }

    this.storageProvider.saveFile(avatarFilename);

    userExists.avatar = avatarFilename;

    await this.usersRepository.save(userExists);

    return userExists;
  }
}

export default UploadAvatarService;
