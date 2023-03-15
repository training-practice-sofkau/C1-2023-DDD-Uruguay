import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository } from './interfaces/repository.interface';
import { EventMySqlEntity } from '../entities/event-mysql.entity';

@Injectable()
export class EventRepository
  implements IRepository<EventMySqlEntity>
{
  constructor(
    @InjectRepository(EventMySqlEntity)
    private readonly eventRepository: Repository<EventMySqlEntity>,
  ) {}

  
  async findAll(): Promise<EventMySqlEntity[]> {
      return await this.eventRepository.find();
    }
    
    
    async create(
        entity: EventMySqlEntity,
        ): Promise<EventMySqlEntity> {
            return await this.eventRepository.save(entity);
        }

        findById(id: string): Promise<EventMySqlEntity> {
            throw new Error('Method not implemented.');
        }
        update(id: string, entity: EventMySqlEntity): Promise<EventMySqlEntity> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<boolean> {
            throw new Error('Method not implemented.');
        }

  
  
}

