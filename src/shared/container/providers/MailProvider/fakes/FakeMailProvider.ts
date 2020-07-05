import { APP_MAIL } from '@shared/constants/mail';
import IMailProvider from '../interfaces/IMailProvider';

interface IMail {
  from: string;
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private mails: IMail[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.mails.push({
      from: APP_MAIL,
      to,
      body,
    });
  }
}

export default FakeMailProvider;
