import { IsUUID } from "class-validator";
import { IObtenerPedidoCommand } from "../../../../domain";

export class ObtenerPedidoCommand implements IObtenerPedidoCommand {

    @IsUUID()
    pedidoId?: string;
}