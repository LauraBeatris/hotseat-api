type MailProvider = 'ethereal' | 'ses';

export interface IMailConfig {
  provider: MailProvider;
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export const mailProviders: Record<string, MailProvider> = {
  ethereal: 'ethereal',
  ses: 'ses',
};

export const getMailProvider = (): MailProvider =>
  process.env.NODE_ENV !== 'production'
    ? mailProviders.ses
    : mailProviders.ethereal;

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
