import { IBuscarCesionCommands } from "src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/secretaria";
import { IsUUID } from 'class-validator';

export class BuscarCesionCommand implements IBuscarCesionCommands {
    @IsUUID()
    cesionId?: string;
    
}