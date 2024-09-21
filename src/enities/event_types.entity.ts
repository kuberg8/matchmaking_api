import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('event_types')
export class EventTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_name', nullable: true })
  eventName: string;

  @OneToMany(() => EventEntity, (event) => event.eventType)
  @JoinColumn({ name: 'event_type_id' }) // Опционально, если нужно явно указать
  events: EventEntity[];
}
