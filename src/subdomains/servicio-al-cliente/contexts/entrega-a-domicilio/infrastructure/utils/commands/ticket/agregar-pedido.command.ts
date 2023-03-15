import { IsString, IsUUID } from "class-validator";
import { IAgregarPedidoCommand } from "../../../../domain/interfaces/commands/ticket/agregar-pedido.command";


 export class AgregarPedidoCommand implements IAgregarPedidoCommand {

    @IsUUID()
    ticketId?: string;

    @IsString()
    pedidoId?: string;
}