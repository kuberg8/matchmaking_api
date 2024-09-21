import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EventTypesEntity } from './event_types.entity';
import { UserEntity } from './user.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  place: string;

  @Column({ name: 'member_count' })
  memberCount: number;

  @Column({ name: 'max_member_count' })
  maxMemberCount: number;

  @Column({ name: 'min_age' })
  minAge: number;

  @Column({ name: 'max_age' })
  maxAge: number;

  @Column()
  level: number;

  @Column()
  inventory: boolean;

  @Column({ name: 'is_private' })
  isPrivate: boolean;

  @Column()
  confirmation: boolean;

  @ManyToOne(() => EventTypesEntity, (eventType) => eventType.events)
  eventType: EventTypesEntity;

  @ManyToOne(() => UserEntity, (user) => user.events)
  author: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.events)
  @JoinTable({
    name: 'users_events',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UserEntity[];
}
