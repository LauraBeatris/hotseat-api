import { container } from 'tsyringe';

import HandlebarsTemplateProvider from './implementations/HandlebarsTemplateProvider';
import ITemplateProvider from './interfaces/ITemplateProvider';

container.registerSingleton<ITemplateProvider>(
  'TemplateProvider',
  HandlebarsTemplateProvider,
);
