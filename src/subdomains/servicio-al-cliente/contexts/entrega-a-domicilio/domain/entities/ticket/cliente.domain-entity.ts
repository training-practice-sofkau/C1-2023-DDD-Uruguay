import { v4 as uuid } from 'uuid';

import { ClienteIdValueObject, DireccionValueObject, NombreValueObject } from '../../value-objects/ticket/cliente';
import { IClienteDomainEntity } from "../interfaces/ticket";

/**
 *Clase base de entidad Cliente
 *
 * @export
 * @class ClienteDomainEntityBase
 * @implements {IClienteDomainEntity}
 */
export class ClienteDomainEntityBase implements IClienteDomainEntity {
    clienteId?: string | ClienteIdValueObject;
    nombre?: string | NombreValueObject;
    direccion?: string | DireccionValueObject;
    createdAt?: number | Date;

    constructor(_data?: IClienteDomainEntity) {
        if(_data?.clienteId) this.clienteId = _data.clienteId;
        else this.clienteId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        if(_data?.direccion) this.direccion = _data.direccion;

        this.createdAt = new Date()
    }
}