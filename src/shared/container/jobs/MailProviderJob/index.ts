import { container } from 'tsyringe';

import MailProviderJob from '@shared/container/jobs/MailProviderJob/implementations/MailProviderJob';
import IJob from '@shared/container/jobs/interfaces/IJob';

container.registerInstance<IJob>(
  'MailProviderJob',
  container.resolve(MailProviderJob),
);
