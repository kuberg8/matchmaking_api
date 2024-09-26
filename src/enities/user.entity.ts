import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @ManyToMany(() => EventEntity, (event) => event.users)
  @JoinTable({
    name: 'users_events',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'event_id',
      referencedColumnName: 'id',
    },
  })
  events: EventEntity[];
}
