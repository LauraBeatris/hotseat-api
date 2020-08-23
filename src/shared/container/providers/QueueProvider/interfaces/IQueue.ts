import IJob from '@shared/container/jobs/interfaces/IJob';

export default interface IQueue<QueueType> extends IJob {
  queue: QueueType;
}
