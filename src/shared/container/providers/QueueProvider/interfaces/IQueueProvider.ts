import { ErrorEventCallback } from 'bull';

import IProcessJobDTO from '@shared/container/providers/QueueProvider/dtos/IProcessJobDTO';

import IQueue from './IQueue';

export default interface IQueueProvider<QueueType> {
  queues: IQueue<QueueType>[];
  processJob(data: IProcessJobDTO): void;
  handleJobError(
    job: IProcessJobDTO,
    queue: IQueue<QueueType>,
    error: ErrorEventCallback,
  ): void;
  processQueues(): void;
}
