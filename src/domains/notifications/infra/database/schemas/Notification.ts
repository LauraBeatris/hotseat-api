import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
class Notifications {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column({ type: 'uuid' })
  recipient_id: string;

  @Column({ type: 'boolean', default: false })
  read = false;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notifications;
