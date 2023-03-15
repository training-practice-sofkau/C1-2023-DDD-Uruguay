import { BadRequestException, Injectable } from '@nestjs/common';
import { IRepository } from './base/repository.base';
import { InvoiceMySqlEntity } from '../entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceRepository implements IRepository<InvoiceMySqlEntity>{

    constructor(
        @InjectRepository(InvoiceMySqlEntity)
        private readonly repository: Repository<InvoiceMySqlEntity>
    ){}

    /**
     *  Returns all the entities 
     *
     * @return {*}  {Promise<InvoiceMySqlEntity[]>}
     * @memberof InvoiceRepository
     */
    async findAll(): Promise<InvoiceMySqlEntity[]> {
        return await this.repository.find()
    }

    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<InvoiceMySqlEntity>}
     * @memberof InvoiceRepository
     */
    async  findById(invoiceID: string): Promise<InvoiceMySqlEntity> {
        const result = await this.repository.findOneBy({ invoiceID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Invoice with id: ${invoiceID} not found`);

        return result;
    }
   
    
    /**
     * Registers a new entity
     *
     * @param {InvoiceMySqlEntity} entity
     * @return {*}  {Promise<InvoiceMySqlEntity>}
     * @memberof InvoiceRepository
     */
    async create(entity: InvoiceMySqlEntity): Promise<InvoiceMySqlEntity> {
        return await this.repository.save(entity);
    }
    
    
    /**
     * Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {InvoiceMySqlEntity} entity
     * @return {*}  {Promise<InvoiceMySqlEntity>}
     * @memberof InvoiceRepository
     */
    async update(entity: InvoiceMySqlEntity): Promise<InvoiceMySqlEntity> {
        
        const invoiceID = entity.invoiceID as string;
        
        let entityFound = await this.findById(invoiceID);

        if (!entityFound) throw new BadRequestException(`Invoice with id: ${invoiceID} not found`);

        entity.invoiceID = invoiceID; //ensures the ID is the same as the original

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
     * @memberof InvoiceRepository
     */
    async delete(invoiceID: string): Promise<boolean> {

        const result = await this.findById(invoiceID);

        if (!result) throw new BadRequestException(`Invoice with id: ${invoiceID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }


    
}
