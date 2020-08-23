import { Queue as BullQueue } from 'bull';

export interface IQueueConfig {
  provider: 'bull';
}

const queueConfig: IQueueConfig = {
  provider: 'bull',
};

export interface IMapQueueProviderTypes {
  bull: BullQueue;
}

export type QueueType = IMapQueueProviderTypes[typeof queueConfig.provider];

export default queueConfig;
