import { Injectable } from '@nestjs/common/';
import { EventRepository } from '../repositories/';
import { EventMySqlEntity } from '../entities/event.entity';

@Injectable()
export class EventMySqlService {


    constructor(
        private readonly eventRepository: EventRepository
    ){}


    async registerEvent(eventData: EventMySqlEntity): Promise<EventMySqlEntity>{
        return await this.eventRepository.create(eventData);
    }

    async getEvents(): Promise<EventMySqlEntity[] | null>{
        return await this.eventRepository.findAll();
    }
} 