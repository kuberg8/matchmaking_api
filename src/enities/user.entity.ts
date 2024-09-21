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

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'avatar_url', nullable: true })
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
