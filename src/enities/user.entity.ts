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

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ nullable: true }) // nullable, если телефон может быть пустым
  phone: string;

  @Column({ name: 'avatar_url', nullable: true }) // nullable, если аватар может отсутствовать
  avatarUrl: string;

  @ManyToMany(() => EventEntity, (event) => event.users, { cascade: true })
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
  events: Set<EventEntity>;

  constructor() {
    this.events = new Set<EventEntity>();
  }
}
