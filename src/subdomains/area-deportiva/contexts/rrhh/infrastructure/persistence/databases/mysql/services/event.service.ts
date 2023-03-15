import { Injectable } from '@nestjs/common';
import { EventMySqlEntity } from '../entities/event-mysql.entity';
import { EventRepository } from '../repositories/event.repository';


@Injectable()
export class EventMySqlService
{
  
  constructor(private readonly eventRepository: EventRepository) {}


  NegociarCesion(event: EventMySqlEntity): Promise<EventMySqlEntity> {
    return this.eventRepository.create(event);
  }



 



}
