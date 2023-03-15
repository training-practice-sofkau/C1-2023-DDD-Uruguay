import { IsString, IsUUID } from "class-validator";
import { ICrearPlatoPrincipalCommand } from "../../../../domain";

export class CrearPlatoPrincipalCommand implements ICrearPlatoPrincipalCommand {
    
    @IsUUID()
    platoPrincipalId?: string;

    @IsString()
    nombre?: string;

    @IsString()
    guarnicion?: string;
}