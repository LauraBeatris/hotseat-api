import { ObjectID } from 'mongodb';

import ICreateNotificationDTO from '@domains/notifications/dtos/ICreateNotificationDTO';
import Notification from '@domains/notifications/infra/database/schemas/Notification';
import INotificationsRepository from '@domains/notifications/interfaces/INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async find(): Promise<Notification[]> {
    return this.notifications;
  }

  public async findById(id: ObjectID): Promise<Notification | undefined> {
    const notification = this.notifications.find(
      findNotification => findNotification.id === id,
    );

    return notification;
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = Object.assign(new Notification(), {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }

  public async updateReadStatus(
    id: ObjectID,
  ): Promise<Notification | undefined> {
    const notificationId = this.notifications.findIndex(
      findNotification => findNotification.id === id,
    );

    if (!this.notifications[notificationId]) {
      return undefined;
    }

    this.notifications[notificationId] = {
      ...this.notifications[notificationId],
      read: true,
    };

    return this.notifications[notificationId];
  }
}

export default FakeNotificationsRepository;
