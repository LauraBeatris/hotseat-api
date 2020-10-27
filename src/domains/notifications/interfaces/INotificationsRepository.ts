import ICreateNotificationDTO from '@domains/notifications/dtos/ICreateNotificationDTO';
import Notification from '@domains/notifications/infra/database/schemas/Notification';
import { ObjectID } from 'mongodb';

export default interface INotificationsRepository {
  find(): Promise<Notification[]>;
  findById(id: ObjectID): Promise<Notification | undefined>;
  create(notificationData: ICreateNotificationDTO): Promise<Notification>;
  updateReadStatus(id: ObjectID): Promise<Notification | undefined>;
}
