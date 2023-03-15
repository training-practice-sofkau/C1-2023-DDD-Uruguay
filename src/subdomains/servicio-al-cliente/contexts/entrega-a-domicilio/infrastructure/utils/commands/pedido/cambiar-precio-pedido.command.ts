import { IsNumber, IsUUID } from "class-validator";
import { ICambiarPrecioPedidoCommand } from "../../../../domain";

 export class CambiarPrecioPedidoCommand implements ICambiarPrecioPedidoCommand {

    @IsUUID()
    pedidoId?: string;

    @IsNumber()
    nuevoPrecio?: number;
}