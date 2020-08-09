import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
