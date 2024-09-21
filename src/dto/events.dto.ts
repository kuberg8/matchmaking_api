import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventTypesEntity } from 'src/enities/event_types.entity';
import { EventUsersDTO } from './event_users.dto';

export class EventDTO {
  @IsInt()
  id: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  time: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  place?: string;

  @IsOptional()
  @IsInt()
  memberCount?: number;

  @IsOptional()
  @IsInt()
  maxMemberCount?: number;

  @IsOptional()
  @IsInt()
  minAge?: number;

  @IsOptional()
  @IsInt()
  maxAge?: number;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsBoolean()
  inventory: boolean;

  @IsBoolean()
  isPrivate: boolean;

  @IsBoolean()
  confirmation: boolean;

  @IsInt()
  authorId: number;

  @IsOptional()
  eventType?: EventTypesEntity;

  @IsOptional()
  users?: EventUsersDTO[];
}
