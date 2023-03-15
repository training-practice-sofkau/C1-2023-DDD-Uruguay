import { v4 as uuid } from 'uuid';

import { TicketIdValueObject } from '../../value-objects/ticket';
import { IPedidoDomainEntity } from '../interfaces/pedido';
import { IClienteDomainEntity, IRepartidorDomainEntity, ITicketDomainEntity } from "../interfaces/ticket";

/**
 *Clase base de entidad Ticket
 *
 * @export
 * @class TicketDomainEntityBase
 * @implements {ITicketDomainEntity}
 */
export class TicketDomainEntityBase implements ITicketDomainEntity {
    ticketId?: string | TicketIdValueObject;
    cliente?: IClienteDomainEntity;
    repartidor?: IRepartidorDomainEntity;
    listaPedidos?: IPedidoDomainEntity[];
    createdAt?: number | Date;

    constructor(_data?: ITicketDomainEntity) {
        if(_data?.ticketId) this.ticketId = _data.ticketId;
        else this.ticketId = uuid();

        if(_data?.cliente) this.cliente = _data.cliente;

        if(_data?.repartidor) this.repartidor = _data.repartidor;

        if(_data?.listaPedidos) this.listaPedidos = _data.listaPedidos;

        this.createdAt = new Date()
    }
}