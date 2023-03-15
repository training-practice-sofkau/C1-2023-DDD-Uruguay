import { IsString, IsUUID } from "class-validator";
import { ICrearClienteCommand } from "../../../../domain";

export class CrearClienteCommand implements ICrearClienteCommand {

    @IsUUID()
    clienteId?: string;

    @IsString()
    nombre?: string;

    @IsString()
    direccion?: string;
}