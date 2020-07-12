import { injectable, inject } from 'tsyringe';

import User from '@domains/users/infra/database/entities/User';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  exceptUserId: string;
}
@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ exceptUserId }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(exceptUserId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const providers = await this.usersRepository.findProviders({
      exceptUserId,
    });

    return providers;
  }
}

export default ListProvidersService;
