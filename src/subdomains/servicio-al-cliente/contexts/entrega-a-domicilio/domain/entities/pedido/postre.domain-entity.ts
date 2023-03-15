import { v4 as uuid } from 'uuid';

import { NombreValueObject, TamanioValueObject, PostreIdValueObject, EsParaVeganosValueObject } from '../../value-objects/pedido/postre';
import { IPostreDomainEntity } from '../interfaces/pedido';

/**
 *Clase base de entidad Postre
 *
 * @export
 * @class PostreDomainEntityBase
 * @implements {IPostreDomainEntity}
 */
export class PostreDomainEntityBase implements IPostreDomainEntity {
    postreId?: string | PostreIdValueObject;
    nombre?: string | NombreValueObject;
    tamanio?: string | TamanioValueObject;
    esParaVeganos?: boolean | EsParaVeganosValueObject;
    createdAt?: number | Date;

    constructor(_data?: IPostreDomainEntity) {
        if(_data?.postreId) this.postreId = _data.postreId;
        else this.postreId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        if(_data?.tamanio) this.tamanio = _data.tamanio;

        if(_data?.esParaVeganos) this.esParaVeganos = _data.esParaVeganos;

        this.createdAt = new Date()
    }
}