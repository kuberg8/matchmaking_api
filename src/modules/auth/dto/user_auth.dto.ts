import { IsString } from 'class-validator';
import { UserDTO } from 'src/dto/user.dto';

export class UserAuthDTO extends UserDTO {
  @IsString()
  token?: string;
}
