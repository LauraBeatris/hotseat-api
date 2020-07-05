import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail({ to, subject, templateData }: ISendMailDTO): Promise<void>;
}
