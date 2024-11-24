import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/enities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserLoginDTO } from './dto/index.dto';
import * as bcrypt from 'bcrypt';
import { AppErrors } from 'src/common/constants/errors';
import { TokenService } from 'src/modules/token/token.service';
import { UserAuthDTO } from './dto/user_auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(user: UserEntity): Promise<UserAuthDTO> {
    const existUser = await this.userService.findByPhone(user.phone);

    if (existUser) throw new BadRequestException(AppErrors.USER_EXOST);

    const createdUser = await this.userService.create(user);
    const token = await this.tokenService.generateToken(createdUser.phone);
    return {
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      phone: createdUser.phone,
      token,
    };
  }

  async login(payload: UserLoginDTO): Promise<UserAuthDTO> {
    const user = await this.userService.findByPhone(payload.phone);

    if (!user) throw new BadRequestException(AppErrors.WRONG_DATA);

    const validatePassword = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    const token = await this.tokenService.generateToken(user.phone);

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      token,
    };
  }
}
