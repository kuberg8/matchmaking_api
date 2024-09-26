import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/enities/event.entity';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), UsersModule],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
