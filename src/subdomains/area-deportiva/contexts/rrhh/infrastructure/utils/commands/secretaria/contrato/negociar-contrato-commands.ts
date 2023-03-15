import { IsBoolean, IsString ,IsNumber, IsUUID} from 'class-validator';
import { INegociarContratoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/secretaria';

export class Negociarcontrato implements INegociarContratoCommands {
    
    @IsUUID()
    empleadoId?: string;
    
    @IsUUID()
    contratoId?: string;

    @IsNumber()
    costo?: number;

    @IsBoolean()
    state?: boolean;
   
    @IsString()
    fechaFinalizacion?: string;
    

}