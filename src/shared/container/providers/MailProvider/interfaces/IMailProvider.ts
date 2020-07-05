export default interface IMailProvider {
  sendMail(to: string, body: string, subject?: string): Promise<void>;
}
