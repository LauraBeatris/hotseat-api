import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/providers/MailProvider/interfaces/IMailProvider';
import { APP_MAIL } from '@shared/constants/mail';
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

    @inject('RecoverPasswordRequestMailRepository')
    private recoverPasswordRequestsRepository: IRecoverPasswordRequests,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (!checkIfUserExists) {
      throw new AppError(
        'Cannot send recover password mail to an unexisting user',
      );
    }

    await this.recoverPasswordRequestsRepository.create(checkIfUserExists.id);

    await this.mailProvider.sendMail(
      APP_MAIL,
      email,
      "You're receiving this email because you requested a new password",
    );
  }
}

export default SendRecoverPasswordMailService;
