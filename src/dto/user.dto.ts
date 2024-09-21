import { IsOptional, IsString, IsArray } from 'class-validator';
import { UserEventsDTO } from './user_events.dto';

export class UserDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsArray()
  events?: UserEventsDTO[];
}
