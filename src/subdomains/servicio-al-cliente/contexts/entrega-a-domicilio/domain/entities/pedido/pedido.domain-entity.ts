import { v4 as uuid } from 'uuid';

import { EstadoValueObject, PedidoIdValueObject, PrecioValueObject } from '../../value-objects';
import {
    IBebidaDomainEntity,
    IEntradaDomainEntity,
    IPedidoDomainEntity,
    IPlatoPrincipalDomainEntity,
    IPostreDomainEntity
} from "../interfaces/pedido";

/**
 *Clase base de entidad Pedido
 *
 * @export
 * @class PedidoDomainEntityBase
 * @implements {IPedidoDomainEntity}
 */
export class PedidoDomainEntityBase implements IPedidoDomainEntity {
    pedidoId?: string | PedidoIdValueObject;
    estado?: string | EstadoValueObject;
    precio?: number | PrecioValueObject;
    entrada?: IEntradaDomainEntity;
    platoPrincipal?: IPlatoPrincipalDomainEntity;
    bebida?: IBebidaDomainEntity;
    postre?: IPostreDomainEntity;
    createdAt?: number | Date;

    constructor(_data?: IPedidoDomainEntity) {
        if(_data?.pedidoId) this.pedidoId = _data.pedidoId;
        else this.pedidoId = uuid();

        if(_data?.estado) this.estado = _data.estado;

        if(_data?.precio) this.precio = _data.precio;

        if(_data?.entrada) this.entrada = _data.entrada;

        if(_data?.platoPrincipal) this.platoPrincipal = _data.platoPrincipal;
        
        if(_data?.bebida) this.bebida = _data.bebida;
        
        if(_data?.postre) this.postre = _data.postre;

        this.createdAt = new Date()
    }
}