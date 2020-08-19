import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import ITemplateProvider from '@shared/container/providers/TemplateProvider/interfaces/ITemplateProvider';
import mailConfig from '@config/mail';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('TemplateProvider')
    private templateProvider: ITemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: mailConfig.configs.sesConfig.SES_API_VERSION,
        region: process.env.AWS_DEFAULT_REGION,
      }),
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

    await this.client.sendMail({
      from: mailConfig.defaults.from,
      to,
      subject,
      html: template,
    });
  }
}

export default SESMailProvider;
