import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/enities/event.entity';
import { EventDTO, EventUsersDTO, EventsWithCountDTO } from 'src/dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  private mapToEventDTO(event: EventEntity): EventDTO {
    const eventDTO = new EventDTO();
    eventDTO.id = event.id;
    eventDTO.date = event.date;
    eventDTO.time = event.time;
    eventDTO.name = event.name;
    eventDTO.description = event.description;
    eventDTO.eventType = event.eventType;
    eventDTO.country = event.country;
    eventDTO.city = event.city;
    eventDTO.place = event.place;
    eventDTO.inventory = event.inventory;
    eventDTO.isPrivate = event.isPrivate;
    eventDTO.memberCount = event.memberCount;
    eventDTO.maxMemberCount = event.maxMemberCount;
    eventDTO.minAge = event.minAge;
    eventDTO.maxAge = event.maxAge;
    eventDTO.level = event.level;
    eventDTO.confirmation = event.confirmation;

    if (event.author) {
      eventDTO.authorId = event.author.id;
    }

    eventDTO.users = event.users?.map((user) => {
      const userDTO = new EventUsersDTO();
      userDTO.id = user.id;
      userDTO.avatar_url = user.avatarUrl;
      userDTO.display_name = user.displayName;
      userDTO.phone = user.phone;
      return userDTO;
    });

    return eventDTO;
  }

  async create(event: EventEntity): Promise<EventEntity> {
    return this.eventsRepository.save(event);
  }

  async findAll(
    page = 0,
    limit = 5,
    sort = 'date',
    sortType = 'asc',
    city = '',
  ): Promise<EventDTO[]> {
    const qb = this.eventsRepository.createQueryBuilder('event');

    if (city) {
      qb.where('event.city LIKE :city', { city: `%${city}%` });
    }

    qb.leftJoinAndSelect('event.author', 'author').leftJoinAndSelect(
      'event.eventType',
      'eventType',
    );

    qb.take(limit).skip(page * limit);
    qb.orderBy(`event.${sort}`, sortType.toUpperCase() as 'ASC' | 'DESC');

    const events = await qb.getMany();
    return events?.map(this.mapToEventDTO);
  }

  async findOne(id: number): Promise<EventDTO> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['users', 'author', 'eventType'],
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return this.mapToEventDTO(event);
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }

  async update(id: number, event: EventEntity): Promise<EventDTO> {
    await this.eventsRepository.update(id, event);
    return this.findOne(id);
  }

  async getEventsWithCount(
    page = 0,
    limit = 5,
    sort = 'date',
    sortType = 'asc',
    city = '',
  ): Promise<EventsWithCountDTO> {
    const events = await this.findAll(page, limit, sort, sortType, city);
    const total_count = await this.eventsRepository.count();

    return {
      items: events,
      total_count,
    };
  }
}
