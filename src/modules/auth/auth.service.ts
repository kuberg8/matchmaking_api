import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/enities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserLoginDTO } from './dto/index.dto';
import * as bcrypt from 'bcrypt';
import { AppErrors } from 'src/common/constants/errors';
import { TokenService } from 'src/modules/token/token.service';
import { UserAuthDTO } from './dto/user_auth.dto';
import { Request } from 'express';

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
      id: createdUser.id,
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
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      token,
    };
  }

  // TODO: сделать logout при хранении revoked tokens в БД
  // async logout(request: Request): Promise<void> {
  //   const token = request.headers['authorization']?.split(' ')[1];
  //   if (!token) throw new BadRequestException(AppErrors.NO_TOKEN);
  //   await this.tokenService.revokeToken(token);
  // }

  async getUserInfo(request: Request): Promise<UserAuthDTO> {
    const token = request.headers['authorization']?.split(' ')[1];
    const payload = await this.tokenService.verifyToken(token);
    if (!payload || !payload.user) {
      throw new BadRequestException(AppErrors.INVALID_TOKEN);
    }

    const user = await this.userService.findByPhone(payload.user);
    if (!user) throw new BadRequestException(AppErrors.USER_NOT_EXIST);

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
    };
  }
}
