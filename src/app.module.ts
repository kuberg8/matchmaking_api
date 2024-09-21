import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { EventTypesModule } from './event_types/event_types.module';
import entities from './enities/index.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // for env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'kuberg',
      // password: process.env.DB_PASSWORD,
      database: 'matchmaking_db_node',
      entities,
      synchronize: true, // используйте с осторожностью в продакшене
    }),
    UsersModule,
    EventsModule,
    EventTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
