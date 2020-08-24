import { Job } from 'bull';

import IJob from '@shared/container/jobs/interfaces/IJob';
import mapMailProviders from '@shared/container/providers/MailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import { MAIL_PROVIDER_JOB_KEY } from '@shared/container/jobs/keys';
import mailConfig from '@config/mail';

class MailProviderJob implements IJob {
  get key(): string {
    return MAIL_PROVIDER_JOB_KEY;
  }

  public async handle(job: Job<ISendMailDTO>): Promise<void> {
    const { to, subject, templateData } = job.data;

    await mapMailProviders[mailConfig.provider].sendMail({
      to,
      subject,
      templateData,
    });
  }
}

export default MailProviderJob;
