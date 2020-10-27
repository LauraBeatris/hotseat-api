import FakeNotificationsRepository from '@domains/notifications/fakes/repositories/FakeNotificationsRepository';
import UpdateNotificationReadStatusService from '@domains/notifications/services/UpdateNotificationReadStatusService';
import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import crypto from 'crypto';

let notificationsRepository: FakeNotificationsRepository;
let updateNotificationStatus: UpdateNotificationReadStatusService;

describe('Update Notification Read Status', () => {
  beforeEach(() => {
    notificationsRepository = new FakeNotificationsRepository();
    updateNotificationStatus = new UpdateNotificationReadStatusService(
      notificationsRepository,
    );
  });

  it('should update notification read status if it exists', async () => {
    const notification = await notificationsRepository.create({
      content: 'This is a notification content for tests',
      recipient_id: 'A valid user ID',
    });

    expect(notification.read).toBeFalsy();

    const updatedNotification = await updateNotificationStatus.execute(
      notification.id,
    );

    expect(updatedNotification?.read).toBeTruthy();
  });

  it("should not update notification read status if it doesn't exists", async () => {
    const validStringToObjectID = crypto.randomBytes(12).toString('hex');

    await expect(
      updateNotificationStatus.execute(new ObjectID(validStringToObjectID)),
    ).rejects.toBeInstanceOf(AppError);
  });
});
