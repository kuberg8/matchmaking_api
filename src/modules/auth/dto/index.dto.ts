import { IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  phone: string;
  @IsString()
  password: string;
}
