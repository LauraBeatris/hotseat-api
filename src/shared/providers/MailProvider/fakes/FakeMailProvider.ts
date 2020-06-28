import IMailProvider from '../interfaces/IMailProvider';

interface IMail {
  from: string;
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private mails: IMail[] = [];

  public async sendMail(from: string, to: string, body: string): Promise<void> {
    this.mails.push({
      from,
      to,
      body,
    });
  }
}

export default FakeMailProvider;
