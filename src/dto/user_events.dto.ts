import {
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { EventTypesEntity } from 'src/enities/event_types.entity';

export class UserEventsDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsDate()
  time?: string;

  @IsOptional()
  @IsString()
  name?: string;

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
  @IsNumber()
  memberCount?: number;

  @IsOptional()
  @IsNumber()
  maxMemberCount?: number;

  @IsOptional()
  @IsBoolean()
  confirmation?: boolean;

  @IsOptional()
  eventType?: EventTypesEntity;
}
