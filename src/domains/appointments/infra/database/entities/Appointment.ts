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
import APPOINTMENT_TYPES, {
  AppointmentType,
} from '@domains/appointments/enums/appointmentTypes';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  provider_id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column('timestamp with time zone')
  date: Date;

  @Column({
    type: 'enum',
    enum: APPOINTMENT_TYPES,
    default: `${APPOINTMENT_TYPES[0]}`,
  })
  type: AppointmentType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Appointment;
