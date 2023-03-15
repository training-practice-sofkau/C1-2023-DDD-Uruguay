import { IsString, IsUUID } from "class-validator";
import { ICambiarNombrePlatoPrincipalCommand } from "../../../../domain/interfaces/commands/pedido/cambiar-nombre-plato-principal.command";

 export class CambiarNombrePlatoPrincipalCommand implements ICambiarNombrePlatoPrincipalCommand {

    @IsUUID()
    platoPrincipalId?: string;

    @IsString()
    nuevoNombre?: string;
}