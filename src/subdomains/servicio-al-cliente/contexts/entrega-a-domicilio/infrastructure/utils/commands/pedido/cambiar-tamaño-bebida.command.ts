import { IsString, IsUUID } from "class-validator";
import { ICambiarTamanioBebidaCommand } from "../../../../domain/interfaces/commands/pedido";

 export class CambiarTamanioBebidaCommand implements ICambiarTamanioBebidaCommand {

    @IsUUID()
    bebidaId?: string;

    @IsString()
    nuevoTamanio?: string;
}