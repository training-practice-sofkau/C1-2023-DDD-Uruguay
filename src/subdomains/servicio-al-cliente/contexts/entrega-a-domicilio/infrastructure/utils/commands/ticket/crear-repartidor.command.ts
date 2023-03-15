import { IsString, IsUUID } from "class-validator";
import { ICrearRepartidorCommand } from "../../../../domain";

export class CrearRepartidorCommand implements ICrearRepartidorCommand {

    @IsUUID()
    repartidorId?: string;

    @IsString()
    nombre?: string;

    @IsString()
    vehiculo?: string;
}