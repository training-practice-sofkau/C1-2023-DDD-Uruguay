import { IsString, IsUUID } from "class-validator";
import { ICambiarNombreClienteCommand } from "../../../../domain/interfaces/commands/ticket/cambiar-nombre-cliente.command";

 export class CambiarNombreClienteCommand implements ICambiarNombreClienteCommand {

    @IsUUID()
    clienteId?: string;

    @IsString()
    nuevoNombre?: string;
}