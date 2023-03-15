import { IsString, IsUUID } from "class-validator";
import { ICrearEntradaCommand } from "../../../../domain";

 export class CrearEntradaCommand implements ICrearEntradaCommand{

    @IsUUID()
    entradaId?: string;

    @IsString()
    nombre?: string;
}