import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerMySqlEntity } from "../entities/customer.entity";
import { IRepository } from './base/repository.base';

@Injectable()
export class CustomerRepository
    implements IRepository<CustomerMySqlEntity>{

    constructor(
        @InjectRepository(CustomerMySqlEntity)
        private readonly repository: Repository<CustomerMySqlEntity>
    ) { }


    //TODO: chequear si el uso de withDelete esta bien ( ? )
    
    /**
     * Returns all the entities 
     *
     * @return {*}  {Promise<CustomerMySqlEntity[]>}
     * @memberof CustomerRepository
     */
    async findAll(): Promise<CustomerMySqlEntity[]> {
        return await this.repository.find({withDeleted: false})
    }


    /**
     * Search in the DB a Customer with the given ID
     * gives an exception if not found
     *
     * @param {string} customerID
     * @return {*}  {Promise<CustomerMySqlEntity>}
     * @memberof CustomerRepository
     */
    async findById(customerID: string): Promise<CustomerMySqlEntity> {

        const result = await this.repository.findOneBy({ customerID , deletedAt: undefined });

        if (!result) throw new BadRequestException(`Customer with id: ${customerID} not found`);

        return result;

    }

    /**
     * Registers a new entity
     *
     * @param {CustomerMySqlEntity} entity
     * @return {*}  {Promise<CustomerMySqlEntity>}
     * @memberof CustomerRepository
     */
    async create(entity: CustomerMySqlEntity): Promise<CustomerMySqlEntity> {
        return await this.repository.save(entity);
    }

    
    /**
     * Updates the information of the Customer Entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {CustomerMySqlEntity} entity
     * @return {*}  {Promise<CustomerMySqlEntity>}
     * @memberof CustomerRepository
     */
    async update(entity: CustomerMySqlEntity): Promise<CustomerMySqlEntity> {

        const customerID = entity.customerID as string;

        let entityFound = await this.findById(customerID);

        if (!entityFound) throw new BadRequestException(`Customer with id: ${customerID} not found`);
        
        entity.customerID = customerID; //ensures the ID is the same as the original

        entityFound = {...entityFound, ...entity};

        this.repository.save(entityFound);

        return entityFound;
    }



    /**
     * Soft deletes the customer Entity with the given ID
     * is not found returns an exception
     *
     * @param {string} customerID
     * @return {*}  {Promise<boolean>}
     * @memberof CustomerRepository
     */
    async delete(customerID: string): Promise<boolean> {
        
        const result = await this.findById(customerID);

        if (!result) throw new BadRequestException(`Customer with id: ${customerID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }

}