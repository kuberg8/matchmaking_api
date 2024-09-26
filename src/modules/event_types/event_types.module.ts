import { Module } from '@nestjs/common';
import { EventTypesController } from './event_types.controller';
import { EventTypesService } from './event_types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTypesEntity } from 'src/enities/event_types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventTypesEntity])],
  providers: [EventTypesService],
  controllers: [EventTypesController],
})
export class EventTypesModule {}
