import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WarrantyMySqlEntity } from "../entities";
import { IRepository } from "./base";

@Injectable()
export class WarrantyRepository implements IRepository<WarrantyMySqlEntity>{

    constructor(
        @InjectRepository(WarrantyMySqlEntity)
        private readonly repository: Repository<WarrantyMySqlEntity>
    ) { }



    /**
     *  Returns all the entities 
     *
     * @return {*}  {Promise<WarrantyMySqlEntity[]>}
     * @memberof WarrantyRepository
     */
    async findAll(): Promise<WarrantyMySqlEntity[]> {
        return await this.repository.find()
    }

    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<WarrantyMySqlEntity>}
     * @memberof WarrantyRepository
     */
    async findById(warrantyID: string): Promise<WarrantyMySqlEntity> {

        const result = await this.repository.findOneBy({ warrantyID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Warranty with id: ${warrantyID} not found`);

        return result;
    }

    /**
     * Registers a new entity
     *
     * @param {WarrantyMySqlEntity} entity
     * @return {*}  {Promise<WarrantyMySqlEntity>}
     * @memberof WarrantyRepository
     */
    async create(entity: WarrantyMySqlEntity): Promise<WarrantyMySqlEntity> {
        return await this.repository.save(entity);
    }


    /**
     * Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {WarrantyMySqlEntity} entity
     * @return {*}  {Promise<WarrantyMySqlEntity>}
     * @memberof WarrantyRepository
     */
    async update(entity: WarrantyMySqlEntity): Promise<WarrantyMySqlEntity> {

        const warrantyID = entity.warrantyID as string;

        let entityFound = await this.findById(warrantyID);

        if (!entityFound) throw new BadRequestException(`Warranty with id: ${warrantyID} not found`);

        entity.warrantyID = warrantyID; //ensures the ID is the same as the original

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
     * @memberof WarrantyRepository
     */
    async delete(warrantyID: string): Promise<boolean> {

        const result = await this.findById(warrantyID);

        if (!result) throw new BadRequestException(`Warranty with id: ${warrantyID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }

}
