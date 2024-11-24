import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/enities/user.entity';
import { UserLoginDTO } from './dto/index.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserEntity) {
    return this.authService.registerUser(user);
  }

  @Post('login')
  login(@Body() payload: UserLoginDTO) {
    return this.authService.login(payload);
  }
}
