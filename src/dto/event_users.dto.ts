import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventUsersDTO {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
