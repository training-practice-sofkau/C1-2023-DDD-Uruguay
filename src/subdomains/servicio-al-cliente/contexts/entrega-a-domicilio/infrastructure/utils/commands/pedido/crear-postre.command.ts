import { IsBoolean, IsString, IsUUID } from "class-validator";
import { ICrearPostreCommand } from "../../../../domain";

export class CrearPostreCommand implements ICrearPostreCommand {

    @IsUUID()
    postreId?: string;

    @IsString()
    nombre?: string;

    @IsString()
    tamanio?: string;

    @IsBoolean()
    esParaVeganos?: boolean;
}