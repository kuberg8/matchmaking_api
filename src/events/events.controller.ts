import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventEntity } from 'src/enities/event.entity';
import { EventsService } from './events.service';
import { EventDTO, EventsWithCountDTO } from 'src/dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  async getAll(
    @Query('page') page = 0,
    @Query('limit') limit = 5,
    @Query('sort') sort = 'date',
    @Query('sortType') sortType = 'asc',
    @Query('city') city = '',
  ): Promise<EventsWithCountDTO> {
    return this.eventService.getEventsWithCount(
      page,
      limit,
      sort,
      sortType,
      city,
    );
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<EventDTO> {
    return this.eventService.findOne(id);
  }

  @Post()
  async create(@Body() event: EventEntity): Promise<EventDTO> {
    const createdEvent = await this.eventService.create(event);
    return this.eventService.findOne(createdEvent.id); // Возвращаем созданное событие
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.eventService.remove(id);
  }

  @Put(':id')
  async update(
    @Body() event: EventEntity,
    @Param('id') id: number,
  ): Promise<EventDTO> {
    return this.eventService.update(id, event);
  }
}
