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
import { EventTypesEntity } from 'src/enities/event_types.entity';
// import { UpdateResult } from 'typeorm';
import { EventTypesService } from './event_types.service';

@ApiTags('event_types')
@Controller('event_types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  getAll(): Promise<EventTypesEntity[]> {
    return this.eventTypesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<EventTypesEntity> {
    return this.eventTypesService.findOne(id);
  }

  @Post()
  create(@Body() event: EventTypesEntity): void {
    this.eventTypesService.create(event);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): void {
  //   this.eventTypesService.remove(id);
  // }

  // @Put(':id')
  // update(@Body() event: EventType, @Param('id') id: number): Promise<UpdateResult> {
  //   return this.eventTypesService.update(event, id);
  // }
  // @Put()
  // update(@Body() event: EventTypesEntity): Promise<EventTypesEntity> {
  //   return this.eventTypesService.update(event);
  // }
}
