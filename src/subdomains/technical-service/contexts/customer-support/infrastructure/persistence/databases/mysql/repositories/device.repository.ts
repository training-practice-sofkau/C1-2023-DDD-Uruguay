import { BadRequestException, Injectable } from '@nestjs/common';
import { IRepository } from './base/repository.base';
import { DeviceMySqlEntity } from '../entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceRepository
    implements IRepository<DeviceMySqlEntity> {

    constructor(
        @InjectRepository(DeviceMySqlEntity)
        private readonly repository: Repository<DeviceMySqlEntity>
    ) { }


    /**
     * Returns all the entities 
     *
     * @return {*}  {Promise<DeviceMySqlEntity[]>}
     * @memberof DeviceRepository
     */
    async findAll(): Promise<DeviceMySqlEntity[]> {
        return await this.repository.find({})
    }


    /**
     * Search in the DB a Device with the given ID
     * gives an exception if not found
     * 
     * @param {string} deviceID
     * @return {*}  {Promise<DeviceMySqlEntity>}
     * @memberof DeviceRepository
     */
    async findById(deviceID: string): Promise<DeviceMySqlEntity> {
        const result = await this.repository.findOneBy({ deviceID, deletedAt: undefined });

        if (!result) throw new BadRequestException(`Device with id: ${deviceID} not found`);

        return result;
    }

    /**
     * Registers a new entity
     *
     * @param {DeviceMySqlEntity} entity
     * @return {*}  {Promise<DeviceMySqlEntity>}
     * @memberof DeviceRepository
     */
    async create(entity: DeviceMySqlEntity): Promise<DeviceMySqlEntity> {
        return await this.repository.save(entity);
    }


    /**
     * Updates the information of the Device Entity with the given ID
     * returns and exception if not found
     *
     * @param {string} id
     * @param {DeviceMySqlEntity} entity
     * @return {*}  {Promise<DeviceMySqlEntity>}
     * @memberof DeviceRepository
     */
    async update(entity: DeviceMySqlEntity): Promise<DeviceMySqlEntity> {

        const deviceID = entity.deviceID as string;
        
        let entityFound = await this.findById(deviceID);

        if (!entityFound) throw new BadRequestException(`Device with id: ${deviceID} not found`);

        entity.deviceID = deviceID; //ensures the ID is the same as the original

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
     * @memberof DeviceRepository
     */
    async delete(deviceID: string): Promise<boolean> {

        const result = await this.findById(deviceID);

        if (!result) throw new BadRequestException(`Device with id: ${deviceID} not found`);

        result.deletedAt = Date.now();

        this.repository.save(result);
        
        return true;
    }



}