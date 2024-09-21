import { IsArray, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { EventDTO } from './events.dto';

export class EventsWithCountDTO {
  @IsArray()
  @Type(() => EventDTO)
  items: EventDTO[];

  @IsOptional()
  @IsInt()
  total_count: number;

  constructor(items: EventDTO[], total_count: number) {
    this.items = items;
    this.total_count = total_count;
  }
}
