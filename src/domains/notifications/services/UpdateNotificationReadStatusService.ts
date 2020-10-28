import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Notification from '@domains/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@domains/notifications/interfaces/INotificationsRepository';
import { ObjectID } from 'mongodb';

@injectable()
class UpdateNotificationReadStatusService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(id: ObjectID): Promise<Notification | undefined> {
    const notification = this.notificationsRepository.findById(id);

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    const updatedNotification = await this.notificationsRepository.updateReadStatus(
      id,
    );

    if (!updatedNotification) {
      throw new AppError('Notification not found', 404);
    }

    return updatedNotification;
  }
}

export default UpdateNotificationReadStatusService;
