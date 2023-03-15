import { IsBoolean, IsString ,IsNumber, IsUUID} from 'class-validator';
import { INegociarCesionCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/secretaria';


export class NegociarCesionCommand implements INegociarCesionCommands {

    @IsUUID()
    cesionId?: string;

     @IsUUID()
    empleadoId: string;

     @IsUUID()
    equipoNuevoId?: string;

    @IsString()
    fechaSalida?: string;

    @IsNumber()
    costo?: number;

    @IsBoolean()
    state?: boolean;
    
    
    

}