import ICreateNotificationDTO from '@domains/notifications/dtos/ICreateNotificationDTO';
import Notification from '@domains/notifications/infra/database/schemas/Notification';

export default interface INotificationsRepository {
  create(notificationData: ICreateNotificationDTO): Promise<Notification>;
}
