import { v4 as uuid } from 'uuid';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRepository } from './base/repository.base';
import { EventMySqlEntity } from '../entities';

@Injectable()
export class EventMySqlRepository
    implements IRepository<EventMySqlEntity>{

    constructor(
        @InjectRepository(EventMySqlEntity)
        private readonly repository: Repository<EventMySqlEntity>
    ) { }


    async findAll(): Promise<EventMySqlEntity[]> {
        return await this.repository.find();
    }

    async findById(eventId: string): Promise<EventMySqlEntity> {
        const event = await this.repository.findOneBy({ eventId })
        if (!event) throw new BadRequestException(`No se encontró una event con el id: ${eventId}`)
        return event;
    }

    async create(entity: EventMySqlEntity): Promise<EventMySqlEntity> {
        const event = {
            eventId: uuid(),
            data: entity.data,
            type: entity.type,
            createdAt: new Date()
        };
        return await this.repository.save(event);
    }

    async delete(eventId: string): Promise<boolean> {
        const event = await this.repository.findOneBy({ eventId });
        if (!event) throw new BadRequestException(`No se encontró una event con el id: ${eventId}`)
        await this.repository.remove(event);
        return true;
    }

}