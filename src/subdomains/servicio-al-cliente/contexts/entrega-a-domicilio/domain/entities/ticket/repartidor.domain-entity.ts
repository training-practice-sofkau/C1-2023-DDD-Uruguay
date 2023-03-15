import { v4 as uuid } from 'uuid';

import { NombreValueObject, RepartidorIdValueObject, VehiculoValueObject } from '../../value-objects/ticket/repartidor';
import { IRepartidorDomainEntity } from '../interfaces/ticket';

/**
 *Clase base de entidad Repartidor
 *
 * @export
 * @class RepartidorDomainEntityBase
 * @implements {IRepartidorDomainEntity}
 */
export class RepartidorDomainEntityBase implements IRepartidorDomainEntity {
    repartidorId?: string | RepartidorIdValueObject;
    nombre?: string | NombreValueObject;
    vehiculo?: string | VehiculoValueObject;
    createdAt?: number | Date;

    constructor(_data?: IRepartidorDomainEntity) {
        if(_data?.repartidorId) this.repartidorId = _data.repartidorId;
        else this.repartidorId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        if(_data?.vehiculo) this.vehiculo = _data.vehiculo;

        this.createdAt = new Date()
    }
}