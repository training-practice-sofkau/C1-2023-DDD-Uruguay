import { IsBoolean, IsUUID } from 'class-validator';
import { IModificarStateTraspasoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/traspaso';

export class ModificarStateTraspasoCommand implements IModificarStateTraspasoCommands {

    @IsUUID()
    id: string;
    
    @IsBoolean()
    state: boolean;
   
}