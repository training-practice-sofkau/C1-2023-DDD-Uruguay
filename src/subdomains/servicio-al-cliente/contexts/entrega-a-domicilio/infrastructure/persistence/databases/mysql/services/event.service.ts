import { Injectable } from "@nestjs/common";

import { EventMySqlEntity } from "../entities";
import { EventMySqlRepository } from '../repositories';

@Injectable()
export class EventMySqlService {

    constructor(
        private readonly eventRepository: EventMySqlRepository,
    ) { }
    
    
    crearEvent(event: EventMySqlEntity): Promise<EventMySqlEntity> {
        return this.eventRepository.create(event);
    }
    
    obtenerTodosLosEventos(): Promise<EventMySqlEntity[]> {
        return this.eventRepository.findAll();
    }

    obtenerEvent(eventId: string): Promise<EventMySqlEntity> {
        return this.eventRepository.findById(eventId);
    }

    borrarEvent(eventId: string): Promise<boolean> {
        return this.eventRepository.delete(eventId);
    }

}