import { v4 as uuid } from 'uuid';

import { EntradaIdValueObject, NombreValueObject } from '../../value-objects/pedido/entrada';
import { IEntradaDomainEntity } from '../interfaces/pedido';

/**
 *Clase base de entidad Entrada
 *
 * @export
 * @class EntradaDomainEntityBase
 * @implements {IEntradaDomainEntity}
 */
export class EntradaDomainEntityBase implements IEntradaDomainEntity {
    entradaId?: string | EntradaIdValueObject;
    nombre?: string | NombreValueObject;
    createdAt?: number | Date;

    constructor(_data?: IEntradaDomainEntity) {
        if(_data?.entradaId) this.entradaId = _data.entradaId;
        else this.entradaId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        this.createdAt = new Date()
    }
}