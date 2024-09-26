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

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  place: string;

  @Column({ name: 'member_count', nullable: true })
  memberCount: number;

  @Column({ name: 'max_member_count', nullable: true })
  maxMemberCount: number;

  @Column({ name: 'min_age', nullable: true })
  minAge: number;

  @Column({ name: 'max_age', nullable: true })
  maxAge: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  inventory: boolean;

  @Column({ name: 'is_private', nullable: true })
  isPrivate: boolean;

  @Column({ nullable: true })
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
