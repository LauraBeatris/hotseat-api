/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import ITemplateProvider from '@shared/container/providers/TemplateProvider/interfaces/ITemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('TemplateProvider')
    private templateProvider: ITemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const template = await this.templateProvider.parse({
      templateFilePath: templateData.templateFilePath,
      variables: templateData.variables,
    });

    const mailInfo = await this.client.sendMail({
      from: {
        name: process.env.APP_MAIL_NAME || 'Hotseat Team',
        address: process.env.APP_MAIL_ADDRESS || 'team@hotseat.com',
      },
      to,
      subject,
      html: template,
    });

    console.log('Mail sent: %s', mailInfo.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailInfo));
  }
}

export default EtherealMailProvider;
