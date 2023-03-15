import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepairsMySqlEntity } from "../entities";
import { IRepository } from "./base";

@Injectable()
export class RepairsRepository implements IRepository<RepairsMySqlEntity>{

    constructor(
        @InjectRepository(RepairsMySqlEntity)
        private readonly repository: Repository<RepairsMySqlEntity>
    ){}



    /**
     * Returns all the entities 
     *
     * @return {*}  {Promise<RepairsMySqlEntity[]>}
     * @memberof RepairsRepository
     */
    async findAll(): Promise<RepairsMySqlEntity[]> {
        return await this.repository.find()
    }
    


    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<RepairsMySqlEntity>}
     * @memberof RepairsRepository
     */
    async findById(repairID: string): Promise<RepairsMySqlEntity> {

        const result = await this.repository.findOneBy({ repairID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Repair Details with id: ${repairID} not found`);

        return result;
    }
    

    /**
     * Registers a new entity
     *
     * @param {RepairsMySqlEntity} entity
     * @return {*}  {Promise<RepairsMySqlEntity>}
     * @memberof RepairsRepository
     */
    async create(entity: RepairsMySqlEntity): Promise<RepairsMySqlEntity> {
        return await this.repository.save(entity);
    }
    

    /**
     *  Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {RepairsMySqlEntity} entity
     * @return {*}  {Promise<RepairsMySqlEntity>}
     * @memberof RepairsRepository
     */
    async update(entity: RepairsMySqlEntity): Promise<RepairsMySqlEntity> {
        
        const repairID = entity.repairID as string;
        
        let entityFound = await this.findById(repairID);

        if (!entityFound) throw new BadRequestException(`Repairs details with id: ${repairID} not found`);

        entity.repairID = repairID; //ensures the ID is the same as the original

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
     * @memberof RepairsRepository
     */
    async delete(repairID: string): Promise<boolean> {
        const result = await this.findById(repairID);

        if (!result) throw new BadRequestException(`Repairs details with id: ${repairID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }
       
}
