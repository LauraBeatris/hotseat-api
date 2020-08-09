import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '@domains/users/infra/database/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
