import { Test, TestingModule } from '@nestjs/testing';
import { EventTypesService } from './event_types.service';

describe('EventsService', () => {
  let service: EventTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTypesService],
    }).compile();

    service = module.get<EventTypesService>(EventTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
