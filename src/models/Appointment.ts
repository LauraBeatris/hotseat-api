import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AppointmentType = 'Hair Care' | 'Hair Washing' | 'Classic Shaving';
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column({
    type: 'enum',
    enum: ['Hair Care', 'Hair Washing', 'Classic Shaving'],
    default: 'Hair Care',
  })
  type: AppointmentType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
