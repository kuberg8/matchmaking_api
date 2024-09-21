import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventUsersDTO {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
