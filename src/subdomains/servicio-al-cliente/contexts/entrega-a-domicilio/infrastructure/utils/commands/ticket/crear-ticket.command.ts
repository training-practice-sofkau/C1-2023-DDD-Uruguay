import { IsUUID, IsArray, IsObject } from "class-validator";
import { IClienteDomainEntity, ICrearTicketCommand, IPedidoDomainEntity, IRepartidorDomainEntity } from "../../../../domain";

export class CrearTicketCommand implements ICrearTicketCommand {

    @IsUUID()
    ticketId?: string;

    @IsArray()
    listaPedidos?: IPedidoDomainEntity[];

    @IsObject()
    cliente?: IClienteDomainEntity;

    @IsObject()
    repartidor?: IRepartidorDomainEntity;
}