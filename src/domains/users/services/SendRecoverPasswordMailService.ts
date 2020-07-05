import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';

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

    const recoverPasswordRequestTemplateFilePath = path.resolve(
      __dirname,
      '..',
      'infra',
      'views',
      'handlebars',
      'resetPasswordRequest.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: checkIfUserExists.name,
        address: checkIfUserExists.email,
      },
      subject: 'Hotseat - Reset Password Request',
      templateData: {
        templateFilePath: recoverPasswordRequestTemplateFilePath,
        variables: {
          name: checkIfUserExists.name,
          link: `${process.env.APP_CLIENT_URL}${process.env.APP_CLIENT_PASSWORD_RESET_ROUTE}?token=${token}`,
        },
      },
    });
  }
}

export default SendRecoverPasswordMailService;
