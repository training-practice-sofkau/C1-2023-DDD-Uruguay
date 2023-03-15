import { IsUUID } from 'class-validator';
import { IBuscarTramiteCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/staff-deportivo';

export class BuscarTramiteCommand implements IBuscarTramiteCommands {
    
    @IsUUID()
    tramiteId?: string;

}