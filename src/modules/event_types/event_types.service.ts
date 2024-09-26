import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository /*, UpdateResult */ } from 'typeorm';
import { EventTypesEntity } from 'src/enities/event_types.entity';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventTypesEntity)
    private eventTypesRepository: Repository<EventTypesEntity>,
  ) {}

  findAll(): Promise<EventTypesEntity[]> {
    return this.eventTypesRepository.find();
  }

  findOne(id: number): Promise<EventTypesEntity> {
    return this.eventTypesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.eventTypesRepository.delete(id);
  }

  async create(event: EventTypesEntity): Promise<void> {
    await this.eventTypesRepository.save(event);
  }

  // update(event: Events, id: string): Promise<UpdateResult> {
  //   return this.eventTypesRepository.update(id, event);
  // }
  update(event: EventTypesEntity): Promise<EventTypesEntity> {
    return this.eventTypesRepository.save(event);
  }
}
