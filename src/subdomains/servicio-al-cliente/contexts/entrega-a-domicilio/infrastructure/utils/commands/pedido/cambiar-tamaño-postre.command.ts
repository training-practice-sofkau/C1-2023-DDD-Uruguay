import { IsString, IsUUID } from "class-validator";
import { ICambiarTamanioPostreCommand } from "../../../../domain/interfaces/commands/pedido";

 export class CambiarTamanioPostreCommand implements ICambiarTamanioPostreCommand {

    @IsUUID()
    postreId?: string;

    @IsString()
    nuevoTamanio?: string;
}