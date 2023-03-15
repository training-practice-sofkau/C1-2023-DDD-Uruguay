import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventPostgreEntity } from "../../../entities/event.entity";

export class EventRepository {

    constructor(
        @InjectRepository(EventPostgreEntity)
        private eventRepository: Repository<EventPostgreEntity>
    ) {}

    create(entity: EventPostgreEntity): Promise<EventPostgreEntity> {
        return this.eventRepository.save(entity);
    }
}