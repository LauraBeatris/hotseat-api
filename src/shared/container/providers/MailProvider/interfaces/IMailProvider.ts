import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail({ to, subject, templateData }: ISendMailDTO): Promise<void>;
}
