export interface IJobData<T = unknown> {
  data: T;
  progress(value: unknown): Promise<void>;
}

export default interface IJob {
  key: string;
  handle(job: IJobData): Promise<void>;
}
