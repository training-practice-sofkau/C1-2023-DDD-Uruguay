import { v4 as uuid } from 'uuid';

import { GuarnicionValueObject, PlatoPrincipalIdValueObject, NombreValueObject } from '../../value-objects/pedido/plato-principal';
import { IPlatoPrincipalDomainEntity } from '../interfaces/pedido';

/**
 *Clase base de entidad Plato principal
 *
 * @export
 * @class PlatoPrincipalDomainEntityBase
 * @implements {IEntradaDomainEntity}
 */
export class PlatoPrincipalDomainEntityBase implements IPlatoPrincipalDomainEntity {
    platoPrincipalId?: string | PlatoPrincipalIdValueObject;
    nombre?: string | NombreValueObject;
    guarnicion?: string | GuarnicionValueObject;
    createdAt?: number | Date;

    constructor(_data?: IPlatoPrincipalDomainEntity) {
        if(_data?.platoPrincipalId) this.platoPrincipalId = _data.platoPrincipalId;
        else this.platoPrincipalId = uuid();

        if(_data?.nombre) this.nombre = _data.nombre;

        if(_data?.guarnicion) this.guarnicion = _data.guarnicion;

        this.createdAt = new Date()
    }
}