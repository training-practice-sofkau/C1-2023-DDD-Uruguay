import { IsString, IsUUID } from "class-validator";
import { ICambiarNombreEntradaCommand } from "../../../../domain/interfaces/commands/pedido/cambiar-nombre-entrada.command";

 export class CambiarNombreEntradaCommand implements ICambiarNombreEntradaCommand {

    @IsUUID()
    entradaId?: string;

    @IsString()
    nuevoNombre?: string;
}