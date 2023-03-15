import { IsString, IsUUID } from 'class-validator';
import { ICrearSecretariaCommands } from "../../../../domain/interfaces/commands/secretaria";

export class CrearSecretariaCommand implements ICrearSecretariaCommands {

    @IsUUID()
    secretariaId?:string ;

    @IsUUID()
    empleadoId?: string ;

    @IsUUID()
    staffDeportivoId?: string ;

    @IsString()
    contrato?: string;

    @IsString()
    traspaso?: string;
    
    @IsString()
    cesion?: string;
    
}