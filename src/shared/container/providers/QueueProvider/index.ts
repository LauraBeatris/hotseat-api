import { container } from 'tsyringe';

import queueConfig, { QueueType } from '@config/queue';
import BullQueueProvider from './implementations/BullQueueProvider';
import IQueueProvider from './interfaces/IQueueProvider';

const queueProviders = {
  bull: BullQueueProvider,
};

container.registerInstance<IQueueProvider<QueueType>>(
  'QueueProvider',
  queueProviders[queueConfig.provider],
);
