import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('RecoverPasswordRequest')
class RecoverPasswordRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO -> Create relationship with the user entity
  @Column()
  user_id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column('timestamp')
  expires_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default RecoverPasswordRequest;
