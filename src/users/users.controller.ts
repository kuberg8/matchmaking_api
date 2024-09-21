import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/enities/user.entity';
// import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: UserEntity): void {
    this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.remove(id);
  }

  // @Put(':id')
  // update(@Body() user: User, @Param('id') id: number): Promise<UpdateResult> {
  //   return this.userService.update(user, id);
  // }
  @Put()
  update(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.update(user);
  }
}
