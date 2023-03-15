import { IsString, IsUUID } from "class-validator";
import { ICambiarNombreRepartidorCommand } from "../../../../domain/interfaces/commands/ticket/cambiar-nombre-repartidor.command";

 export class CambiarNombreRepartidorCommand implements ICambiarNombreRepartidorCommand {

    @IsUUID()
    repartidorId?: string;

    @IsString()
    nuevoNombre?: string;
}