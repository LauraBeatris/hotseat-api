import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/interfaces/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/interfaces/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import ITemplateProvider from './TemplateProvider/interfaces/ITemplateProvider';
import HandlebarsTemplateProvider from './TemplateProvider/implementations/HandlebarsTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<ITemplateProvider>(
  'TemplateProvider',
  HandlebarsTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);

export default container;
