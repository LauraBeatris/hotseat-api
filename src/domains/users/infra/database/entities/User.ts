import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import { STATIC_FILES_ROUTE } from '@shared/constants/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('boolean')
  is_provider: boolean;

  @OneToMany(() => Appointment, appointment => appointment.customer)
  appointments: Appointment[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string {
    return `${process.env.APP_CLIENT_URL}${STATIC_FILES_ROUTE}/${this.avatar}`;
  }
}

export default User;
