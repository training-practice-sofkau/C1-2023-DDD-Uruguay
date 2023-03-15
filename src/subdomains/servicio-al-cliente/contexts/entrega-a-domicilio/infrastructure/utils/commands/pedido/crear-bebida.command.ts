import { IsString, IsUUID } from "class-validator";
import { ICrearBebidaCommand } from "../../../../domain";

 export class CrearBebidaCommand implements ICrearBebidaCommand {

    @IsUUID()
    bebidaId?: string;

    @IsString()
    nombre?: string;

    @IsString()
    tamanio?: string;
}