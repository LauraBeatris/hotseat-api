export interface IMailConfig {
  provider: 'ethereal' | 'ses';
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

const mailConfig = {
  provider: process.env.MAIL_PROVIDER,
  defaults: {
    from: {
      address: 'laura@lauradeveloper.com.br',
      name: 'Laura Beatris',
    },
  },
} as IMailConfig;

export default mailConfig;
