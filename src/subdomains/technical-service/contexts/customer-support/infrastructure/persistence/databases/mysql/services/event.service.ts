import { Injectable } from '@nestjs/common/';
import { EventRepository } from '../repositories/';
import { EventMySqlEntity } from '../entities/event.entity';

@Injectable()
export class EventMySqlService {


    constructor(
        private readonly eventRepository: EventRepository
    ){}



    /**
     * Register an Event in DB
     *
     * @param {EventMySqlEntity} eventData
     * @return {*}  {Promise<EventMySqlEntity>}
     * @memberof EventMySqlService
     */
    async registerEvent(eventData: EventMySqlEntity): Promise<EventMySqlEntity>{

        return await this.eventRepository.create(eventData);

    }


    /**
     * Gets all the events from DB
     *
     * @return {*}  {(Promise<EventMySqlEntity[] | null>)}
     * @memberof EventMySqlService
     */
    async getEvents(): Promise<EventMySqlEntity[] | null>{
        return await this.eventRepository.findAll();
    }
} 