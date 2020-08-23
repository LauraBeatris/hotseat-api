import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import { container, inject, injectable } from 'tsyringe';

import '@shared/container/providers';
import { QueueType } from '@config/queue';
import IQueueProvider from '@shared/container/providers/QueueProvider/interfaces/IQueueProvider';

@injectable()
class Queue {
  constructor(
    @inject('QueueProvider')
    private queueProvider: IQueueProvider<QueueType>,
  ) {
    this.processQueues();
  }

  private processQueues(): void {
    this.queueProvider.processQueues();
  }
}

container.resolve(Queue);
