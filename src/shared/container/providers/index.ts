import { container } from 'tsyringe';

import '@domains/users/providers';

import './TemplateProvider';
import './StorageProvider';
import './MailProvider';
import './CacheProvider';
import './QueueProvider';

export default container;
