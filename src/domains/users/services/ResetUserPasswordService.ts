import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import IRecoverPasswordRequestsRepository from '../interfaces/IRecoverPasswordRequestsRepository';
import IUsersRepository from '../interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const checkIfRequestExists = await this.recoverPasswordRequestsRepository.findByToken(
      token,
    );

    if (!checkIfRequestExists?.token) {
      throw new AppError("Token doesn't exists");
    }

    const checkIfRequestIsExpired =
      differenceInHours(checkIfRequestExists.expires_at, Date.now()) > 2;

    if (checkIfRequestIsExpired) {
      throw new AppError('The recover password request is expired');
    }

    const checkIfUserExists = await this.usersRepository.findById(
      checkIfRequestExists.user_id,
    );

    if (!checkIfUserExists) {
      throw new AppError("User doesn't exists");
    }

    checkIfUserExists.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(checkIfUserExists);

    this.recoverPasswordRequestsRepository.delete(checkIfRequestExists?.id);
  }
}

export default ResetUserPasswordService;
