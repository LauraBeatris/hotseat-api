/* eslint-disable no-console */
import Queue, { Queue as BullQueue, ErrorEventCallback } from 'bull';
import { captureException } from '@sentry/node';

import IProcessJobDTO from '@shared/container/providers/QueueProvider/dtos/IProcessJobDTO';
import IQueueProvider from '@shared/container/providers/QueueProvider/interfaces/IQueueProvider';
import IQueue from '@shared/container/providers/QueueProvider/interfaces/IQueue';

import * as jobs from '@shared/container/jobs/implementations';
import redisConfig from '@config/redis';
import { container } from 'tsyringe';

class BullQueueProvider implements IQueueProvider<BullQueue> {
  queues: IQueue<BullQueue>[] = [];

  constructor() {
    this.queues = [];

    this.init();
  }

  public init(): void {
    const queues = Object.values(jobs).map(job => {
      const jobInstance = container.resolve(job);

      return {
        key: jobInstance.key,
        queue: new Queue(jobInstance.key, { redis: redisConfig }),
        handle: jobInstance.handle,
      };
    });

    this.queues = queues;
  }

  public processJob({ key, jobData }: IProcessJobDTO): void {
    const findQueue = this.queues.find(queue => queue.key === key);

    if (findQueue?.queue) {
      findQueue.queue.add(jobData);
    }
  }

  public handleJobError(
    job: IProcessJobDTO,
    queue: IQueue<BullQueue>,
    error: ErrorEventCallback,
  ): void {
    captureException(error);

    console.error(`Job ${queue.key} Failed`);
    console.error('Error: ', error);
    console.error('Data: ', job.jobData);
  }

  public processQueues(): void {
    this.queues.forEach(({ queue, handle }) => {
      queue.process(handle);

      queue.on('failed', this.handleJobError);
    });
  }
}

export default new BullQueueProvider();
