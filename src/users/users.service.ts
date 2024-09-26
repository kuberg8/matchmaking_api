import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository /*, UpdateResult */ } from 'typeorm';
import { UserEntity } from 'src/enities/user.entity';
import * as bycrypt from 'bcrypt';
import { UserDTO, UserEventsDTO } from 'src/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string) {
    return bycrypt.hash(password, 10);
  }

  private mapToUserDTO(user: UserEntity): UserDTO {
    const userDTO = new UserDTO();
    userDTO.id = user.id;
    userDTO.first_name = user.first_name;
    userDTO.last_name = user.last_name;
    userDTO.phone = user.phone;
    userDTO.avatarUrl = user.avatarUrl;

    userDTO.events = user.events?.map((event) => {
      const eventDTO = new UserEventsDTO();
      eventDTO.id = event.id;
      eventDTO.name = event.name;
      eventDTO.date = event.date;
      eventDTO.time = event.time;
      eventDTO.city = event.city;
      eventDTO.memberCount = event.memberCount;
      eventDTO.maxMemberCount = event.maxMemberCount;
      eventDTO.eventType = event.eventType;
      return eventDTO;
    });

    return userDTO;
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserDTO> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['events', 'events.eventType'],
    });

    if (!user) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return this.mapToUserDTO(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: UserEntity): Promise<void> {
    user.password = await this.hashPassword(user.password);
    await this.usersRepository.save(user);
  }

  // update(user: User, id: string): Promise<UpdateResult> {
  //   return this.usersRepository.update(id, user);
  // }
  update(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
