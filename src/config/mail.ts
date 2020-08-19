enum MailProvider {
  ETHEREAL = 'ETHEREAL',
  SES = 'SES',
}

export interface IMailConfig {
  provider: MailProvider;
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export const getMailProvider = (): MailProvider =>
  process.env.NODE_ENV !== 'production'
    ? MailProvider.SES
    : MailProvider.ETHEREAL;

const mailConfig: IMailConfig = {
  provider: getMailProvider(),
  defaults: {
    from: {
      address: 'laura@lauradeveloper.com.br',
      name: 'Laura Beatris',
    },
  },
};

export default mailConfig;
