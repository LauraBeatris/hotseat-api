export interface IMailConfig {
  provider: 'ethereal' | 'ses';
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
  configs: {
    sesConfig: {
      SES_API_VERSION: string;
    };
  };
}

export const sesConfig = {
  SES_API_VERSION: '2010-12-01',
};

const mailConfig = {
  provider: process.env.MAIL_PROVIDER || 'ethereal',
  defaults: {
    from: {
      address: 'laura@lauradeveloper.com.br',
      name: 'Laura Beatris',
    },
  },
  configs: {
    sesConfig,
  },
} as IMailConfig;

export default mailConfig;
