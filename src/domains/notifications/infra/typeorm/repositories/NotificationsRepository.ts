import { MongoRepository, getMongoRepository, ObjectID } from 'typeorm';
import INotificationsRepository from '@domains/notifications/interfaces/INotificationsRepository';
import ICreateNotificationDTO from '@domains/notifications/dtos/ICreateNotificationDTO';
import Notification from '@domains/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async find(): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
    });

    return notifications;
  }

  public async create({
    read,
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      read,
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async findById(id: ObjectID): Promise<Notification | undefined> {
    const notification = await this.ormRepository.findOne(id);

    return notification;
  }

  public async updateReadStatus(
    id: ObjectID,
  ): Promise<Notification | undefined> {
    const notification = await this.ormRepository.findOne(id);

    if (!notification) {
      return undefined;
    }

    notification.read = true;

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
