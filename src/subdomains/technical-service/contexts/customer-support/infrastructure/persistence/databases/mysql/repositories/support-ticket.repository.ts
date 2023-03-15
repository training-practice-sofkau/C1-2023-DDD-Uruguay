import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SupportTicketMySqlEntity } from "../entities";
import { IRepository } from "./base";

@Injectable()
export class SupportTicketRepository implements IRepository<SupportTicketMySqlEntity>{

    constructor(
        @InjectRepository(SupportTicketMySqlEntity)
        private readonly repository: Repository<SupportTicketMySqlEntity>
    ){}



    /**
     * Returns all the entities 
     *
     * @return {*}  {Promise<SupportTicketMySqlEntity[]>}
     * @memberof SupportTicketRepository
     */
    async findAll(): Promise<SupportTicketMySqlEntity[]> {
        return await this.repository.find()
    }


    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<SupportTicketMySqlEntity>}
     * @memberof SupportTicketRepository
     */
    async findById(ticketID: string): Promise<SupportTicketMySqlEntity> {
        const result = await this.repository.findOneBy({ ticketID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Support Ticket with id: ${ticketID} not found`);

        return result;
    }


    /**
     * Registers a new entity
     *
     * @param {SupportTicketMySqlEntity} entity
     * @return {*}  {Promise<SupportTicketMySqlEntity>}
     * @memberof SupportTicketRepository
     */
    async create(entity: SupportTicketMySqlEntity): Promise<SupportTicketMySqlEntity> {
        return await this.repository.save(entity);
    }


    /**
     * Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {SupportTicketMySqlEntity} entity
     * @return {*}  {Promise<SupportTicketMySqlEntity>}
     * @memberof SupportTicketRepository
     */
    async update(entity: SupportTicketMySqlEntity): Promise<SupportTicketMySqlEntity> {

        const ticketID = entity.ticketID as string;
        
        let entityFound = await this.findById(ticketID);

        if (!entityFound) throw new BadRequestException(`Support Ticket with id: ${ticketID} not found`);

        entity.ticketID = ticketID; //ensures the ID is the same as the original

        entityFound = { ...entityFound, ...entity };

        this.repository.save(entityFound);

        return entityFound;
    }
    

    /**
     * Soft deletes the entity with the given ID
     * is not found returns an exception
     *
     * @param {string} id
     * @return {*}  {Promise<boolean>}
     * @memberof SupportTicketRepository
     */
    async delete(ticketID: string): Promise<boolean> {
        
        const result = await this.findById(ticketID);

        if (!result) throw new BadRequestException(`Support Ticket with id: ${ticketID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }
    
}
