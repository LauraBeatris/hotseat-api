import mailConfig from '@config/mail';
import { container } from 'tsyringe';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './interfaces/IMailProvider';

const mapMailProviders = {
  ses: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mapMailProviders[mailConfig.provider],
);
