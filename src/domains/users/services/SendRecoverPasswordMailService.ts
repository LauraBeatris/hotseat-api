import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../interfaces/IUsersRepository';
import IRecoverPasswordRequests from '../interfaces/IRecoverPasswordRequestsRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendRecoverPasswordMailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RecoverPasswordRequestsMailRepository')
    private recoverPasswordRequestsRepository: IRecoverPasswordRequests,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (!checkIfUserExists) {
      throw new AppError(
        'Cannot send recover password mail to an unexisting user',
      );
    }

    const { token } = await this.recoverPasswordRequestsRepository.create(
      checkIfUserExists.id,
    );

    await this.mailProvider.sendMail(
      email,
      `You're receiving this email because you requested a new password. Verification Token: ${token}`,
      'Hotseat - Reset Password Request',
    );
  }
}

export default SendRecoverPasswordMailService;
