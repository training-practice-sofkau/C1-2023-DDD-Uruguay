import { v4 as uuid } from 'uuid';

import { NombreValueObject, BebidaIdValueObject, TamanioValueObject } from '../../value-objects/pedido/bebida';
import { IBebidaDomainEntity } from '../interfaces/pedido';

/**
 *Clase base de entidad Bebida
 *
 * @export
 * @class BebidaDomainEntityBase
 * @implements {IBebidaDomainEntity}
 */
export class BebidaDomainEntityBase implements IBebidaDomainEntity {
    bebidaId?: string | BebidaIdValueObject;
    nombre?: string | NombreValueObject;
    tamanio?: string | TamanioValueObject;
    createdAt?: number | Date;

    constructor(_data?: IBebidaDomainEntity) {
        if(_data?.bebidaId) this.bebidaId = _data.bebidaId;
        else this.bebidaId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        if(_data?.tamanio) this.tamanio = _data.tamanio;

        this.createdAt = new Date();
    }
}