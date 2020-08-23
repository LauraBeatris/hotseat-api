import IQueueProvider from '@shared/container/providers/QueueProvider/interfaces/IQueueProvider';
import IProcessJobDTO from '@shared/container/providers/QueueProvider/dtos/IProcessJobDTO';
import IQueue from '@shared/container/providers/QueueProvider/interfaces/IQueue';
import IJob from '@shared/container/jobs/interfaces/IJob';

export interface IFakeQueue {
  key: string;
  on(event: string, callback: (...args: unknown[]) => void): void;
  process(job: () => void): void;
  add(data: unknown): void;
}

const jobs: Record<string, IJob> = {
  FakeJob: {
    key: 'FAKE_JOB_KEY',
    handle: async (_jobData: unknown): Promise<void> => {
      // Handle job
    },
  },
};

class FakeQueueProvider implements IQueueProvider<IFakeQueue> {
  queues: IQueue<IFakeQueue>[] = [];

  constructor() {
    this.queues = [];

    this.init();
  }

  public init(): void {
    const queues = Object.values(jobs).map(job => {
      return {
        key: job.key,
        queue: {
          key: job.key,
          on(): void {
            // Listen for event
          },
          process(): void {
            // Process job
          },
          add(_data: unknown): void {
            // Add job to queue
          },
        },
        handle: job.handle,
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
    _job: IProcessJobDTO,
    _queue: IQueue<IFakeQueue>,
    _error: unknown,
  ): void {
    // Handle job errors
  }

  public processQueues(): void {
    // Process queues
  }
}

export default FakeQueueProvider;
