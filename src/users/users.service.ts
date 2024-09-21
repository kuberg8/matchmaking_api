import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository /*, UpdateResult */ } from 'typeorm';
import { UserEntity } from 'src/enities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: UserEntity): Promise<void> {
    await this.usersRepository.save(user);
  }

  // update(user: User, id: string): Promise<UpdateResult> {
  //   return this.usersRepository.update(id, user);
  // }
  update(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
