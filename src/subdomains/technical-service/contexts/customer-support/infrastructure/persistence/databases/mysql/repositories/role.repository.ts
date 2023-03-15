import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleMySqlEntity } from "../entities";
import { IRepository } from "./base";

@Injectable()
export class RoleRepository implements IRepository<RoleMySqlEntity>{

    constructor(
        @InjectRepository(RoleMySqlEntity)
        private readonly repository: Repository<RoleMySqlEntity>
    ){}

    /**
     *  Returns all the entities 
     *
     * @return {*}  {Promise<RoleMySqlEntity[]>}
     * @memberof RoleRepository
     */
    async findAll(): Promise<RoleMySqlEntity[]> {
        return await this.repository.find()
    }


    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<RoleMySqlEntity>}
     * @memberof RoleRepository
     */
    async findById(roleID: string): Promise<RoleMySqlEntity> {
        const result = await this.repository.findOneBy({ roleID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Role with id: ${roleID} not found`);

        return result;
    }

    /**
     * Registers a new entity
     *
     * @param {RoleMySqlEntity} entity
     * @return {*}  {Promise<RoleMySqlEntity>}
     * @memberof RoleRepository
     */
    async create(entity: RoleMySqlEntity): Promise<RoleMySqlEntity> {
        return await this.repository.save(entity);
    }


    /**
     * Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {RoleMySqlEntity} entity
     * @return {*}  {Promise<RoleMySqlEntity>}
     * @memberof RoleRepository
     */
    async update( entity: RoleMySqlEntity): Promise<RoleMySqlEntity> {

        const roleID = entity.roleID as string;
        
        let entityFound = await this.findById(roleID);

        if (!entityFound) throw new BadRequestException(`Role with id: ${roleID} not found`);

        entity.roleID = roleID; //ensures the ID is the same as the original

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
     * @memberof RoleRepository
     */
    async delete(roleID: string): Promise<boolean> {
        
        const result = await this.findById(roleID);

        if (!result) throw new BadRequestException(`Role with id: ${roleID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);
        
        return true;
    }    
    
}
