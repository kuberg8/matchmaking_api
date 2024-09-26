import { IsOptional, IsString } from 'class-validator';
import { UserEventsDTO } from './user_events.dto';

export class UserDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  events?: UserEventsDTO[];
}
