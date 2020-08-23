import IJob, { IJobData } from '@shared/container/jobs/interfaces/IJob';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { MAIL_PROVIDER_JOB_KEY } from '@shared/container/jobs/keys';

class FakeMailProviderJob implements IJob {
  private emailProvider: IMailProvider;

  constructor() {
    this.emailProvider = new FakeMailProvider();
  }

  get key(): string {
    return MAIL_PROVIDER_JOB_KEY;
  }

  public async handle(job: IJobData<ISendMailDTO>): Promise<void> {
    const { to, subject, templateData } = job.data;

    await this.emailProvider.sendMail({
      to,
      subject,
      templateData,
    });
  }
}

export default FakeMailProviderJob;
