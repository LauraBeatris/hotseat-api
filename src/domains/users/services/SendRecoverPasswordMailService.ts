import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import IRecoverPasswordRequests from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';
import IQueueProvider from '@shared/container/providers/QueueProvider/interfaces/IQueueProvider';
import { QueueType } from '@config/queue';
import { MAIL_PROVIDER_JOB_KEY } from '@shared/container/jobs/keys';

interface IRequest {
  email: string;
}

@injectable()
class SendRecoverPasswordMailService {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider<QueueType | unknown>,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RecoverPasswordRequestsMailRepository')
    private recoverPasswordRequestsRepository: IRecoverPasswordRequests,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (!checkIfUserExists) {
      throw new AppError(
        'Cannot send recover password mail to an nonexisting user',
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

    this.queueProvider.processJob({
      key: MAIL_PROVIDER_JOB_KEY,
      jobData: {
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
      },
    });
  }
}

export default SendRecoverPasswordMailService;
