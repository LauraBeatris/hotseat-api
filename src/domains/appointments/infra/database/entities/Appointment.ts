import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@domains/users/infra/database/entities/User';

export type AppointmentType = 'HAIR_CARE' | 'HAIR_WASHING' | 'CLASSIC_SHAVING';
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  provider_id: string;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column('timestamp with time zone')
  date: Date;

  @Column({
    type: 'enum',
    enum: ['HAIR_CARE', 'HAIR_WASHING', 'CLASSIC_SHAVING'],
    default: `'HAIR_CARE'`,
  })
  type: AppointmentType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Appointment;
