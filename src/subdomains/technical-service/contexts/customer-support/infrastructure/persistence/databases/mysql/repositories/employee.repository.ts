import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerMySqlEntity } from "../entities";
import { EmployeeMySqlEntity } from '../entities/employee.entity';
import { IRepository } from "./base";

@Injectable()
export class EmployeeRepository 
    implements IRepository<EmployeeMySqlEntity>{

    constructor(
        @InjectRepository(CustomerMySqlEntity)
        private readonly repository: Repository<EmployeeMySqlEntity>
    ){}

    
    /**
     * Returns all the entities 
     *
     * @return {*}  {Promise<EmployeeMySqlEntity[]>}
     * @memberof EmployeeRepository
     */
    async findAll(): Promise<EmployeeMySqlEntity[]> {
        return await this.repository.find()
    }
    

    /**
     * Search in the DB a entity with the given ID
     * gives an exception if not found
     *
     * @param {string} id
     * @return {*}  {Promise<EmployeeMySqlEntity>}
     * @memberof EmployeeRepository
     */
    async findById(employeeID: string): Promise<EmployeeMySqlEntity> {

        const result = await this.repository.findOneBy({ employeeID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Employee with id: ${employeeID} not found`);

        return result;
    }

    /**
     * Registers a new entity
     *
     * @param {EmployeeMySqlEntity} entity
     * @return {*}  {Promise<EmployeeMySqlEntity>}
     * @memberof EmployeeRepository
     */
    async  create(entity: EmployeeMySqlEntity): Promise<EmployeeMySqlEntity> {
        return await this.repository.save(entity);
    }    

    /**
     * Updates the information of the entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {EmployeeMySqlEntity} entity
     * @return {*}  {Promise<EmployeeMySqlEntity>}
     * @memberof EmployeeRepository
     */
    async update(entity: EmployeeMySqlEntity): Promise<EmployeeMySqlEntity> {

        const employeeID = entity.employeeID as string;

        let entityFound = await this.findById(employeeID);

        if (!entityFound) throw new BadRequestException(`Employee with id: ${employeeID} not found`);

        entity.employeeID = employeeID; //ensures the ID is the same as the original

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
     * @memberof EmployeeRepository
     */
    async delete(employeeID: string): Promise<boolean> {

        const result = await this.findById(employeeID);

        if (!result) throw new BadRequestException(`Employee with id: ${employeeID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);

        return true;
    }

    }