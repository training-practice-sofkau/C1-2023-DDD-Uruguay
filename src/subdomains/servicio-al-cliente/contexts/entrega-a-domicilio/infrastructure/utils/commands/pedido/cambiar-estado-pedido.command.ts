import { ICambiarEstadoPedidoCommand } from "../../../../domain";
import { IsString, IsUUID } from 'class-validator';

 export class CambiarEstadoPedidoCommand implements ICambiarEstadoPedidoCommand {

    @IsUUID()
    pedidoId?: string;

    @IsString()
    nuevoEstado?: string;
}