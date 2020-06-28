export default interface IMailProvider {
  sendMail(from: string, to: string, body: string): Promise<void>;
}
