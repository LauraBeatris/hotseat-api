import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';

import container from '@shared/container';
import NotificationsRepository from '@domains/notifications/infra/typeorm/repositories/NotificationsRepository';
import Notification from '@domains/notifications/infra/typeorm/schemas/Notification';
import UpdateNotificationReadStatusService from '@domains/notifications/services/UpdateNotificationReadStatusService';

export default class NotificationsController {
  public async index(
    _request: Request,
    response: Response,
  ): Promise<Response<Notification[]>> {
    const notificationsRepository = new NotificationsRepository();

    const notifications = await notificationsRepository.find();

    return response.json(notifications);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Notification>> {
    const { id } = request.params;

    const notificationId = new ObjectID(id);

    const updateNotificationStatus = container.resolve(
      UpdateNotificationReadStatusService,
    );

    const updatedNotification = await updateNotificationStatus.execute(
      notificationId,
    );

    return response.json(updatedNotification);
  }
}
