import { EventRepository } from "../repositories/event.repository";
import { EventPostgreEntity } from "../entities/event.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventPostgreService {
    constructor(private readonly eventRepository: EventRepository) {}

    create(event: EventPostgreEntity): Promise<EventPostgreEntity> {
        return this.eventRepository.create(event);
    }
}