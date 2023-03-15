import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventMySqlEntity } from '../entities/event.entity';

import { IRepositoriBase } from './base/IRepository.base';

@Injectable()
export class EventRepository implements IRepositoriBase<EventMySqlEntity>{

    constructor(
        @InjectRepository(EventMySqlEntity)
        private readonly repository: Repository<EventMySqlEntity>
    ) { }



    async findAll(): Promise<EventMySqlEntity[]> {
        return await this.repository.find();
    }

    findById(id: string): Promise<EventMySqlEntity> {
        throw new Error('Method not implemented.');
    }

    async create(entity: EventMySqlEntity): Promise<EventMySqlEntity> {
        return await this.repository.save(entity);
    }

    update(id: string, entity: EventMySqlEntity): Promise<EventMySqlEntity> {
        throw new Error('Method not implemented.');
    }

    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


}