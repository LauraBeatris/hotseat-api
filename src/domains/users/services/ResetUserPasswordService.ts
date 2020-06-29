import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IRecoverPasswordRequestsRepository from '../interfaces/IRecoverPasswordRequestsRepository';
import IUsersRepository from '../interfaces/IUsersRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordService {
  constructor(
    @inject('RecoverPasswordRequestsRepository')
    private recoverPasswordRequestsRepository: IRecoverPasswordRequestsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const checkIfTokenExists = await this.recoverPasswordRequestsRepository.findByToken(
      token,
    );

    if (!checkIfTokenExists?.token) {
      throw new AppError("Token doesn't exists");
    }

    const checkIfUserExists = await this.usersRepository.findById(
      checkIfTokenExists.user_id,
    );

    if (!checkIfUserExists) {
      throw new AppError("User doesn't exists");
    }

    await this.usersRepository.save({
      ...checkIfUserExists,
      password,
    });
  }
}

export default ResetUserPasswordService;
