import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { IRepository } from './base';
import { EventMySqlEntity } from '../entities/event.entity';




@Injectable()
export class EventRepository implements IRepository<EventMySqlEntity>{

    constructor(
        @InjectRepository(EventMySqlEntity)
        private readonly repository: Repository<EventMySqlEntity>
    ){ }


    /**
     * returns all the events stored in DB
     *
     * @return {*}  {Promise<EventMySqlEntity[]>}
     * @memberof entityRepository
     */
    async findAll(): Promise<EventMySqlEntity[]> {
       return await this.repository.find();
    }
    
    // not implemented
    findById(id: string): Promise<EventMySqlEntity> {
        throw new Error('Method not implemented.');
    }
    


    /**
     * Registers a new Event entity in DB
     *
     * @param {EventMySqlEntity} entity
     * @return {*}  {Promise<EventMySqlEntity>}
     * @memberof entityRepository
     */
    async create(entity: EventMySqlEntity): Promise<EventMySqlEntity> {
        return await this.repository.save(entity);
    }
    
    //not implemented
    update(entity: EventMySqlEntity): Promise<EventMySqlEntity> {
        throw new Error('Method not implemented.');
    }
    
    //not implemented
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


}